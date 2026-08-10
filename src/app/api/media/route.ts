import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { getMediaModel } from "@/models/Media";

const MAX_BYTES = 4 * 1024 * 1024; // 4MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export async function POST(req: NextRequest) {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
        return NextResponse.json({ error: "No file was uploaded." }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
        return NextResponse.json(
            { error: "That file type isn't supported. Please use a JPG, PNG, WebP or GIF." },
            { status: 400 }
        );
    }
    if (file.size > MAX_BYTES) {
        return NextResponse.json(
            { error: `That image is ${(file.size / 1024 / 1024).toFixed(1)}MB. Please use one under 4MB.` },
            { status: 400 }
        );
    }

    await dbConnect();
    const Media = getMediaModel();
    const doc = await Media.create({
        filename: file.name,
        contentType: file.type,
        size: file.size,
        data: Buffer.from(await file.arrayBuffer()),
    });

    // Stored in Mongo rather than on disk: Vercel's filesystem is read-only,
    // so uploads written to public/ would vanish on the next deploy.
    return NextResponse.json({ url: `/api/media/${doc._id}` }, { status: 201 });
}
