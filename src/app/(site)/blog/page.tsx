import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { getPosts } from "@/lib/cms";
import BlogBrowser from "./BlogBrowser";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
    title: "Blog",
    description: "Practical articles on ISO 9001, quality culture, risk-based thinking and continual improvement from Vulpian Consultants.",
    path: "/blog",
    image: "/images/hero/hero-2.jpg",
});

// Served from cache and rebuilt in the background, so a visitor never waits
// on a database round-trip. Admin edits revalidate this immediately.
export const revalidate = 300;

const Page = async () => {
    const blogs = await getPosts();
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/blog", text: "Blog" },
    ];

    return (
        <>
            <HeroSub title="Blog" description="Explore our latest articles" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-2.jpg" />
            <div className="bg-light py-14 lg:py-18 xl:py-22">
                <BlogBrowser blogs={blogs} />
            </div>
        </>
    );
};

export default Page;
