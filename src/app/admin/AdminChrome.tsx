"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function AdminChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // The login page sits under /admin but must not show the signed-in chrome.
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-60 shrink-0 bg-dark text-white p-6 flex flex-col gap-1 min-h-screen">
                <div className="mb-6">
                    <Image src="/images/logo/vulpian-logo-white.png" alt="Vulpian Consultants" width={173} height={162} className="h-10 w-auto" />
                    <p className="text-xs text-white/60 mt-2 tracking-wide">CONTENT MANAGEMENT</p>
                </div>
                <Link href="/admin" className="px-3 py-2 rounded-lg hover:bg-white/10">Dashboard</Link>
                <Link href="/admin/site" className="px-3 py-2 rounded-lg hover:bg-white/10">Site Content</Link>
                <Link href="/admin/services" className="px-3 py-2 rounded-lg hover:bg-white/10">Services</Link>
                <Link href="/admin/team" className="px-3 py-2 rounded-lg hover:bg-white/10">Team</Link>
                <Link href="/" target="_blank" className="px-3 py-2 rounded-lg hover:bg-white/10 mt-auto">View Site ↗</Link>
                <LogoutButton />
            </aside>
            <main className="flex-1 p-8 max-w-5xl">{children}</main>
        </div>
    );
}
