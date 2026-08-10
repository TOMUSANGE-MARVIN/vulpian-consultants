"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { Field } from "@/lib/collections";

const labelClass = "block text-gray-700 text-sm font-semibold mb-1.5";
const helpClass = "text-gray-500 text-xs mt-1.5";
const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-dark focus:ring-2 focus:ring-dark/15 transition";

/* ------------------------------------------------------------------ image */

const ImageField: React.FC<{
    value: string;
    onChange: (v: string) => void;
}> = ({ value, onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    const upload = async (file: File) => {
        setBusy(true);
        setError("");
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/media", { method: "POST", body });
        const data = await res.json();
        setBusy(false);
        if (!res.ok) {
            setError(data.error || "That upload didn't work. Please try again.");
            return;
        }
        onChange(data.url);
    };

    return (
        <div>
            <div className="flex items-start gap-4">
                <div className="w-28 h-28 shrink-0 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {value ? (
                        <Image src={value} alt="" width={112} height={112} className="w-full h-full object-cover" unoptimized />
                    ) : (
                        <Icon icon="mdi:image-outline" width="28" height="28" className="text-gray-400" />
                    )}
                </div>

                <div className="flex-1">
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) upload(f);
                        }}
                    />
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            disabled={busy}
                            className="bg-dark text-white rounded-lg px-4 py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition cursor-pointer"
                        >
                            {busy ? "Uploading…" : value ? "Replace image" : "Choose image"}
                        </button>
                        {value && (
                            <button
                                type="button"
                                onClick={() => onChange("")}
                                className="border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition cursor-pointer"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    <p className={helpClass}>JPG, PNG, WebP or GIF, up to 4MB.</p>
                    {error && <p className="text-red-600 text-xs mt-1.5">{error}</p>}
                </div>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------- icon */

const SUGGESTED_ICONS = [
    "mdi:certificate-outline", "mdi:shield-check-outline", "mdi:trophy-outline",
    "mdi:sitemap-outline", "mdi:trending-up", "mdi:target-arrow",
    "mdi:briefcase-outline", "mdi:school-outline", "mdi:account-group-outline",
    "mdi:chart-line", "mdi:clipboard-check-outline", "mdi:lightbulb-on-outline",
    "mdi:handshake-outline", "mdi:cog-outline", "mdi:finance",
    "mdi:tools", "mdi:office-building-outline", "carbon:risk",
];

const IconField: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
    <div>
        <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-prim-light flex items-center justify-center shrink-0">
                {value ? <Icon icon={value} width="26" height="26" className="text-dark" /> : <span className="text-gray-400 text-xs">none</span>}
            </div>
            <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder="mdi:briefcase-outline" />
        </div>
        <p className={helpClass}>Click one below, or paste a name from icon-sets.iconify.design.</p>
        <div className="flex flex-wrap gap-2 mt-2">
            {SUGGESTED_ICONS.map((name) => (
                <button
                    key={name}
                    type="button"
                    title={name}
                    onClick={() => onChange(name)}
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center transition cursor-pointer ${value === name ? "border-dark bg-dark/10" : "border-gray-200 hover:border-dark/40 hover:bg-gray-50"
                        }`}
                >
                    <Icon icon={name} width="20" height="20" className="text-dark" />
                </button>
            ))}
        </div>
    </div>
);

/* ------------------------------------------------------------ string list */

const ListField: React.FC<{
    value: string[];
    onChange: (v: string[]) => void;
    multiline?: boolean;
    addLabel: string;
}> = ({ value, onChange, multiline, addLabel }) => {
    const rows = value.length ? value : [""];

    const set = (i: number, v: string) => onChange(rows.map((r, idx) => (idx === i ? v : r)));
    const remove = (i: number) => onChange(rows.filter((_, idx) => idx !== i));
    const move = (i: number, dir: -1 | 1) => {
        const next = [...rows];
        const j = i + dir;
        if (j < 0 || j >= next.length) return;
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };

    return (
        <div className="space-y-2">
            {rows.map((row, i) => (
                <div key={i} className="flex gap-2 items-start">
                    <span className="w-6 h-10 flex items-center justify-center text-gray-400 text-xs shrink-0">{i + 1}</span>
                    {multiline ? (
                        <textarea value={row} onChange={(e) => set(i, e.target.value)} rows={3} className={inputClass} />
                    ) : (
                        <input value={row} onChange={(e) => set(i, e.target.value)} className={inputClass} />
                    )}
                    <div className="flex flex-col gap-0.5 shrink-0">
                        <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="Move up"
                            className="w-7 h-5 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer">
                            <Icon icon="mdi:chevron-up" width="14" height="14" />
                        </button>
                        <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} title="Move down"
                            className="w-7 h-5 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 cursor-pointer">
                            <Icon icon="mdi:chevron-down" width="14" height="14" />
                        </button>
                    </div>
                    <button type="button" onClick={() => remove(i)} title="Remove"
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 transition shrink-0 cursor-pointer">
                        <Icon icon="mdi:close" width="16" height="16" />
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => onChange([...rows, ""])}
                className="text-dark text-sm font-semibold flex items-center gap-1 mt-1 hover:underline cursor-pointer">
                <Icon icon="mdi:plus" width="16" height="16" /> {addLabel}
            </button>
        </div>
    );
};

/* --------------------------------------------------------------- dispatch */

export const FieldInput: React.FC<{
    field: Field;
    value: unknown;
    onChange: (v: unknown) => void;
}> = ({ field, value, onChange }) => {
    const str = typeof value === "string" ? value : value == null ? "" : String(value);
    const arr = Array.isArray(value) ? (value as string[]) : [];

    return (
        <div>
            <label className={labelClass}>
                {field.label}
                {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            {field.type === "textarea" && (
                <textarea value={str} onChange={(e) => onChange(e.target.value)} rows={3} className={inputClass} placeholder={field.placeholder} />
            )}
            {(field.type === "text" || field.type === "url") && (
                <input value={str} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder={field.placeholder} />
            )}
            {field.type === "number" && (
                <input type="number" value={str} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} className={inputClass} />
            )}
            {field.type === "image" && <ImageField value={str} onChange={(v) => onChange(v)} />}
            {field.type === "icon" && <IconField value={str} onChange={(v) => onChange(v)} />}
            {field.type === "paragraphs" && (
                <ListField value={arr} onChange={(v) => onChange(v)} multiline addLabel="Add paragraph" />
            )}
            {field.type === "list" && (
                <ListField value={arr} onChange={(v) => onChange(v)} addLabel="Add item" />
            )}

            {field.help && <p className={helpClass}>{field.help}</p>}
        </div>
    );
};

export { inputClass, labelClass, helpClass };
