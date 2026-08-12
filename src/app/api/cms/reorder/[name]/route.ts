import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { getModel } from "@/models/dynamic";
import { revalidateSite } from "@/lib/revalidate";

/** Takes the full list of ids in their new order. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const Model = getModel(name);
    if (!Model) return NextResponse.json({ error: "Unknown section" }, { status: 404 });
    await dbConnect();
    const { ids } = (await req.json()) as { ids: string[] };
    await Promise.all(ids.map((id, index) => Model.findByIdAndUpdate(id, { order: index })));
    revalidateSite();
    return NextResponse.json({ ok: true });
}
