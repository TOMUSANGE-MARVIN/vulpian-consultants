import Link from "next/link";
import { getServices, getSiteContent, getTeam } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const [site, services, team] = await Promise.all([
        getSiteContent(),
        getServices(),
        getTeam(),
    ]);

    const cards = [
        { label: "Company", value: site.companyName, href: "/admin/site" },
        { label: "Services", value: services.length, href: "/admin/services" },
        { label: "Team Members", value: team.length, href: "/admin/team" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold font-unbounded">Dashboard</h1>
            <div className="grid sm:grid-cols-3 gap-5">
                {cards.map((c) => (
                    <Link
                        key={c.label}
                        href={c.href}
                        className="bg-white rounded-xl p-6 shadow hover:shadow-md transition"
                    >
                        <p className="text-gray-500 text-sm">{c.label}</p>
                        <p className="text-2xl font-semibold mt-1">{c.value}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
