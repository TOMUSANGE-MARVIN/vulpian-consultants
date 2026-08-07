import "server-only";
import { cookies } from "next/headers";
import { signToken, verifyToken } from "./token";

export const ADMIN_COOKIE = "vulpian_admin";

function getSecret(): string {
    const secret = process.env.ADMIN_PASSWORD;
    if (!secret) throw new Error("Missing ADMIN_PASSWORD environment variable");
    return secret;
}

export async function createAdminToken(): Promise<string> {
    return signToken(getSecret());
}

export async function isAdminAuthed(): Promise<boolean> {
    const store = await cookies();
    return verifyToken(store.get(ADMIN_COOKIE)?.value, getSecret());
}
