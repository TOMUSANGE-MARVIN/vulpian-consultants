"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Icon } from "@iconify/react";

const standards = [
    { label: "ISO 9001:2015", sub: "Quality Management", icon: "mdi:certificate-outline" },
    { label: "ISO 31000:2018", sub: "Risk Management", icon: "carbon:risk" },
    { label: "ISO 19011", sub: "Auditing Guidelines", icon: "mdi:clipboard-check-outline" },
    { label: "PECB Certified", sub: "Training & Certification", icon: "mdi:school-outline" },
    { label: "PMP®", sub: "Project Management", icon: "mdi:briefcase-outline" },
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
                                <div className="companies-item h-[100px] w-full bg-white shadow-xl px-6 rounded-xl flex items-center gap-3 justify-center cursor-pointer">
                                    <Icon icon={standard.icon} width="32" height="32" className="text-dark shrink-0" />
                                    <div className="text-left">
                                        <p className="font-chakrapetch font-semibold text-15 leading-tight">{standard.label}</p>
                                        <p className="text-13 text-pera-dark leading-tight">{standard.sub}</p>
                                    </div>
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
