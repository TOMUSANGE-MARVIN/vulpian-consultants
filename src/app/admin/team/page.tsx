"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { TeamMember } from "@/lib/cms";

export default function TeamAdmin() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    const load = () => {
        fetch("/api/cms/team")
            .then((r) => r.json())
            .then(setTeam)
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this team member?")) return;
        await fetch(`/api/cms/team/${id}`, { method: "DELETE" });
        load();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold font-unbounded">Team</h1>
                <Link href="/admin/team/new" className="bg-dark text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
                    + Add Member
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="bg-white rounded-xl shadow divide-y">
                    {team.map((m) => (
                        <div key={m._id} className="flex justify-between items-center p-4">
                            <div>
                                <p className="font-medium">{m.name} {m.isLead && <span className="text-xs bg-prim text-white rounded-full px-2 py-0.5 ml-2">Lead</span>}</p>
                                <p className="text-sm text-gray-500">{m.role}</p>
                            </div>
                            <div className="flex gap-3">
                                <Link href={`/admin/team/${m._id}`} className="text-prim text-sm font-medium">Edit</Link>
                                <button onClick={() => handleDelete(m._id)} className="text-red-500 text-sm font-medium">Delete</button>
                            </div>
                        </div>
                    ))}
                    {team.length === 0 && <p className="p-4 text-gray-500">No team members yet.</p>}
                </div>
            )}
        </div>
    );
}
