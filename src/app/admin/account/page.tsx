"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { inputClass, labelClass, helpClass } from "@/app/admin/components/Fields";

export default function AccountPage() {
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/admin/account")
            .then((r) => r.json())
            .then((d) => { setEmail(d.email || ""); setLoading(false); });
    }, []);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSaved(false);

        if (newPassword && newPassword !== confirmPassword) {
            setError("The two new passwords don't match.");
            return;
        }
        if (!currentPassword) {
            setError("Please enter your current password to confirm the change.");
            return;
        }

        setSaving(true);
        const res = await fetch("/api/admin/account", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, currentPassword, newPassword: newPassword || undefined }),
        });
        const data = await res.json();
        setSaving(false);

        if (!res.ok) { setError(data.error || "That didn't save."); return; }
        setSaved(true);
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    };

    if (loading) return <p className="text-gray-400 text-sm">Loading…</p>;

    return (
        <div className="space-y-6 max-w-xl">
            <div>
                <h1 className="text-2xl font-semibold font-unbounded">Login details</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Change the email address and password you use to sign in here.
                </p>
            </div>

            <form onSubmit={submit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <div>
                    <label className={labelClass}>Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required autoComplete="username" />
                    <p className={helpClass}>This is the address you sign in with.</p>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-5">
                    <div>
                        <label className={labelClass}>New password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} autoComplete="new-password" placeholder="Leave blank to keep your current one" />
                        <p className={helpClass}>At least 8 characters. Leave empty if you only want to change your email.</p>
                    </div>
                    {newPassword && (
                        <div>
                            <label className={labelClass}>Confirm new password</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} autoComplete="new-password" />
                        </div>
                    )}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <label className={labelClass}>Current password</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={inputClass} required autoComplete="current-password" />
                    <p className="text-amber-800 text-xs mt-1.5">Required to confirm it&apos;s really you.</p>
                </div>

                {error && <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}

                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                    <button type="submit" disabled={saving}
                        className="bg-dark text-white rounded-lg px-6 py-2.5 font-semibold hover:opacity-90 disabled:opacity-50 transition cursor-pointer">
                        {saving ? "Saving…" : "Save changes"}
                    </button>
                    {saved && (
                        <span className="text-green-700 text-sm font-medium flex items-center gap-1">
                            <Icon icon="mdi:check-circle" width="17" height="17" /> Saved. Use these details next time you sign in.
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}
