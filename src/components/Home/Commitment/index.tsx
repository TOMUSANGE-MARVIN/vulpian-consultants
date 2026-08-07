import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { Value } from "@/lib/cms";

type CommitmentProps = {
    paragraphs: string[];
    values: Value[];
    since: string;
};

const Commitment: React.FC<CommitmentProps> = ({ paragraphs, values, since }) => {
    return (
        <>
            <section className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22 bg-prim-light">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-8">
                    <div className="commitment-content bg-white p-8 rounded-2xl">
                        <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                            Who We Are
                        </span>
                        <h2 className='mt-4 font-chakrapetch lg:text-35 font-semibold mb-5'>
                            Empowering Organizations to Achieve Operational Excellence
                        </h2>
                        <div className="space-y-4">
                            {paragraphs.map((p, i) => (
                                <p key={i} className="text-pera-dark text-16 leading-7">{p}</p>
                            ))}
                        </div>
                        <Link
                            href="/about"
                            className='text-white bg-dark h-[50px] text-sm lg:text-16 w-fit rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group mt-8'
                        >
                            Learn More
                            <Icon icon="tabler:arrow-right" width="24" height="24" className='bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300' />
                        </Link>
                    </div>

                    <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                        <div className='w-full bg-white p-8 rounded-2xl'>
                            <h2 className='font-chakrapetch lg:text-24 font-semibold mb-5'>
                                Our Track Record
                            </h2>
                            <div className='flex gap-5'>
                                <span className='text-5xl font-semibold'>{since}</span>
                                <p className='text-pera-dark self-center'>
                                    Serving public and private sector organizations since {since}.
                                </p>
                            </div>
                        </div>

                        <div className='w-full bg-white p-8 rounded-2xl'>
                            <h2 className='font-chakrapetch lg:text-24 font-semibold mb-5'>
                                Our Values
                            </h2>
                            <ul className="flex flex-wrap gap-3 w-full">
                                {values.map((value, index) => (
                                    <li key={index} className="border border-white rounded-md overflow-hidden">
                                        <span className="bg-prim/10 px-3 py-1.5 inline-flex items-center gap-2 text-sm font-medium">
                                            <Icon icon={value.icon} width="18" height="18" />
                                            {value.title}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='w-full p-8 rounded-2xl flex justify-between items-start flex-col bg-white'>
                            <div className='mb-8'>
                                <h2 className='font-chakrapetch lg:text-24 font-semibold pb-1'>
                                    Always Available
                                </h2>
                                <p className='text-16 text-pera-dark'>
                                    Our team is always available to address your concerns, providing quick and practical solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Commitment;
