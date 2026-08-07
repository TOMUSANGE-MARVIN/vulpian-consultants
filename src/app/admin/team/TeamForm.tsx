"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { TeamMember } from "@/lib/cms";

type FormState = Omit<TeamMember, "_id">;

const EMPTY: FormState = { order: 0, name: "", role: "", isLead: false, bio: [], credentials: [], photoUrl: "" };

function ListEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
            <div className="space-y-2">
                {items.map((item, i) => (
                    <div key={i} className="flex gap-2">
                        <textarea
                            rows={2}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            value={item}
                            onChange={(e) => {
                                const next = [...items];
                                next[i] = e.target.value;
                                onChange(next);
                            }}
                        />
                        <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="text-red-500 px-2">✕</button>
                    </div>
                ))}
                <button type="button" onClick={() => onChange([...items, ""])} className="text-prim text-sm font-medium">+ Add</button>
            </div>
        </div>
    );
}

export default function TeamForm({ id, initial }: { id?: string; initial?: TeamMember }) {
    const router = useRouter();
    const [data, setData] = useState<FormState>(initial ?? EMPTY);
    const [saving, setSaving] = useState(false);
    const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const url = id ? `/api/cms/team/${id}` : "/api/cms/team";
        const method = id ? "PUT" : "POST";
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        setSaving(false);
        router.push("/admin/team");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow space-y-4 max-w-2xl">
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                    <input required className={inputCls} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                    <input className={inputCls} value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Photo URL</label>
                    <input className={inputCls} value={data.photoUrl} onChange={(e) => setData({ ...data, photoUrl: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Order</label>
                    <input type="number" className={inputCls} value={data.order} onChange={(e) => setData({ ...data, order: Number(e.target.value) })} />
                </div>
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <input type="checkbox" checked={data.isLead} onChange={(e) => setData({ ...data, isLead: e.target.checked })} />
                Lead Consultant
            </label>

            <ListEditor label="Bio Paragraphs" items={data.bio} onChange={(bio) => setData({ ...data, bio })} />
            <ListEditor label="Credentials" items={data.credentials} onChange={(credentials) => setData({ ...data, credentials })} />

            <button type="submit" disabled={saving} className="bg-dark text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
                {saving ? "Saving..." : "Save Team Member"}
            </button>
        </form>
    );
}
