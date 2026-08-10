import { NextRequest, NextResponse } from "next/server";
import { getAdminUser, saveCredentials, verifyCredentials } from "@/lib/credentials";

export async function GET() {
    try {
        const user = await getAdminUser();
        return NextResponse.json({ email: user?.email ?? process.env.ADMIN_EMAIL ?? "" });
    } catch {
        return NextResponse.json({ email: process.env.ADMIN_EMAIL ?? "" });
    }
}

export async function PUT(req: NextRequest) {
    const { email, currentPassword, newPassword } = await req.json();

    if (!email || !String(email).includes("@")) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Always re-check the current password: the session cookie alone must not be
    // enough to take over the account.
    const current = await getAdminUser();
    const currentEmail = current?.email ?? process.env.ADMIN_EMAIL ?? "";
    const ok = await verifyCredentials(currentEmail, String(currentPassword || ""));
    if (!ok) {
        return NextResponse.json({ error: "Your current password isn't correct." }, { status: 401 });
    }

    if (newPassword && String(newPassword).length < 8) {
        return NextResponse.json({ error: "Please use a password of at least 8 characters." }, { status: 400 });
    }

    await saveCredentials(String(email).trim(), newPassword ? String(newPassword) : undefined);
    return NextResponse.json({ ok: true });
}
