import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import LinkedInPosts from "@/components/SharedComponents/LinkedInPosts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
    title: "Updates",
    description: "The latest updates, insights and announcements from Vulpian Consultants, shared on LinkedIn.",
    path: "/updates",
    image: "/images/hero/hero-2.jpg",
});

export const revalidate = 300;

const Page = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/updates", text: "Updates" },
    ];

    return (
        <>
            <HeroSub title="Updates" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-2.jpg" />
            <LinkedInPosts />
        </>
    );
};

export default Page;
