import { NextRequest, NextResponse } from "next/server";
import { createAdminToken, ADMIN_COOKIE } from "@/lib/auth";
import { verifyCredentials } from "@/lib/credentials";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const ok = await verifyCredentials(String(email || ""), String(password || ""));
    if (!ok) {
        // One message for either failure, so the endpoint can't be used to
        // discover which email is valid.
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createAdminToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    return res;
}
