import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { revalidateSite } from "@/lib/revalidate";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
    await dbConnect();
    const { id } = await params;
    const doc = await TeamMember.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidateSite();
    return NextResponse.json(doc);
}

export async function PUT(req: NextRequest, { params }: Params) {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    delete body._id;

    const doc = await TeamMember.findByIdAndUpdate(id, { $set: body }, { new: true }).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidateSite();
    return NextResponse.json(doc);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
    await dbConnect();
    const { id } = await params;
    await TeamMember.findByIdAndDelete(id);
    revalidateSite();
    return NextResponse.json({ ok: true });
}
