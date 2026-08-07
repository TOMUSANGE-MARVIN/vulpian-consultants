import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import TeamMemberModel from "@/models/TeamMember";
import TeamForm from "../TeamForm";
import type { TeamMember } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    const doc = await TeamMemberModel.findById(id).lean();
    if (!doc) return notFound();

    const member: TeamMember = JSON.parse(JSON.stringify(doc));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold font-unbounded">Edit Team Member</h1>
            <TeamForm id={id} initial={member} />
        </div>
    );
}
