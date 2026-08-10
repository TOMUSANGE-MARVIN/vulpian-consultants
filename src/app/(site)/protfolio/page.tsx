import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import Videos from "@/components/SharedComponents/Videos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
    title: "Case Studies & Videos",
    description: "Insights on quality management, ISO audit preparation, risk-based internal auditing and leadership from the Vulpian Consultants YouTube channel.",
    path: "/protfolio",
    image: "/images/hero/hero-3.jpg",
});

const Page = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/protfolio", text: "Case Studies" },
    ];

    return (
        <>
            <HeroSub title="Case Studies" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-3.jpg" />
            <Videos />
        </>
    );
};

export default Page;
