import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { getPosts } from "@/lib/cms";
import BlogBrowser from "./BlogBrowser";

export const dynamic = "force-dynamic";

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
