import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import CourseLibrary from "./CourseLibrary";
import { getCourses } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
    title: "Courses",
    description:
        "Training courses from Vulpian Consultants, covering ISO 9001 quality management, internal auditing, risk management and leadership. Enrol online.",
    path: "/courses",
    image: "/images/hero/hero-4.jpg",
});

export const revalidate = 300;

const Page = async () => {
    const courses = await getCourses();

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/courses", text: "Courses" },
    ];

    return (
        <>
            <HeroSub title="Courses" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-4.jpg" />
            <CourseLibrary courses={courses} />
        </>
    );
};

export default Page;
