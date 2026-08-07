import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token";

const ADMIN_COOKIE = "vulpian_admin";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const secret = process.env.ADMIN_PASSWORD as string;
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const authed = await verifyToken(token, secret);

    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        if (!authed) {
            const url = req.nextUrl.clone();
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }
    }

    if (pathname.startsWith("/api/cms") && req.method !== "GET") {
        if (!authed) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/cms/:path*"],
};
