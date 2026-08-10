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

    const record = doc as unknown as { data: Buffer; contentType: string };
    return new NextResponse(new Uint8Array(record.data), {
        headers: {
            "Content-Type": record.contentType || "application/octet-stream",
            // Immutable: the id changes whenever a new file is uploaded.
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
