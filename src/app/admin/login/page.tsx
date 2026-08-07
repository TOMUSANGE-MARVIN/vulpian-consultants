"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        setLoading(false);

        if (res.ok) {
            router.push("/admin");
            router.refresh();
        } else {
            setError("Incorrect password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm space-y-5">
                <div>
                    <Image src="/images/logo/vulpian-logo-color.png" alt="Vulpian Consultants" width={173} height={162} className="h-14 w-auto mb-3" />
                    <p className="text-gray-500 text-sm mt-1">Sign in to manage site content</p>
                </div>
                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-prim"
                        required
                        autoFocus
                    />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-dark text-white rounded-lg py-2.5 font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
