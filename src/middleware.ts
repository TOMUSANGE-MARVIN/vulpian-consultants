import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token";

const ADMIN_COOKIE = "vulpian_admin";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const secret = (process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD) as string;
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const authed = await verifyToken(token, secret);

    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        if (!authed) {
            const url = req.nextUrl.clone();
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }
    }

    // Uploads and every content mutation require a signed-in admin. Media GETs
    // stay public so images can be served to visitors.
    const isWrite = req.method !== "GET";
    if ((pathname.startsWith("/api/cms") || pathname.startsWith("/api/media") || pathname.startsWith("/api/admin/account")) && isWrite) {
        if (!authed) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/cms/:path*", "/api/media/:path*", "/api/admin/account"],
};
