"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import type { ReactNode } from "react";
import type { SubmenuItem } from "@/type/menu";

export default function ConditionalChrome({
    children,
    footer,
    serviceLinks = [],
    contact = null,
}: {
    children: ReactNode;
    footer: ReactNode;
    serviceLinks?: SubmenuItem[];
    contact?: { address: string; phones: string[]; emails: string[] } | null;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return <>{children}</>;

    return (
        <>
            <Header serviceLinks={serviceLinks} contact={contact} />
            {children}
            {footer}
        </>
    );
}
