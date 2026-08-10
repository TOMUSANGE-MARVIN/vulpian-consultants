import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { getModel } from "@/models/dynamic";
import { getCollection, slugify, youtubeId } from "@/lib/collections";

const normalise = (name: string, body: Record<string, unknown>) => {
    const collection = getCollection(name);
    if (!collection) return body;
    const out = { ...body };
    for (const field of collection.fields) {
        // Fill blank slugs from the field they derive from, so an editor never
        // has to think about web addresses.
        if (field.derivedFrom && !String(out[field.name] ?? "").trim()) {
            out[field.name] = slugify(String(out[field.derivedFrom] ?? ""));
        }
    }
    if (name === "videos" && out.videoUrl) {
        out.videoUrl = youtubeId(String(out.videoUrl));
    }
    return out;
};

export async function GET(_req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const Model = getModel(name);
    if (!Model) return NextResponse.json({ error: "Unknown section" }, { status: 404 });
    await dbConnect();
    const docs = await Model.find({}).sort({ order: 1, createdAt: 1 }).lean();
    return NextResponse.json(docs);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const Model = getModel(name);
    if (!Model) return NextResponse.json({ error: "Unknown section" }, { status: 404 });
    await dbConnect();
    const body = normalise(name, await req.json());
    const count = await Model.countDocuments({});
    const doc = await Model.create({ ...body, order: count });
    return NextResponse.json(doc, { status: 201 });
}
