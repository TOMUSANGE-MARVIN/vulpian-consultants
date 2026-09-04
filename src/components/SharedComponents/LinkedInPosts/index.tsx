import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { getLinkedInPosts, getSiteContent } from "@/lib/cms";
import { externalUrl, linkedinProfileUrl } from "@/lib/links";
import Reveal from "@/components/SharedComponents/Reveal";

const LinkedInPosts = async () => {
    const [posts, site] = await Promise.all([getLinkedInPosts(), getSiteContent()]);
    if (posts.length === 0) return null;

    const profile = linkedinProfileUrl(site.contact?.linkedin || "");

    return (
        <section className="bg-white overflow-hidden py-14 lg:py-18 xl:py-22">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                <div className="text-center mb-12">
                    <span className="sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3">
                        From LinkedIn
                    </span>
                    <h2 className="mt-4 font-chakrapetch lg:text-35 font-semibold normal-case">
                        What We&apos;ve Been Sharing
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, i) => (
                        <Reveal key={post._id} direction="up" delay={(i % 3) * 90} className="w-full">
                            <a
                                href={externalUrl(post.postUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(13,30,32,0.06)] hover:shadow-[0_8px_24px_rgba(13,30,32,0.10)] transition duration-500 h-full flex flex-col group"
                            >
                                <div className="relative w-full aspect-video bg-prim/5 overflow-hidden">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    ) : (
                                        // A post without an uploaded image still gets a
                                        // card rather than a broken or empty box.
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Icon icon="mdi:linkedin" width="56" height="56" className="text-[#0A66C2]/30" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 flex-1 flex flex-col gap-3">
                                    <div className="flex items-start gap-3">
                                        <Icon icon="mdi:linkedin" width="22" height="22" className="text-[#0A66C2] shrink-0 mt-0.5" />
                                        <h4 className="font-chakrapetch font-semibold text-16 leading-snug normal-case">
                                            {post.title}
                                        </h4>
                                    </div>
                                    <span className="mt-auto inline-flex items-center gap-1.5 text-14 font-semibold text-dark">
                                        Read on LinkedIn
                                        <Icon icon="tabler:arrow-up-right" width="16" height="16"
                                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
                                    </span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>

                {profile && (
                    <div className="text-center mt-12">
                        <a
                            href={profile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-dark h-[50px] text-sm lg:text-16 w-fit mx-auto rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group"
                        >
                            Follow us on LinkedIn
                            <Icon icon="tabler:arrow-right" width="24" height="24" className="bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300" />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LinkedInPosts;
