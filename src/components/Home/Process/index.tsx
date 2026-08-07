import { Icon } from "@iconify/react";
import Link from 'next/link';
import React from 'react';
import type { ApproachStep } from "@/lib/cms";

type ProcessProps = { approach: ApproachStep[] };

const Process: React.FC<ProcessProps> = ({ approach }) => {
    return (
        <>
            <section className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22 bg-prim-light">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-14">
                    <div className="process-content flex justify-between items-start xl:items-end gap-2 flex-col xl:flex-row">
                        <div>
                            <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                                Our Approach
                            </span>
                            <h2 className='w-full lg:w-3/4 mt-4 font-chakrapetch lg:text-35 font-semibold'>Every Engagement is Built on Five Principles</h2>
                        </div>
                        <div className="space-x-3 flex xl:flex-row flex-col xl:space-y-0 space-y-3">
                            <Link
                                href="/contact"
                                className='text-white bg-dark h-[50px] text-sm lg:text-16 xl:w-[230px] w-fit rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group mt-5 lg:mt-0'
                            >
                                Request a Call
                                <Icon icon="tabler:arrow-right" width="24" height="24" className='bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300' />
                            </Link>
                        </div>
                    </div>
                    <div className="process-wrapper grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {approach.map((step, index) => (
                            <div key={index} className="process-item bg-white shadow-xl rounded-lg p-8 relative">
                                <span className="font-unbounded">{String(index + 1).padStart(2, "0")}</span>
                                <h4 className="font-chakrapetch font-semibold pb-3">{step.title}</h4>
                                <p className="text-16 text-pera-dark">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Process;
