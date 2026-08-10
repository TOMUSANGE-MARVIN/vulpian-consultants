import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import Team from "@/components/Home/Team";
import { getLeadConsultant } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
    title: "Lead Consultant",
    description: "Meet the lead consultant behind Vulpian Consultants - a PECB Certified Trainer, ISO 9001 Lead Auditor and Lead Implementer with ISO 31000 and PMP credentials.",
    path: "/team",
    image: "/images/hero/hero-4.jpg",
});

export const dynamic = "force-dynamic";

const Page = async () => {
    const lead = await getLeadConsultant();

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/team", text: "Team" },
    ];

    return (
        <>
            <HeroSub title="Team" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-4.jpg" />
            <Team member={lead} />
        </>
    );
};

export default Page;
