import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { getModel } from "@/models/dynamic";
import { getCollection, slugify, youtubeId } from "@/lib/collections";
import { revalidateSite } from "@/lib/revalidate";

const normalise = (name: string, body: Record<string, unknown>) => {
    const collection = getCollection(name);
    if (!collection) return body;
    const out = { ...body };
    for (const field of collection.fields) {
        if (field.derivedFrom && !String(out[field.name] ?? "").trim()) {
            out[field.name] = slugify(String(out[field.derivedFrom] ?? ""));
        }
    }
    if (name === "videos" && out.videoUrl) {
        out.videoUrl = youtubeId(String(out.videoUrl));
    }
    return out;
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ name: string; id: string }> }) {
    const { name, id } = await params;
    const Model = getModel(name);
    if (!Model) return NextResponse.json({ error: "Unknown section" }, { status: 404 });
    await dbConnect();
    const doc = await Model.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidateSite();
    return NextResponse.json(doc);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ name: string; id: string }> }) {
    const { name, id } = await params;
    const Model = getModel(name);
    if (!Model) return NextResponse.json({ error: "Unknown section" }, { status: 404 });
    await dbConnect();
    const body = normalise(name, await req.json());
    const doc = await Model.findByIdAndUpdate(id, body, { new: true });
    revalidateSite();
    return NextResponse.json(doc);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ name: string; id: string }> }) {
    const { name, id } = await params;
    const Model = getModel(name);
    if (!Model) return NextResponse.json({ error: "Unknown section" }, { status: 404 });
    await dbConnect();
    await Model.findByIdAndDelete(id);
    revalidateSite();
    return NextResponse.json({ ok: true });
}
