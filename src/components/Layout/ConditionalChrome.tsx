"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import type { ReactNode } from "react";
import type { SubmenuItem } from "@/type/menu";

export default function ConditionalChrome({
    children,
    footer,
    serviceLinks = [],
}: {
    children: ReactNode;
    footer: ReactNode;
    serviceLinks?: SubmenuItem[];
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return <>{children}</>;

    return (
        <>
            <Header serviceLinks={serviceLinks} />
            {children}
            {footer}
        </>
    );
}
