import { notFound } from "next/navigation";
import { getCollection } from "@/lib/collections";
import CollectionForm from "@/app/admin/components/CollectionForm";

export default async function Page({ params }: { params: Promise<{ name: string; id: string }> }) {
    const { name, id } = await params;
    const collection = getCollection(name);
    if (!collection) notFound();
    return <CollectionForm collection={collection} id={id} />;
}
