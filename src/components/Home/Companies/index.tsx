"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from 'react';
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// renderHeight is tuned per logo so they carry similar optical weight —
// the wide PECB wordmark needs less height than the circular marks.
const standards = [
    { label: "ISO 9001:2015", sub: "Quality Management", src: "/images/standards/iso-9001.png", width: 157, height: 160, renderHeight: 58 },
    { label: "ISO 31000:2018", sub: "Risk Management", src: "/images/standards/iso-31000.png", width: 162, height: 160, renderHeight: 58 },
    { label: "ISO 19011", sub: "Auditing Guidelines", src: "/images/standards/iso-19011.png", width: 218, height: 160, renderHeight: 52 },
    { label: "PECB", sub: "Training & Certification", src: "/images/standards/pecb.png", width: 378, height: 160, renderHeight: 40 },
    { label: "PMP®", sub: "Project Management", src: "/images/standards/pmp.png", width: 162, height: 160, renderHeight: 60 },
];

const Companies: React.FC = () => {
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
                        {standards.map((standard, index) => (
                            <SwiperSlide key={index}>
                                <div className="companies-item h-[120px] w-full px-4 flex flex-col items-center justify-center gap-3">
                                    <Image
                                        src={standard.src}
                                        alt={standard.label}
                                        width={standard.width}
                                        height={standard.height}
                                        style={{ height: standard.renderHeight }}
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
