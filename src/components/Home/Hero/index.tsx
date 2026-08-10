import { Icon } from '@iconify/react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import HeroCarousel from './HeroCarousel';

type HeroProps = {
    title: string;
    quote: string;
    ctaText: string;
    ctaHref: string;
    since: string;
};

const Hero: React.FC<HeroProps> = ({ title, quote, ctaText, ctaHref, since }) => {
    return (
        <>
            <div className='hero h-screen w-full bg-midnight_text relative overflow-hidden pt-44 pb-20'>
                <HeroCarousel />
                <div aria-hidden className="shape-1 absolute z-30 top-0 left-0 w-[300px] h-auto flex justify-start items-start pointer-events-none">
                    <Image src="/images/hero/pattern-2.webp" alt="" width={600} height={203} className="w-full h-auto" />
                </div>

                <div aria-hidden className="shape-2 absolute z-30 right-0 bottom-0 w-[300px] h-auto flex justify-center items-center pointer-events-none">
                    <Image src="/images/hero/pattern-3.webp" alt="" width={600} height={203} className="w-full h-auto" />
                </div>

                <div className='container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) z-20 relative text-white px-4 h-full flex flex-col justify-center items-start'>
                    <div className="hero-content text-white">
                        <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3 mb-5 inline-block'>
                            Since {since}
                        </span>
                        {/* The company name is the hero's dominant element, and the
                            page's only h1. The CMS hero title sits under it. */}
                        <h1 className='hero-brand font-unbounded font-bold text-white normal-case tracking-[-0.02em] leading-[1.05] text-35 sm:text-50 md:text-60 xl:text-[5.25rem] mb-4'>
                            Vulpian Consultants
                        </h1>
                        <h2 className='font-chakrapetch font-medium text-white/90 normal-case tracking-wide text-20 sm:text-25 md:text-35 mb-9 lg:mb-8 w-full lg:w-3/4'>
                            {title}
                        </h2>
                        <Link
                            href={ctaHref}
                            className='text-white bg-dark h-[50px]  text-16 lg:text-sm w-fit rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group'
                        >
                            {ctaText}
                            <Icon icon="tabler:arrow-right" width="24" height="24" className='bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300' />
                        </Link>
                    </div>
                </div>

                <div className="absolute w-[320px] h-[320px] rounded-full bg-dark opacity-80 blur-[80px] -left-[50px] -bottom-[50px]"></div>

                <div className='solution-box absolute lg:block hidden lg:bottom-5 bottom-0 lg:right-5 right-0 bg-white/10 backdrop-blur-sm p-8 max-w-md rounded-md z-10'>
                    <Icon icon="tdesign:quote-filled" width="60" height="60" className='text-white' />
                    <p className='text-white pt-3 pb-8'>
                        {quote}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Hero;
