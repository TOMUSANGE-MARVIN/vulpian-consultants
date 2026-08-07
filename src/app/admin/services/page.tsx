"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/cms";

export default function ServicesAdmin() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    const load = () => {
        fetch("/api/cms/services")
            .then((r) => r.json())
            .then(setServices)
            .finally(() => setLoading(false));
    };

    useEffect(load, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this service?")) return;
        await fetch(`/api/cms/services/${id}`, { method: "DELETE" });
        load();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold font-unbounded">Services</h1>
                <Link href="/admin/services/new" className="bg-dark text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
                    + Add Service
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="bg-white rounded-xl shadow divide-y">
                    {services.map((s) => (
                        <div key={s._id} className="flex justify-between items-center p-4">
                            <div>
                                <p className="font-medium">{s.order}. {s.title}</p>
                                <p className="text-sm text-gray-500">/services/{s.slug}</p>
                            </div>
                            <div className="flex gap-3">
                                <Link href={`/admin/services/${s._id}`} className="text-prim text-sm font-medium">Edit</Link>
                                <button onClick={() => handleDelete(s._id)} className="text-red-500 text-sm font-medium">Delete</button>
                            </div>
                        </div>
                    ))}
                    {services.length === 0 && <p className="p-4 text-gray-500">No services yet.</p>}
                </div>
            )}
        </div>
    );
}
