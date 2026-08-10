"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { Collection } from "@/lib/collections";

type Row = Record<string, unknown> & { _id: string };

const CollectionList: React.FC<{ collection: Collection }> = ({ collection }) => {
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState<string | null>(null);

    const load = useCallback(async () => {
        const res = await fetch(`/api/cms/c/${collection.name}`);
        setRows(await res.json());
        setLoading(false);
    }, [collection.name]);

    useEffect(() => { load(); }, [load]);

    const move = async (index: number, dir: -1 | 1) => {
        const next = [...rows];
        const j = index + dir;
        if (j < 0 || j >= next.length) return;
        [next[index], next[j]] = [next[j], next[index]];
        setRows(next);
        await fetch(`/api/cms/reorder/${collection.name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: next.map((r) => r._id) }),
        });
    };

    const remove = async (id: string) => {
        setRows(rows.filter((r) => r._id !== id));
        setConfirming(null);
        await fetch(`/api/cms/c/${collection.name}/${id}`, { method: "DELETE" });
    };

    const imageField = collection.fields.find((f) => f.type === "image");
    const iconField = collection.fields.find((f) => f.type === "icon");

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                    <h1 className="text-2xl font-semibold font-unbounded">{collection.label}</h1>
                    <p className="text-gray-500 text-sm mt-1">{collection.description}</p>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <Icon icon="mdi:eye-outline" width="14" height="14" />
                        Appears on: {collection.appearsOn}
                    </p>
                </div>
                <Link href={`/admin/c/${collection.name}/new`}
                    className="bg-dark text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition flex items-center gap-1.5 shrink-0">
                    <Icon icon="mdi:plus" width="18" height="18" />
                    Add {collection.singular}
                </Link>
            </div>

            {loading ? (
                <p className="text-gray-400 text-sm">Loading…</p>
            ) : rows.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
                    <Icon icon={collection.icon} width="34" height="34" className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Nothing here yet.</p>
                    <Link href={`/admin/c/${collection.name}/new`} className="text-dark font-semibold text-sm hover:underline mt-2 inline-block">
                        Add the first {collection.singular}
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                    {rows.map((row, i) => (
                        <div key={row._id} className="flex items-center gap-4 p-4 hover:bg-gray-50/70 transition">
                            <div className="flex flex-col gap-0.5 shrink-0">
                                <button onClick={() => move(i, -1)} disabled={i === 0} title="Move up"
                                    className="w-7 h-5 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-30 cursor-pointer">
                                    <Icon icon="mdi:chevron-up" width="14" height="14" />
                                </button>
                                <button onClick={() => move(i, 1)} disabled={i === rows.length - 1} title="Move down"
                                    className="w-7 h-5 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-30 cursor-pointer">
                                    <Icon icon="mdi:chevron-down" width="14" height="14" />
                                </button>
                            </div>

                            {imageField && (
                                <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                                    {row[imageField.name] ? (
                                        <Image src={String(row[imageField.name])} alt="" width={56} height={56} className="w-full h-full object-cover" unoptimized />
                                    ) : (
                                        <Icon icon="mdi:image-outline" width="18" height="18" className="text-gray-300" />
                                    )}
                                </div>
                            )}
                            {!imageField && iconField && (
                                <div className="w-11 h-11 rounded-lg bg-prim-light flex items-center justify-center shrink-0">
                                    <Icon icon={String(row[iconField.name] || collection.icon)} width="22" height="22" className="text-dark" />
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-[15px] truncate">
                                    {String(row[collection.titleField] || "Untitled")}
                                </p>
                                <p className="text-gray-400 text-xs">Position {i + 1} of {rows.length}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <Link href={`/admin/c/${collection.name}/${row._id}`}
                                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm hover:bg-white transition">
                                    Edit
                                </Link>
                                {confirming === row._id ? (
                                    <>
                                        <button onClick={() => remove(row._id)}
                                            className="bg-red-600 text-white rounded-lg px-3 py-1.5 text-sm font-semibold cursor-pointer">
                                            Delete
                                        </button>
                                        <button onClick={() => setConfirming(null)}
                                            className="text-gray-500 text-sm px-1 cursor-pointer">Cancel</button>
                                    </>
                                ) : (
                                    <button onClick={() => setConfirming(row._id)} title="Delete"
                                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 transition cursor-pointer">
                                        <Icon icon="mdi:trash-can-outline" width="17" height="17" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollectionList;
