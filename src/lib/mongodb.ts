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
        });
    }

    cache.conn = await cache.promise;
    return cache.conn;
}
