"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Service } from "@/lib/cms";

type FormState = Omit<Service, "_id">;

const EMPTY: FormState = { order: 0, slug: "", title: "", summary: "", icon: "mdi:briefcase-outline", items: [] };

export default function ServiceForm({ id, initial }: { id?: string; initial?: Service }) {
    const router = useRouter();
    const [data, setData] = useState<FormState>(initial ?? EMPTY);
    const [saving, setSaving] = useState(false);
    const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const url = id ? `/api/cms/services/${id}` : "/api/cms/services";
        const method = id ? "PUT" : "POST";
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        setSaving(false);
        router.push("/admin/services");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow space-y-4 max-w-2xl">
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                    <input required className={inputCls} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Slug (URL)</label>
                    <input required className={inputCls} value={data.slug} onChange={(e) => setData({ ...data, slug: e.target.value })} />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Icon (Iconify name)</label>
                    <input className={inputCls} value={data.icon} onChange={(e) => setData({ ...data, icon: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Order</label>
                    <input type="number" className={inputCls} value={data.order} onChange={(e) => setData({ ...data, order: Number(e.target.value) })} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Summary</label>
                <textarea rows={3} className={inputCls} value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">What This Includes (bullet list)</label>
                <div className="space-y-2">
                    {data.items.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                className={inputCls}
                                value={item}
                                onChange={(e) => {
                                    const next = [...data.items];
                                    next[i] = e.target.value;
                                    setData({ ...data, items: next });
                                }}
                            />
                            <button type="button" onClick={() => setData({ ...data, items: data.items.filter((_, idx) => idx !== i) })} className="text-red-500 px-2">✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => setData({ ...data, items: [...data.items, ""] })} className="text-prim text-sm font-medium">+ Add Item</button>
                </div>
            </div>

            <button type="submit" disabled={saving} className="bg-dark text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
                {saving ? "Saving..." : "Save Service"}
            </button>
        </form>
    );
}
