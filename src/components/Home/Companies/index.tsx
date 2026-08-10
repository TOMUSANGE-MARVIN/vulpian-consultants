"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from 'react';
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Standard } from "@/lib/cms";


const Companies: React.FC<{ standards: Standard[] }> = ({ standards }) => {
    if (standards.length === 0) return null;
    return (
        <>
            <section className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22 bg-prim-light">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-14">
                    <div className="companies-content text-center">
                        <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                            Standards We Work With
                        </span>
                        <h2 className='mt-4 font-chakrapetch lg:text-35 font-semibold'>Grounded in <span className="bg-dark text-white px-2 rounded-sm">Internationally Recognized</span> Frameworks</h2>
                    </div>
                </div>
                <div className="relative mt-10">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={5}
                        loop={true}
                        speed={3000}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        allowTouchMove={false}
                        breakpoints={{
                            320: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="companies-swiper relative"
                    >
                        {standards.map((standard) => (
                            <SwiperSlide key={standard._id}>
                                <div className="companies-item h-[120px] w-full px-4 flex flex-col items-center justify-center gap-3">
                                    <Image
                                        src={standard.src}
                                        alt={standard.label}
                                        width={157}
                                        height={160}
                                        style={{ height: standard.renderHeight || 54 }}
                                        className="standard-logo w-auto max-w-full object-contain"
                                    />
                                    <p className="standard-caption text-13 leading-tight text-center">
                                        {standard.sub}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    );
};

export default Companies;
