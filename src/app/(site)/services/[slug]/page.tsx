import React from "react";
import { notFound } from "next/navigation";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { getServiceBySlug, getServices } from "@/lib/cms";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

const ServiceDetails = async ({ params }: Props) => {
    const { slug } = await params;

    const [service, allServices] = await Promise.all([
        getServiceBySlug(slug),
        getServices(),
    ]);

    if (!service) return notFound();

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/services", text: "Service Details" },
    ];

    return (
        <>
            <HeroSub title={service.title} description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-1.jpg" />

            <section className="py-15">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 flex flex-col lg:flex-row gap-5">
                    <div className="lg:w-[60%] w-full">
                        <div className="bg-white rounded-2xl space-y-6 p-8">
                            <div className="service-icon border border-dark w-[70px] h-[70px] rounded-full flex justify-center items-center prim-grident">
                                <Icon icon={service.icon} width="36" height="36" />
                            </div>

                            <h4 className="font-unbounded font-medium uppercase text-3xl">
                                {service.title}
                            </h4>

                            <p className="pb-4 text-pera-dark text-16 leading-6">
                                {service.summary}
                            </p>

                            {service.items.length > 0 && (
                                <>
                                    <h4 className="font-unbounded font-medium text-2xl">
                                        What This Includes
                                    </h4>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {service.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <Icon icon="material-symbols:check-rounded" width="24" height="24" className="bg-prim text-white rounded-full p-0.5 shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="lg:w-[40%] w-full lg:self-start lg:sticky top-20 space-y-5 py-5">
                        <div className="border border-gray-100 shadow-lg p-5 rounded-xl">
                            <h4 className="text-black pb-5">More services</h4>
                            <div className="flex flex-col gap-5">
                                {allServices.map((s) => (
                                    <Link
                                        key={s._id}
                                        href={`/services/${s.slug}`}
                                        className={`flex justify-between items-center shadow-lg p-3 rounded-lg hover:bg-prim hover:text-white transition-colors duration-300 ${s.slug === service.slug ? "bg-prim text-white" : "bg-white"}`}
                                    >
                                        <span>{s.title}</span>
                                        <Icon icon="weui:arrow-outlined" width="12" height="24" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="border-gray-100 shadow-lg bg-white p-5 rounded-xl">
                            <h4 className="text-black pb-3">Need this service?</h4>
                            <p className="text-pera-dark text-15 pb-4">Get in touch and we&apos;ll tailor this engagement to your organization.</p>
                            <Link
                                href="/contact"
                                className='text-white bg-dark h-[50px] text-sm w-full rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group'
                            >
                                Request a Call
                                <Icon icon="tabler:arrow-right" width="24" height="24" className='bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300' />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceDetails;
