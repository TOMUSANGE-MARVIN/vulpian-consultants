"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import type { Collection } from "@/lib/collections";
import { FieldInput } from "./Fields";

type Values = Record<string, unknown>;

const CollectionForm: React.FC<{ collection: Collection; id?: string }> = ({ collection, id }) => {
    const router = useRouter();
    const isNew = !id;
    const [values, setValues] = useState<Values>({});
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (isNew) return;
        fetch(`/api/cms/c/${collection.name}/${id}`)
            .then((r) => r.json())
            .then((d) => { setValues(d); setLoading(false); });
    }, [collection.name, id, isNew]);

    const set = (name: string, v: unknown) => {
        setValues((prev) => ({ ...prev, [name]: v }));
        setSaved(false);
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const missing = collection.fields
            .filter((f) => f.required && !String(values[f.name] ?? "").trim())
            .map((f) => f.label);
        if (missing.length) {
            setError(`Please fill in: ${missing.join(", ")}.`);
            return;
        }

        setSaving(true);
        const res = await fetch(
            isNew ? `/api/cms/c/${collection.name}` : `/api/cms/c/${collection.name}/${id}`,
            {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        setSaving(false);

        if (!res.ok) {
            setError("That didn't save. Please check your connection and try again.");
            return;
        }
        if (isNew) {
            router.push(`/admin/c/${collection.name}`);
            router.refresh();
        } else {
            setSaved(true);
            router.refresh();
        }
    };

    if (loading) return <p className="text-gray-400 text-sm">Loading…</p>;

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <Link href={`/admin/c/${collection.name}`} className="text-gray-500 text-sm hover:text-dark flex items-center gap-1 mb-3">
                    <Icon icon="mdi:chevron-left" width="16" height="16" /> Back to {collection.label}
                </Link>
                <h1 className="text-2xl font-semibold font-unbounded">
                    {isNew ? `Add ${collection.singular}` : `Edit ${collection.singular}`}
                </h1>
            </div>

            <form onSubmit={submit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                {collection.fields.map((field) => (
                    <FieldInput
                        key={field.name}
                        field={field}
                        value={values[field.name]}
                        onChange={(v) => set(field.name, v)}
                    />
                ))}

                {error && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
                )}

                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <button type="submit" disabled={saving}
                        className="bg-dark text-white rounded-lg px-6 py-2.5 font-semibold hover:opacity-90 disabled:opacity-50 transition cursor-pointer">
                        {saving ? "Saving…" : isNew ? `Add ${collection.singular}` : "Save changes"}
                    </button>
                    <Link href={`/admin/c/${collection.name}`} className="text-gray-500 hover:text-dark text-sm">Cancel</Link>
                    {saved && (
                        <span className="text-green-700 text-sm font-medium flex items-center gap-1">
                            <Icon icon="mdi:check-circle" width="17" height="17" /> Saved
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CollectionForm;
