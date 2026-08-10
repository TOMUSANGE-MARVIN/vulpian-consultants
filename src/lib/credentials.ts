import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { dbConnect } from "./mongodb";
import { getAdminUserModel } from "@/models/AdminUser";

export const hashPassword = (password: string, salt = randomBytes(16).toString("hex")) => ({
    salt,
    passwordHash: scryptSync(password, salt, 64).toString("hex"),
});

const matches = (password: string, salt: string, expected: string) => {
    const actual = scryptSync(password, salt, 64);
    const want = Buffer.from(expected, "hex");
    // Constant-time compare so the response can't be timed to guess the hash.
    return actual.length === want.length && timingSafeEqual(actual, want);
};

export type AdminRecord = { _id: string; email: string; salt: string; passwordHash: string };

export async function getAdminUser(): Promise<AdminRecord | null> {
    await dbConnect();
    const doc = await getAdminUserModel().findOne({}).lean();
    return doc ? (JSON.parse(JSON.stringify(doc)) as AdminRecord) : null;
}

/**
 * Verifies a login. Credentials live in the database once they've been set from
 * the admin; until then the .env values act as the bootstrap account, so an
 * existing deployment keeps working without a migration step.
 */
export async function verifyCredentials(email: string, password: string): Promise<boolean> {
    if (!password) return false;

    let user: AdminRecord | null = null;
    try {
        user = await getAdminUser();
    } catch {
        user = null; // database down: fall through to the env fallback
    }

    if (user) {
        const emailOk = String(email || "").trim().toLowerCase() === user.email.trim().toLowerCase();
        return emailOk && matches(password, user.salt, user.passwordHash);
    }

    const envPassword = process.env.ADMIN_PASSWORD;
    const envEmail = process.env.ADMIN_EMAIL;
    if (!envPassword || password !== envPassword) return false;
    if (envEmail && String(email || "").trim().toLowerCase() !== envEmail.trim().toLowerCase()) return false;
    return true;
}

/** Creates the record on first change, updates it thereafter. */
export async function saveCredentials(email: string, password?: string) {
    await dbConnect();
    const Model = getAdminUserModel();
    const existing = await Model.findOne({});

    const update: Record<string, string> = { email };
    if (password) Object.assign(update, hashPassword(password));

    if (existing) {
        await Model.findByIdAndUpdate(existing._id, update);
    } else {
        // Seeding from env for the very first save, so a blank password field
        // doesn't lock the owner out.
        const pw = password || process.env.ADMIN_PASSWORD || "";
        await Model.create({ email, ...hashPassword(pw) });
    }
}
