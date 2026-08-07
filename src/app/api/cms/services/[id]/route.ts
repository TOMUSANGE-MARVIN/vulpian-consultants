import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Service from "@/models/Service";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    await dbConnect();
    const { id } = await params;
    const doc = await Service.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
}

export async function PUT(req: NextRequest, { params }: Params) {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    delete body._id;

    const doc = await Service.findByIdAndUpdate(id, { $set: body }, { new: true }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(doc);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    await dbConnect();
    const { id } = await params;
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
}
