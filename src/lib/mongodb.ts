import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable");
}

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// Reuse the connection across hot reloads / serverless invocations.
declare global {
    var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

export async function dbConnect() {
    if (cache.conn) return cache.conn;

    if (!cache.promise) {
        cache.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            // Fail fast rather than hanging. The default (30s, plus retries)
            // exceeds the build's per-page prerender budget and would leave a
            // serverless request hanging instead of degrading gracefully.
            serverSelectionTimeoutMS: 8000,
            connectTimeoutMS: 8000,
        });
    }

    try {
        cache.conn = await cache.promise;
    } catch (err) {
        // Drop the failed promise, otherwise every later call awaits the same
        // rejected one and the process never reconnects — even once the network
        // or the Atlas IP allow-list is fixed.
        cache.promise = null;
        cache.conn = null;
        throw err;
    }

    return cache.conn;
}
