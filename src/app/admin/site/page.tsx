"use client";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/cms";

const EMPTY: SiteContent = {
    companyName: "",
    tagline: "",
    since: "",
    logoUrl: "",
    hero: { title: "", ctaText: "", ctaHref: "", quote: "" },
    whoWeAre: { paragraphs: [] },
    values: [],
    vision: "",
    mission: "",
    approach: [],
    contact: { address: "", phones: [], emails: [], linkedin: "", youtube: "" },
};

function StringListEditor({
    label,
    items,
    onChange,
    textarea,
}: {
    label: string;
    items: string[];
    onChange: (items: string[]) => void;
    textarea?: boolean;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
            <div className="space-y-2">
                {items.map((item, i) => (
                    <div key={i} className="flex gap-2">
                        {textarea ? (
                            <textarea
                                value={item}
                                onChange={(e) => {
                                    const next = [...items];
                                    next[i] = e.target.value;
                                    onChange(next);
                                }}
                                rows={2}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        ) : (
                            <input
                                value={item}
                                onChange={(e) => {
                                    const next = [...items];
                                    next[i] = e.target.value;
                                    onChange(next);
                                }}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        )}
                        <button
                            type="button"
                            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                            className="text-red-500 px-2"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => onChange([...items, ""])}
                    className="text-prim text-sm font-medium"
                >
                    + Add
                </button>
            </div>
        </div>
    );
}

export default function SiteContentAdmin() {
    const [data, setData] = useState<SiteContent>(EMPTY);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/cms/site")
            .then((r) => r.json())
            .then((d) => setData({ ...EMPTY, ...d, hero: { ...EMPTY.hero, ...d.hero }, whoWeAre: { ...EMPTY.whoWeAre, ...d.whoWeAre }, contact: { ...EMPTY.contact, ...d.contact } }))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        await fetch("/api/cms/site", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (loading) return <p>Loading...</p>;

    const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm";
    const sectionCls = "bg-white rounded-xl p-6 shadow space-y-4";

    return (
        <div className="space-y-6 pb-20">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold font-unbounded">Site Content</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-dark text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
                </button>
            </div>

            <div className={sectionCls}>
                <h2 className="font-semibold text-lg">Company</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Company Name</label>
                        <input className={inputCls} value={data.companyName} onChange={(e) => setData({ ...data, companyName: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Tagline</label>
                        <input className={inputCls} value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Since (year)</label>
                        <input className={inputCls} value={data.since} onChange={(e) => setData({ ...data, since: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className={sectionCls}>
                <h2 className="font-semibold text-lg">Hero Section</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                    <input className={inputCls} value={data.hero.title} onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Quote</label>
                    <textarea rows={2} className={inputCls} value={data.hero.quote} onChange={(e) => setData({ ...data, hero: { ...data.hero, quote: e.target.value } })} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Button Text</label>
                        <input className={inputCls} value={data.hero.ctaText} onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaText: e.target.value } })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Button Link</label>
                        <input className={inputCls} value={data.hero.ctaHref} onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaHref: e.target.value } })} />
                    </div>
                </div>
            </div>

            <div className={sectionCls}>
                <h2 className="font-semibold text-lg">Who We Are</h2>
                <StringListEditor
                    label="Paragraphs"
                    items={data.whoWeAre.paragraphs}
                    onChange={(paragraphs) => setData({ ...data, whoWeAre: { paragraphs } })}
                    textarea
                />
            </div>

            <div className={sectionCls}>
                <h2 className="font-semibold text-lg">Our Values</h2>
                <div className="space-y-2">
                    {data.values.map((v, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                placeholder="Title"
                                className={inputCls}
                                value={v.title}
                                onChange={(e) => {
                                    const next = [...data.values];
                                    next[i] = { ...next[i], title: e.target.value };
                                    setData({ ...data, values: next });
                                }}
                            />
                            <input
                                placeholder="Iconify icon name (e.g. mdi:trophy-outline)"
                                className={inputCls}
                                value={v.icon}
                                onChange={(e) => {
                                    const next = [...data.values];
                                    next[i] = { ...next[i], icon: e.target.value };
                                    setData({ ...data, values: next });
                                }}
                            />
                            <button type="button" onClick={() => setData({ ...data, values: data.values.filter((_, idx) => idx !== i) })} className="text-red-500 px-2">✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => setData({ ...data, values: [...data.values, { title: "", icon: "" }] })} className="text-prim text-sm font-medium">+ Add Value</button>
                </div>
            </div>

            <div className={sectionCls}>
                <h2 className="font-semibold text-lg">Vision &amp; Mission</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Vision Statement</label>
                    <textarea rows={2} className={inputCls} value={data.vision} onChange={(e) => setData({ ...data, vision: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Mission Statement</label>
                    <textarea rows={2} className={inputCls} value={data.mission} onChange={(e) => setData({ ...data, mission: e.target.value })} />
                </div>
            </div>

            <div className={sectionCls}>
                <h2 className="font-semibold text-lg">Our Approach</h2>
                <div className="space-y-2">
                    {data.approach.map((step, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                placeholder="Title"
                                className={inputCls}
                                value={step.title}
                                onChange={(e) => {
                                    const next = [...data.approach];
                                    next[i] = { ...next[i], title: e.target.value };
                                    setData({ ...data, approach: next });
                                }}
                            />
                            <input
                                placeholder="Description"
                                className={inputCls}
                                value={step.description}
                                onChange={(e) => {
                                    const next = [...data.approach];
                                    next[i] = { ...next[i], description: e.target.value };
                                    setData({ ...data, approach: next });
                                }}
                            />
                            <button type="button" onClick={() => setData({ ...data, approach: data.approach.filter((_, idx) => idx !== i) })} className="text-red-500 px-2">✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => setData({ ...data, approach: [...data.approach, { title: "", description: "" }] })} className="text-prim text-sm font-medium">+ Add Step</button>
                </div>
            </div>

            <div className={sectionCls}>
                <h2 className="font-semibold text-lg">Contact</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                    <input className={inputCls} value={data.contact.address} onChange={(e) => setData({ ...data, contact: { ...data.contact, address: e.target.value } })} />
                </div>
                <StringListEditor label="Phone Numbers" items={data.contact.phones} onChange={(phones) => setData({ ...data, contact: { ...data.contact, phones } })} />
                <StringListEditor label="Emails" items={data.contact.emails} onChange={(emails) => setData({ ...data, contact: { ...data.contact, emails } })} />
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn</label>
                        <input className={inputCls} value={data.contact.linkedin} onChange={(e) => setData({ ...data, contact: { ...data.contact, linkedin: e.target.value } })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">YouTube</label>
                        <input className={inputCls} value={data.contact.youtube} onChange={(e) => setData({ ...data, contact: { ...data.contact, youtube: e.target.value } })} />
                    </div>
                </div>
            </div>
        </div>
    );
}
