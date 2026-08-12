"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import type { Service } from "@/lib/cms";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjybrrvn";

const fieldClass =
    "w-full border-b border-gray-300 focus:border-dark focus:outline-none py-2";

type Status = "idle" | "sending" | "sent" | "error";

const ContactForm: React.FC<{ services: Service[] }> = ({ services }) => {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("sending");
        setError("");

        try {
            // Submitted over fetch rather than a plain form post so the visitor
            // stays on the site instead of landing on Formspree's page.
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" },
            });

            if (res.ok) {
                form.reset();
                setStatus("sent");
                return;
            }

            const data = await res.json().catch(() => null);
            setError(
                data?.errors?.map((x: { message: string }) => x.message).join(", ") ||
                "Something went wrong sending your message. Please try again, or email us directly."
            );
            setStatus("error");
        } catch {
            setError("We couldn't reach the server. Please check your connection and try again.");
            setStatus("error");
        }
    };

    if (status === "sent") {
        return (
            <div className="text-center py-14">
                <div className="w-16 h-16 rounded-full bg-dark/10 flex items-center justify-center mx-auto mb-5">
                    <Icon icon="mdi:check" width="32" height="32" className="text-dark" />
                </div>
                <h3 className="font-chakrapetch text-2xl font-semibold text-gray-800 normal-case mb-2">
                    Thank you - your message is on its way.
                </h3>
                <p className="text-pera-dark">
                    We&apos;ll get back to you as soon as we can.
                </p>
                <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-dark font-semibold mt-6 hover:underline cursor-pointer"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="name" className="block text-gray-600 font-medium mb-2">Full Name *</label>
                <input id="name" name="name" type="text" placeholder="Enter your name" className={fieldClass} required />
            </div>

            <div>
                <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email Address *</label>
                <input id="email" name="email" type="email" placeholder="Enter your email" className={`${fieldClass} lowercase`}
                    autoCapitalize="none" autoCorrect="off" spellCheck={false} inputMode="email" required />
            </div>

            <div>
                <label htmlFor="phone" className="block text-gray-600 font-medium mb-2">Phone number *</label>
                <input id="phone" name="phone" type="tel" placeholder="Enter your phone" className={fieldClass} required />
            </div>

            <div>
                <label htmlFor="service" className="block text-gray-600 font-medium mb-2">Service of Interest</label>
                <select id="service" name="service" className={`${fieldClass} bg-transparent`} required>
                    <option value="">Choose a service</option>
                    {services.map((s) => (
                        <option key={s._id} value={s.title}>{s.title}</option>
                    ))}
                </select>
            </div>

            <div className="md:col-span-2">
                <label htmlFor="message" className="block text-gray-600 font-medium mb-2">Type message *</label>
                <textarea id="message" name="message" rows={4} placeholder="Write your message..."
                    className={`${fieldClass} resize-none`} required />
            </div>

            {/* Honeypot: hidden from people, filled in by bots. Formspree drops
                any submission where this has a value. */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="md:col-span-2 flex flex-wrap items-center gap-4">
                <button
                    type="submit"
                    disabled={status === "sending"}
                    className="text-white bg-dark h-[50px] text-sm lg:text-16 w-fit rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group cursor-pointer disabled:opacity-60"
                >
                    {status === "sending" ? "Sending…" : "Send a Message"}
                    <Icon icon="tabler:arrow-right" width="24" height="24"
                        className="bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300" />
                </button>

                {status === "error" && (
                    <p className="text-red-600 text-sm">{error}</p>
                )}
            </div>
        </form>
    );
};

export default ContactForm;
