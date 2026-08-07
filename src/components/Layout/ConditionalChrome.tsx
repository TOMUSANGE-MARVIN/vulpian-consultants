"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import type { ReactNode } from "react";

export default function ConditionalChrome({
    children,
    footer,
}: {
    children: ReactNode;
    footer: ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) return <>{children}</>;

    return (
        <>
            <Header />
            {children}
            {footer}
        </>
    );
}
