"use client";

import React, { useState } from 'react';
import type { ApproachStep } from "@/lib/cms";
import { howItWorksByStage, howItWorksFallback } from "@/lib/staticContent";
import Reveal from "@/components/SharedComponents/Reveal";

type ProcessProps = { approach: ApproachStep[] };

const Process: React.FC<ProcessProps> = ({ approach }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeStep = approach[activeIndex];
    const activeItems = (activeStep && howItWorksByStage[activeStep.title]) || howItWorksFallback;

    return (
        <section id="process" className="relative bg-white overflow-hidden py-14 lg:py-18 xl:py-22 scroll-mt-32">
            {/* soft glow behind the stacked card */}
            <div
                aria-hidden
                className="pointer-events-none absolute right-[6%] bottom-0 w-[460px] h-[460px] rounded-full blur-[80px] opacity-70"
                style={{ background: "radial-gradient(circle, #3866B1 0%, transparent 68%)" }}
            />

            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                <div className="relative">

                    {/* header */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-12 lg:mb-16">
                        <div>
                            <span className="inline-block text-[11px] tracking-[0.18em] font-semibold uppercase text-dark bg-dark/8 border border-dark/15 rounded-md px-2.5 py-1">
                                Process
                            </span>
                            <h2 className="mt-5 font-chakrapetch text-28 lg:text-35 font-semibold leading-tight text-prim normal-case">
                                Every Engagement is Built
                                <br className="hidden sm:block" /> on Five Principles
                            </h2>
                        </div>
                        <div className="lg:pt-2">
                            <p className="text-16 leading-7 text-pera-dark max-w-md lg:ml-auto">
                                A structured, practical approach refined across public and private
                                sector engagements. Select a stage to see what it involves.
                            </p>
                        </div>
                    </div>

                    {/* body: steps | dividers | how it works */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-10 lg:gap-8 items-start">

                        {/* selectable principles */}
                        <Reveal direction="left" className="w-full">
                        <ol className="space-y-2">
                            {approach.map((step, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <li key={index}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveIndex(index)}
                                            aria-pressed={isActive}
                                            className="w-full text-left rounded-lg px-3 py-2.5 -mx-3 transition duration-300 hover:bg-prim-light/70 cursor-pointer"
                                        >
                                            <h4
                                                className={`font-chakrapetch font-semibold text-18 mb-1.5 transition-colors duration-300 ${isActive ? "text-dark" : "text-prim"
                                                    }`}
                                            >
                                                {index + 1}. {step.title}
                                            </h4>
                                            <p
                                                className={`text-14 leading-6 max-w-[260px] transition-colors duration-300 ${isActive ? "text-pera-dark" : "text-pera-dark/70"
                                                    }`}
                                            >
                                                {step.description}
                                            </p>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                        </Reveal>

                        {/* divider ticks - the active stage is accented */}
                        <div className="hidden lg:flex flex-col gap-2 pt-2" aria-hidden>
                            {approach.map((_, index) => (
                                <span
                                    key={index}
                                    className={`block w-[2px] h-[72px] rounded-full transition-colors duration-300 ${index === activeIndex ? "bg-dark" : "bg-border"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* stacked "how it works" card */}
                        <Reveal direction="right" className="relative lg:pl-4 lg:-mt-2">
                            {/* stacked sheets behind */}
                            <div aria-hidden className="absolute inset-0 bg-white rounded-2xl shadow-md rotate-[4deg] translate-x-2 translate-y-1" />
                            <div aria-hidden className="absolute inset-0 bg-white rounded-2xl shadow-md rotate-[2deg] translate-x-1" />

                            {/* keyed on the active stage so it replays the pull-to-front animation */}
                            <div
                                key={activeIndex}
                                className="card-pull-to-front relative bg-white rounded-2xl shadow-xl border border-border/40 px-7 py-8"
                            >
                                <h4 className="text-center font-chakrapetch font-semibold text-18 tracking-[0.12em] uppercase text-prim mb-1">
                                    How it works
                                </h4>
                                <p className="text-center text-13 text-dark font-semibold uppercase tracking-[0.1em] mb-5">
                                    {activeStep?.title}
                                </p>
                                <ol className="list-decimal ps-5 space-y-2.5 marker:text-pera-dark marker:text-14">
                                    {activeItems.map((item, index) => (
                                        <li key={index} className="text-14 leading-6 text-pera-dark">
                                            {item}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
