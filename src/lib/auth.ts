import "server-only";
import { cookies } from "next/headers";
import { signToken, verifyToken } from "./token";

export const ADMIN_COOKIE = "vulpian_admin";

function getSecret(): string {
    // Signing secret is deliberately separate from the admin password: the
    // password can now be changed from the admin, and sessions must survive it.
    // AUTH_SECRET is preferred; ADMIN_PASSWORD is kept as a fallback so existing
    // deployments keep working without adding a new variable.
    const secret = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD;
    if (!secret) throw new Error("Set AUTH_SECRET (or ADMIN_PASSWORD) in the environment");
    return secret;
}

export async function createAdminToken(): Promise<string> {
    return signToken(getSecret());
}

export async function isAdminAuthed(): Promise<boolean> {
    const store = await cookies();
    return verifyToken(store.get(ADMIN_COOKIE)?.value, getSecret());
}
