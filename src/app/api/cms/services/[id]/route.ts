import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Service from "@/models/Service";
import { revalidateSite } from "@/lib/revalidate";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    await dbConnect();
    const { id } = await params;
    const doc = await Service.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidateSite();
    return NextResponse.json(doc);
}

export async function PUT(req: NextRequest, { params }: Params) {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    delete body._id;

    const doc = await Service.findByIdAndUpdate(id, { $set: body }, { new: true }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidateSite();
    return NextResponse.json(doc);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    await dbConnect();
    const { id } = await params;
    await Service.findByIdAndDelete(id);
    revalidateSite();
    return NextResponse.json({ ok: true });
}
