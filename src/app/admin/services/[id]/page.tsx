import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import ServiceForm from "../ServiceForm";
import type { Service } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    const doc = await ServiceModel.findById(id).lean();
    if (!doc) return notFound();

    const service: Service = JSON.parse(JSON.stringify(doc));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold font-unbounded">Edit Service</h1>
            <ServiceForm id={id} initial={service} />
        </div>
    );
}
