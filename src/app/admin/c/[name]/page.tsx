import { notFound } from "next/navigation";
import { getCollection } from "@/lib/collections";
import CollectionList from "@/app/admin/components/CollectionList";

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const collection = getCollection(name);
    if (!collection) notFound();
    return <CollectionList collection={collection} />;
}
