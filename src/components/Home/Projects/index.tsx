"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import React, { useRef, useState } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

import type { FocusArea } from "@/lib/cms";

const Projects: React.FC<{ projects: FocusArea[] }> = ({ projects }) => {
    const swiperRef = useRef<SwiperClass | null>(null);
    const [active, setActive] = useState(0);

    return (
        <>
            <section className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22 bg-prim-light">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-14">
                    <div className="projects-content text-center mb-10">
                        <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                            Our Focus Areas
                        </span>
                        <h2 className='mt-4 font-chakrapetch lg:text-35 font-semibold'>Where We Create the Most Impact.</h2>
                    </div>
                </div>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1.5}
                    loop={true}
                    centeredSlides={true}
                    speed={700}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    onSlideChange={(swiper) => setActive(swiper.realIndex % projects.length)}
                    breakpoints={{
                        1400: { slidesPerView: 1.5 },
                        0: { slidesPerView: 1 }
                    }}
                >
                    {projects.concat(projects).map((project, index) => (
                        <SwiperSlide key={index}>
                            <div className="project-item flex flex-col sm:flex-row justify-center items-center w-full bg-white shadow-2xl p-5 rounded-xl gap-5 h-auto lg:h-[550px]">
                                <div className="project-image w-full sm:w-[50%] h-full">
                                    <Image
                                        src={project.image}
                                        width={800}
                                        height={1000}
                                        sizes="(max-width: 640px) 100vw, 35vw"
                                        alt="project-image"
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                                <div className="project-content w-full sm:w-[50%]">
                                    <span className="bg-white border border-prim rounded-sm px-2 text-prim font-chakrapetch font-medium">
                                        {project.category}
                                    </span>
                                    <h4 className="font-unbounded text-16 lg:text-24 pt-2 pb-4">{project.title}</h4>
                                    <p className="text-pera-dark font-normal text-14 pb-5">{project.description}</p>
                                    <Link
                                        href={project.link}
                                        className="text-white bg-dark h-[50px] text-16 lg:text-sm w-fit rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group"
                                    >
                                        Learn more
                                        <Icon
                                            icon="tabler:arrow-right"
                                            width="24"
                                            height="24"
                                            className="bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="focus-pagination">
                    {projects.map((project, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => swiperRef.current?.slideToLoop(index)}
                            aria-label={`Show ${project.title}`}
                            aria-current={active === index}
                            className={`focus-dot ${active === index ? "focus-dot-active" : ""}`}
                        />
                    ))}
                </div>

            </section >
        </>
    );
};

export default Projects;