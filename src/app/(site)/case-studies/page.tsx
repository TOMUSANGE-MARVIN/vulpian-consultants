import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import Videos from "@/components/SharedComponents/Videos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
    title: "Case Studies & Videos",
    description: "Insights on quality management, ISO audit preparation, risk-based internal auditing and leadership from the Vulpian Consultants YouTube channel.",
    path: "/case-studies",
    image: "/images/hero/hero-3.jpg",
});

export const revalidate = 300;

const Page = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/case-studies", text: "Case Studies" },
    ];

    return (
        <>
            <HeroSub title="Case Studies" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-3.jpg" />
            <Videos />
        </>
    );
};

export default Page;
