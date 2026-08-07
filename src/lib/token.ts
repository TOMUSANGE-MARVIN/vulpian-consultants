// Minimal HMAC-signed session token using Web Crypto (SubtleCrypto),
// which works in both the Node.js and Edge runtimes — unlike `jsonwebtoken`,
// so the same code runs in middleware and in route handlers.

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function toBase64Url(bytes: Uint8Array): string {
    let str = "";
    for (const b of bytes) str += String.fromCharCode(b);
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(b64url: string): Uint8Array {
    const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
    const str = atob(b64);
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
    return bytes;
}

async function getKey(secret: string) {
    return crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"]
    );
}

export async function signToken(secret: string): Promise<string> {
    const payload = JSON.stringify({ role: "admin", exp: Date.now() + WEEK_MS });
    const payloadB64 = toBase64Url(new TextEncoder().encode(payload));
    const key = await getKey(secret);
    const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
    const sigB64 = toBase64Url(new Uint8Array(sig));
    return `${payloadB64}.${sigB64}`;
}

export async function verifyToken(token: string | undefined, secret: string): Promise<boolean> {
    if (!token) return false;
    const [payloadB64, sigB64] = token.split(".");
    if (!payloadB64 || !sigB64) return false;

    try {
        const key = await getKey(secret);
        const valid = await crypto.subtle.verify(
            "HMAC",
            key,
            fromBase64Url(sigB64) as BufferSource,
            new TextEncoder().encode(payloadB64) as BufferSource
        );
        if (!valid) return false;

        const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)));
        return payload.role === "admin" && payload.exp > Date.now();
    } catch {
        return false;
    }
}
