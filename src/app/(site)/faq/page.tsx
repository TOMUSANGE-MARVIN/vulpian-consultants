"use client";
import React, { useState } from "react";
import Image from "next/image";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Icon } from "@iconify/react";
import { faqs } from "@/lib/staticContent";

const Page = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/faq", text: "Faq" },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <HeroSub title="Faq" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-5.jpg" />

            <div className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 flex lg:flex-nowrap flex-wrap gap-5">
                    <div className="lg:w-[50%] w-full">
                        <Image src="/images/faq/faq-training.jpg" alt="Vulpian Consultants delivering internal audit training" width={900} height={968} sizes="(max-width: 1024px) 100vw, 50vw" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className="lg:w-[50%] w-full">
                        <div className="space-y-4 w-full">
                            {faqs.map((item, index) => (
                                <div
                                    key={index}
                                    className={`border rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index ? "bg-prim text-white" : "bg-white text-black"}`}
                                >
                                    <button
                                        className="w-full cursor-pointer flex justify-between items-center px-6 py-6 text-left focus:outline-none"
                                        onClick={() => toggle(index)}
                                    >
                                        <span className="font-medium">{item.question}</span>
                                        <Icon icon={openIndex === index ? "akar-icons:minus" : "akar-icons:plus"} className="text-xl" />
                                    </button>
                                    {openIndex === index && (
                                        <div className="px-6 py-4 border-t border-teal-500 bg-teal-600/10 text-white/90">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
