import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getServices } from "@/lib/cms";

export const dynamic = "force-dynamic";

const Page = async () => {
    const services = await getServices();

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/services", text: "Services" },
    ];

    return (
        <>
            <HeroSub title="Services" description="" breadcrumbLinks={breadcrumbLinks} />

            <div className="bg-light py-14 lg:py-18 xl:py-22">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-14">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service._id}
                                className="service-item group hover:bg-prim transition duration-500 bg-white rounded-2xl shadow-2xl flex flex-col gap-4 p-8"
                            >
                                <div className="service-icon border border-dark w-[70px] h-[70px] rounded-full flex justify-center items-center prim-grident transition-transform duration-500 group-hover:rotate-y-360 mb-16">
                                    <Icon
                                        icon={service.icon}
                                        width="40"
                                        height="40"
                                        className="group-hover:text-white transition-colors duration-500"
                                    />
                                </div>
                                <h4 className="font-unbounded font-medium text-18 group-hover:text-white transition-colors duration-500">
                                    {service.title}
                                </h4>
                                <p className="text-pera-dark font-normal group-hover:text-white transition-colors duration-500">
                                    {service.summary}
                                </p>
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="text-dark text-16 lg:text-sm w-fit rounded-full font-chakrapetch font-semibold flex gap-2 justify-center items-center tracking-wider group group-hover:text-white transition-colors duration-500 mt-auto"
                                >
                                    Learn More
                                    <Icon
                                        icon="tabler:arrow-right"
                                        width="24"
                                        height="24"
                                        className="bg-prim text-white group-hover:text-dark group-hover:bg-white rounded-full h-full w-[35px] p-1.5 transition-transform duration-500 group-hover:-rotate-45"
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
