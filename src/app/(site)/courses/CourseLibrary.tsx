"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { Course } from "@/lib/cms";
import EnrollModal from "./EnrollModal";

const CourseLibrary: React.FC<{ courses: Course[] }> = ({ courses }) => {
    const [enrolling, setEnrolling] = useState<string | null>(null);

    if (courses.length === 0) {
        return (
            <section className="py-14 lg:py-18 xl:py-22">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 text-center">
                    <p className="text-pera-dark">
                        Our course schedule is being updated. Please{" "}
                        <a href="/contact" className="text-dark font-semibold underline underline-offset-2">get in touch</a>{" "}
                        and we&apos;ll tell you what&apos;s running next.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-prim-light overflow-hidden py-14 lg:py-18 xl:py-22">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                <div className="text-center mb-12">
                    <span className="sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3">
                        Our Course Library
                    </span>
                    <h2 className="mt-4 font-chakrapetch lg:text-35 font-semibold normal-case">
                        Training That Builds Real Capability
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(13,30,32,0.06)] hover:shadow-[0_8px_24px_rgba(13,30,32,0.10)] transition duration-500 h-full flex flex-col"
                        >
                            <div className="relative w-full aspect-video bg-prim/5 overflow-hidden">
                                {course.image ? (
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Icon icon="mdi:school-outline" width="52" height="52" className="text-dark/20" />
                                    </div>
                                )}
                                {course.standard && (
                                    <span className="absolute top-3 left-3 bg-dark text-white text-12 font-chakrapetch font-semibold px-2.5 py-1 rounded-md">
                                        {course.standard}
                                    </span>
                                )}
                            </div>

                            <div className="p-5 flex-1 flex flex-col gap-3">
                                <h3 className="font-chakrapetch font-semibold text-18 leading-snug normal-case text-gray-800">
                                    {course.title}
                                </h3>
                                <p className="text-14 text-pera-dark leading-6">{course.summary}</p>

                                {(course.duration || course.delivery || course.fee) && (
                                    <ul className="text-13 text-pera-dark space-y-1.5">
                                        {course.duration && (
                                            <li className="flex items-center gap-2">
                                                <Icon icon="mdi:clock-outline" width="16" height="16" className="text-dark shrink-0" />
                                                {course.duration}
                                            </li>
                                        )}
                                        {course.delivery && (
                                            <li className="flex items-center gap-2">
                                                <Icon icon="mdi:map-marker-outline" width="16" height="16" className="text-dark shrink-0" />
                                                {course.delivery}
                                            </li>
                                        )}
                                        {course.fee && (
                                            <li className="flex items-center gap-2">
                                                <Icon icon="mdi:tag-outline" width="16" height="16" className="text-dark shrink-0" />
                                                {course.fee}
                                            </li>
                                        )}
                                    </ul>
                                )}

                                {course.outline && course.outline.length > 0 && (
                                    <ul className="text-13 text-pera-dark space-y-1 mt-1">
                                        {course.outline.map((item, i) => (
                                            <li key={i} className="flex gap-2">
                                                <Icon icon="mdi:check" width="15" height="15" className="text-dark shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setEnrolling(course.title)}
                                    className="mt-auto pt-4 text-white bg-dark h-[46px] text-14 w-fit rounded-full font-chakrapetch font-semibold flex gap-2 ps-5 pe-2 items-center tracking-wider group cursor-pointer"
                                    style={{ paddingTop: 0, paddingBottom: 0 }}
                                >
                                    Enroll Now
                                    <Icon icon="tabler:arrow-right" width="22" height="22"
                                        className="bg-prim text-white rounded-full w-[32px] h-[32px] p-1.5 group-hover:-rotate-45 transition duration-300" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {enrolling && <EnrollModal course={enrolling} onClose={() => setEnrolling(null)} />}
        </section>
    );
};

export default CourseLibrary;
