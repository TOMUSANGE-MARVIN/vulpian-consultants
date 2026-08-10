import Link from "next/link";
import { Icon } from "@iconify/react";
import { dbConnect } from "@/lib/mongodb";
import { getModel } from "@/models/dynamic";
import { collections } from "@/lib/collections";

export const dynamic = "force-dynamic";

async function counts() {
    try {
        await dbConnect();
        const entries = await Promise.all(
            collections.map(async (c) => {
                const Model = getModel(c.name);
                return [c.name, Model ? await Model.countDocuments({}) : 0] as const;
            })
        );
        return Object.fromEntries(entries) as Record<string, number>;
    } catch {
        return {};
    }
}

export default async function AdminHome() {
    const totals = await counts();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold font-unbounded">Welcome back</h1>
                <p className="text-gray-500 mt-1">
                    Pick a section below to edit it. Changes appear on the website straight away.
                </p>
            </div>

            <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Overall site</h2>
                <Link href="/admin/site"
                    className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-dark/40 hover:shadow-sm transition">
                    <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-lg bg-prim-light flex items-center justify-center shrink-0">
                            <Icon icon="mdi:home-edit-outline" width="22" height="22" className="text-dark" />
                        </div>
                        <div>
                            <p className="font-semibold">Site Content</p>
                            <p className="text-gray-500 text-sm mt-0.5">
                                Headline, who we are, values, vision and mission, our approach, and contact details.
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Sections</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    {collections.map((c) => (
                        <Link key={c.name} href={`/admin/c/${c.name}`}
                            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-dark/40 hover:shadow-sm transition">
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-lg bg-prim-light flex items-center justify-center shrink-0">
                                    <Icon icon={c.icon} width="22" height="22" className="text-dark" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">{c.label}</p>
                                        {totals[c.name] !== undefined && (
                                            <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                                                {totals[c.name]}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 text-sm mt-0.5">{c.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
