"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="px-3 py-2 rounded-lg hover:bg-white/10 text-left text-red-300"
        >
            Log Out
        </button>
    );
}
