import React from "react";
import Image from "next/image";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { getFaqs } from "@/lib/cms";
import { pageMetadata, faqSchema, JsonLd } from "@/lib/seo";
import FaqList from "./FaqList";

export const metadata = pageMetadata({
    title: "Frequently Asked Questions",
    description: "Answers to common questions about ISO 9001 certification, quality management systems, timelines, and how Vulpian Consultants works with clients.",
    path: "/faq",
    image: "/images/hero/hero-5.jpg",
});

// Served from cache and rebuilt in the background, so a visitor never waits
// on a database round-trip. Admin edits revalidate this immediately.
export const revalidate = 300;

const Page = async () => {
    const faqs = await getFaqs();
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/faq", text: "Faq" },
    ];

    return (
        <>
            <JsonLd data={faqSchema(faqs)} />
            <HeroSub title="Faq" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-5.jpg" />

            <div className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 flex lg:flex-nowrap flex-wrap gap-5">
                    <div className="lg:w-[50%] w-full">
                        <Image
                            src="/images/faq/faq-training.jpg"
                            alt="Vulpian Consultants delivering internal audit training"
                            width={900}
                            height={968}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="lg:w-[50%] w-full">
                        <FaqList faqs={faqs} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
