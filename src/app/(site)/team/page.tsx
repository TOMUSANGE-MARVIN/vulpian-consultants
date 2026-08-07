import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import Team from "@/components/Home/Team";
import { getLeadConsultant } from "@/lib/cms";

export const dynamic = "force-dynamic";

const Page = async () => {
    const lead = await getLeadConsultant();

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/team", text: "Team" },
    ];

    return (
        <>
            <HeroSub title="Team" description="" breadcrumbLinks={breadcrumbLinks} />
            <Team member={lead} />
        </>
    );
};

export default Page;
