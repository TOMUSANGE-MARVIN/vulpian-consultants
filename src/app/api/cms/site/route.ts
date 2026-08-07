import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";

export async function GET() {
    await dbConnect();
    let doc = await SiteContent.findOne({ key: "site" }).lean();
    if (!doc) {
        await SiteContent.create({ key: "site" });
        doc = await SiteContent.findOne({ key: "site" }).lean();
    }
    return NextResponse.json(doc);
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    const body = await req.json();
    delete body._id;
    delete body.key;

    const doc = await SiteContent.findOneAndUpdate(
        { key: "site" },
        { $set: body },
        { new: true, upsert: true }
    ).lean();

    return NextResponse.json(doc);
}
