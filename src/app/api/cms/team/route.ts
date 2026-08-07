import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function GET() {
    await dbConnect();
    const docs = await TeamMember.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(docs);
}

export async function POST(req: NextRequest) {
    await dbConnect();
    const body = await req.json();
    const doc = await TeamMember.create(body);
    return NextResponse.json(doc, { status: 201 });
}
