import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import Videos from "@/components/SharedComponents/Videos";

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
