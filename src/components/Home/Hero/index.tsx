import { Icon } from '@iconify/react';
import Link from 'next/link';
import React from 'react';

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
                <div className="hero-image bg-[url(/images/hero/hero-bg.jpg)] absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat"></div>
                <div className="shape-1 absolute z-30 top-0 left-0 w-[300px] h-auto flex justify-start items-start">
                    <img src="/images/hero/pattern-2.svg" alt="element-image" />
                </div>

                <div className="shape-2 absolute z-30 right-0 bottom-0 w-[300px] h-auto flex justify-center items-center">
                    <img src="/images/hero/pattern-3.svg" alt="element-image" />
                </div>

                <div className='container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) z-20 relative text-white px-4 h-full flex flex-col justify-center items-start'>
                    <div className="hero-content text-white">
                        <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3 mb-5 inline-block'>
                            Vulpian Consultants &middot; Since {since}
                        </span>
                        <h2 className='md:text-60 sm:text-40 text-28 text-white mb-9 lg:mb-3 w-full lg:w-3/4'>
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
