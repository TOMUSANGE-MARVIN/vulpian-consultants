"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { Icon } from "@iconify/react";
import { collections } from "@/lib/collections";

export default function AdminChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // The login page sits under /admin but must not show the signed-in chrome.
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-60 shrink-0 bg-dark text-white p-5 flex flex-col gap-0.5 min-h-screen sticky top-0 h-screen overflow-y-auto">
                <div className="mb-6">
                    <Image src="/images/logo/vulpian-logo-white.png" alt="Vulpian Consultants" width={173} height={162} className="h-10 w-auto" />
                    <p className="text-xs text-white/60 mt-2 tracking-wide">CONTENT MANAGEMENT</p>
                </div>
                <Link href="/admin" className={`px-3 py-2 rounded-lg flex items-center gap-2.5 text-sm ${pathname === "/admin" ? "bg-white/15" : "hover:bg-white/10"}`}>
                    <Icon icon="mdi:view-dashboard-outline" width="18" height="18" /> Dashboard
                </Link>
                <Link href="/admin/site" className={`px-3 py-2 rounded-lg flex items-center gap-2.5 text-sm ${pathname.startsWith("/admin/site") ? "bg-white/15" : "hover:bg-white/10"}`}>
                    <Icon icon="mdi:home-edit-outline" width="18" height="18" /> Site Content
                </Link>

                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-4 mb-1 px-3">Sections</p>
                {collections.map((c) => (
                    <Link key={c.name} href={`/admin/c/${c.name}`}
                        className={`px-3 py-2 rounded-lg flex items-center gap-2.5 text-sm ${pathname.startsWith(`/admin/c/${c.name}`) ? "bg-white/15" : "hover:bg-white/10"}`}>
                        <Icon icon={c.icon} width="18" height="18" /> {c.label}
                    </Link>
                ))}

                <Link href="/admin/account" className={`px-3 py-2 rounded-lg flex items-center gap-2.5 text-sm mt-4 ${pathname.startsWith("/admin/account") ? "bg-white/15" : "hover:bg-white/10"}`}>
                    <Icon icon="mdi:account-cog-outline" width="18" height="18" /> Login details
                </Link>

                <Link href="/" target="_blank" className="px-3 py-2 rounded-lg hover:bg-white/10 mt-auto flex items-center gap-2.5 text-sm">
                    <Icon icon="mdi:open-in-new" width="18" height="18" /> View Site
                </Link>
                <LogoutButton />
            </aside>
            <main className="flex-1 p-8 max-w-5xl">{children}</main>
        </div>
    );
}
