"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
    "w-full border-b border-gray-300 focus:border-dark focus:outline-none py-2 bg-transparent";

const EnrollModal: React.FC<{ course: string; onClose: () => void }> = ({ course, onClose }) => {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState("");
    const dialogRef = useRef<HTMLDivElement>(null);
    const firstFieldRef = useRef<HTMLInputElement>(null);

    // Escape closes, and the page behind must not scroll while this is open.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        firstFieldRef.current?.focus();
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previous;
        };
    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("sending");
        setError("");

        try {
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
                "Something went wrong sending your enrolment. Please try again, or email us directly."
            );
            setStatus("error");
        } catch {
            setError("We couldn't reach the server. Please check your connection and try again.");
            setStatus("error");
        }
    };

    return (
        <div
            className="fixed inset-0 z-99 flex items-end sm:items-center justify-center bg-dark/60 backdrop-blur-sm p-0 sm:p-4"
            onMouseDown={(e) => {
                // Only a click on the backdrop itself closes, not one that
                // started inside the panel and drifted out.
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="enroll-heading"
                className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[92vh] overflow-y-auto"
            >
                <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
                    <div>
                        <h3 id="enroll-heading" className="font-chakrapetch text-xl font-semibold normal-case text-gray-800">
                            Enrol on this course
                        </h3>
                        <p className="text-14 text-pera-dark mt-1">{course}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="shrink-0 w-9 h-9 rounded-full hover:bg-prim-light flex items-center justify-center cursor-pointer"
                    >
                        <Icon icon="mdi:close" width="20" height="20" />
                    </button>
                </div>

                {status === "sent" ? (
                    <div className="p-8 text-center">
                        <div className="w-14 h-14 rounded-full bg-dark/10 flex items-center justify-center mx-auto mb-4">
                            <Icon icon="mdi:check" width="28" height="28" className="text-dark" />
                        </div>
                        <h4 className="font-chakrapetch text-lg font-semibold normal-case mb-2">
                            Thank you - your enrolment request is on its way.
                        </h4>
                        <p className="text-pera-dark text-14">
                            We&apos;ll be in touch shortly with dates, fees and the next steps.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-white bg-dark h-[46px] text-14 px-6 rounded-full font-chakrapetch font-semibold mt-6 cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-5 sm:p-6 grid gap-5">
                        {/* Tells us which course this is, and gives the email a
                            useful subject line instead of a generic one. */}
                        <input type="hidden" name="course" value={course} />
                        <input type="hidden" name="_subject" value={`Course enrolment: ${course}`} />

                        <div>
                            <label htmlFor="en-name" className="block text-gray-600 font-medium mb-1 text-14">Full name *</label>
                            <input ref={firstFieldRef} id="en-name" name="name" type="text" className={fieldClass} placeholder="Enter your name" required />
                        </div>

                        <div>
                            <label htmlFor="en-email" className="block text-gray-600 font-medium mb-1 text-14">Email address *</label>
                            <input id="en-email" name="email" type="email" className={`${fieldClass} lowercase`}
                                autoCapitalize="none" autoCorrect="off" spellCheck={false} inputMode="email"
                                placeholder="Enter your email" required />
                        </div>

                        <div>
                            <label htmlFor="en-phone" className="block text-gray-600 font-medium mb-1 text-14">Phone number *</label>
                            <input id="en-phone" name="phone" type="tel" className={fieldClass} placeholder="Enter your phone" required />
                        </div>

                        <div>
                            <label htmlFor="en-org" className="block text-gray-600 font-medium mb-1 text-14">Organization</label>
                            <input id="en-org" name="organization" type="text" className={fieldClass} placeholder="Where you work" />
                        </div>

                        <div>
                            <label htmlFor="en-msg" className="block text-gray-600 font-medium mb-1 text-14">Anything else?</label>
                            <textarea id="en-msg" name="message" rows={3} className={`${fieldClass} resize-none`}
                                placeholder="Number of participants, preferred dates, questions..." />
                        </div>

                        {/* Hidden from people, filled in by bots. */}
                        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                        <div className="flex flex-wrap items-center gap-4 pt-1">
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="text-white bg-dark h-[50px] text-sm lg:text-16 w-fit rounded-full font-chakrapetch font-semibold flex gap-2 ps-5 pe-2 py-2 justify-center items-center tracking-wider group cursor-pointer disabled:opacity-60"
                            >
                                {status === "sending" ? "Sending..." : "Submit enrolment"}
                                <Icon icon="tabler:arrow-right" width="24" height="24"
                                    className="bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300" />
                            </button>

                            {status === "error" && <p className="text-red-600 text-14">{error}</p>}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EnrollModal;
