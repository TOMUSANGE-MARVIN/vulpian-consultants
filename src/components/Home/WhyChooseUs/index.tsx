import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Reveal from "@/components/SharedComponents/Reveal";
import { getReasons, type Reason } from "@/lib/cms";


const Feature: React.FC<{ item: Reason }> = ({ item }) => (
    <div className="text-center">
        <Icon icon={item.icon} width="34" height="34" className="text-dark mx-auto mb-4" />
        <h4 className="font-chakrapetch font-semibold text-18 mb-2 normal-case">{item.title}</h4>
        <p className="text-pera-dark text-14 leading-6 max-w-xs mx-auto">{item.description}</p>
    </div>
);

const WhyChooseUs = async () => {
    const reasons = await getReasons();
    if (reasons.length === 0) return null;

    return (
        <section className="overflow-hidden py-14 lg:py-18 xl:py-22 bg-prim-light">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                <div className="text-center mb-14">
                    <h2 className="font-chakrapetch text-28 lg:text-40 font-semibold normal-case">
                        Why choose <em className="font-unbounded italic font-normal">us?</em>
                    </h2>
                    <p className="text-pera-dark max-w-xl mx-auto mt-4 leading-7">
                        From quality management systems to risk, training and process
                        improvement - practical consulting that leaves your organization
                        stronger than we found it.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-8 items-center">
                    {/* left column */}
                    <div className="space-y-12 order-2 lg:order-1">
                        {reasons.slice(0, 2).map((r, i) => (
                            <Reveal key={r._id} direction="left" delay={i * 120}><Feature item={r} /></Reveal>
                        ))}
                    </div>

                    {/* centre image, with the offset accent panel behind it */}
                    <Reveal direction="up" className="order-1 lg:order-2 mx-auto w-full max-w-[340px]">
                        <div className="relative">
                            <div
                                aria-hidden
                                className="absolute -bottom-4 -right-4 w-full h-full rounded-sm bg-dark/25"
                            />
                            <Image
                                src="/images/about/why-choose-us.jpg"
                                alt="Vulpian Consultants delivering an internal audit training session"
                                width={760}
                                height={927}
                                sizes="(max-width: 1024px) 90vw, 340px"
                                className="relative w-full h-auto object-cover"
                            />
                        </div>
                    </Reveal>

                    {/* right column */}
                    <div className="space-y-12 order-3">
                        {reasons.slice(2, 4).map((r, i) => (
                            <Reveal key={r._id} direction="right" delay={i * 120}><Feature item={r} /></Reveal>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-14">
                    <Link
                        href="/contact"
                        className="text-white bg-dark h-[50px] text-sm lg:text-16 w-fit mx-auto rounded-full font-chakrapetch font-semibold flex gap-2 ps-6 pe-2 py-2 justify-center items-center tracking-wider group"
                    >
                        Get a free consultation
                        <Icon
                            icon="tabler:arrow-right"
                            width="24"
                            height="24"
                            className="bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
