import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Reveal from '@/components/SharedComponents/Reveal';

type CommitmentProps = {
    paragraphs: string[];
    since: string;
};

const Commitment: React.FC<CommitmentProps> = ({ paragraphs, since }) => {
    return (
        <section className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 flex lg:flex-row flex-col items-center gap-10">
                <Reveal direction="left" className="content w-full lg:w-1/2">
                    <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                        Who We Are
                    </span>
                    <h2 className='w-full mt-4 font-chakrapetch lg:text-35 font-semibold mb-5'>
                        Empowering Organizations to Achieve Operational Excellence
                    </h2>
                    <p className="text-pera-dark text-16 leading-7 mb-8">
                        {paragraphs[0]}
                    </p>
                    <Link
                        href="/about#who-we-are"
                        className='text-white bg-dark h-[50px] text-sm lg:text-16 w-fit rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group'
                    >
                        Read More
                        <Icon icon="tabler:arrow-right" width="24" height="24" className='bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300' />
                    </Link>
                </Reveal>

                <Reveal direction="right" className="image w-full lg:w-1/2 relative">
                    <div className="rounded-2xl overflow-hidden">
                        <Image
                            src="/images/commitment/who-we-are-home-v2.jpg"
                            alt="Vulpian Consultants leading a management systems training session"
                            width={1000}
                            height={666}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white rounded-xl shadow-xl px-6 py-4 flex items-center gap-3">
                        <Icon icon="tabler:calendar-check" width="28" height="28" className="text-prim shrink-0" />
                        <div>
                            <p className="font-chakrapetch text-2xl font-semibold leading-none">{since}</p>
                            <p className="text-13 text-pera-dark">Serving clients since</p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Commitment;
