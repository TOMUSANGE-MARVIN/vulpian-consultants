import React from "react";
import { Icon } from "@iconify/react";
import { getVideos } from "@/lib/cms";
import Reveal from "@/components/SharedComponents/Reveal";

const Videos = async () => {
    const videos = await getVideos();
    if (videos.length === 0) return null;

    return (
        <section className="bg-prim-light overflow-hidden py-14 lg:py-18 xl:py-22">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                <div className="text-center mb-12">
                    <span className="sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3">
                        From Our Channel
                    </span>
                    <h2 className="mt-4 font-chakrapetch lg:text-35 font-semibold normal-case">
                        Insights on Quality, Audit and Leadership
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, i) => (
                        <Reveal key={video._id} direction="up" delay={(i % 3) * 90} className="w-full">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(13,30,32,0.06)] hover:shadow-[0_8px_24px_rgba(13,30,32,0.10)] transition duration-500 h-full flex flex-col">
                                <div className="relative w-full aspect-video bg-prim/5">
                                    <iframe
                                        // nocookie host, and lazy so six embeds don't
                                        // all load up front.
                                        src={`https://www.youtube-nocookie.com/embed/${video.videoUrl}`}
                                        title={video.title}
                                        loading="lazy"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full border-0"
                                    />
                                </div>
                                <div className="p-5 flex-1 flex items-start gap-3">
                                    <Icon icon="mdi:youtube" width="22" height="22" className="text-red-600 shrink-0 mt-0.5" />
                                    <h4 className="font-chakrapetch font-semibold text-16 leading-snug normal-case">
                                        {video.title}
                                    </h4>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="https://www.youtube.com/@Vulpian-Consultants"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-dark h-[50px] text-sm lg:text-16 w-fit mx-auto rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group"
                    >
                        Visit our YouTube channel
                        <Icon icon="tabler:arrow-right" width="24" height="24" className="bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Videos;
