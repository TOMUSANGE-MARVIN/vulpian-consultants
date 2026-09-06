import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongodb";
import { getMediaModel } from "@/models/Media";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await dbConnect();
    const doc = await getMediaModel().findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const record = doc as unknown as { data: unknown; contentType: string };

    // .lean() skips Mongoose's casting, so a Buffer field comes back as the
    // driver's BSON Binary rather than a Node Buffer. Passing that straight to
    // Uint8Array yields zero bytes - a 200 with an empty body, which browsers
    // render as a broken image. Unwrap whichever form we are handed.
    const raw = record.data;
    const bytes = Buffer.isBuffer(raw)
        ? raw
        : Buffer.isBuffer((raw as { buffer?: Buffer })?.buffer)
            ? (raw as { buffer: Buffer }).buffer
            : null;

    if (!bytes || bytes.length === 0) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(bytes), {
        headers: {
            "Content-Type": record.contentType || "application/octet-stream",
            "Content-Length": String(bytes.length),
            // Immutable: the id changes whenever a new file is uploaded.
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
