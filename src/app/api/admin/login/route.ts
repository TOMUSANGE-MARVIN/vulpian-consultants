import { NextRequest, NextResponse } from "next/server";
import { createAdminToken, ADMIN_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    // Same message for either failure, so the response can't be used to probe
    // which admin email is valid.
    const invalid = () =>
        NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    if (!expectedPassword || !password || password !== expectedPassword) {
        return invalid();
    }

    // Only enforced when ADMIN_EMAIL is configured, so an existing deployment
    // that hasn't set it yet keeps working on password alone.
    if (expectedEmail) {
        if (!email || String(email).trim().toLowerCase() !== expectedEmail.trim().toLowerCase()) {
            return invalid();
        }
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
