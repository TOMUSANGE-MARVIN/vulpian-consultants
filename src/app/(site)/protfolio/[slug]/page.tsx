import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Icon } from "@iconify/react";
import { caseStudyAreas } from "@/lib/staticContent";
import Link from "next/link";

type Props = {
    params: Promise<{ slug: string }>;
};

const ProtfolioDetails = async ({ params }: Props) => {
    const { slug } = await params;

    const item = caseStudyAreas.find((p) => p.slug === slug);
    if (!item) return notFound();

    const projectInfo = [
        { label: "Sector", value: item.sector, icon: "mdi:domain" },
        { label: "Engagement Type", value: item.engagementType, icon: "mdi:handshake-outline" },
        { label: "Methodology", value: item.methodology, icon: "mdi:certificate-outline" },
    ];

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/protfolio", text: "Case Study" },
    ];

    return (
        <>
            <HeroSub title={item.title} description="" breadcrumbLinks={breadcrumbLinks} />

            <section className="py-15">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 flex flex-col lg:flex-row gap-5">
                    {/* Left Section */}
                    <div className="lg:w-[60%] w-full">
                        <div className="bg-white p-5 rounded-2xl space-y-6">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={800}
                                height={400}
                                className="w-full h-[400px] object-cover rounded-2xl"
                            />

                            <h4 className="font-unbounded font-medium uppercase text-3xl">
                                {item.title}
                            </h4>

                            <p className="pb-4 text-pera-dark text-16 leading-6">
                                This is a representative engagement type in the {item.sector.toLowerCase()} sector, delivered
                                using {item.methodology}. It illustrates the kind of {item.engagementType.toLowerCase()} work
                                we typically undertake — client-identifying details are withheld or generalized to protect confidentiality.
                            </p>

                            <h4 className="font-unbounded font-medium text-3xl">
                                Approach
                            </h4>
                            <p className="pb-4 text-pera-dark text-16 leading-6">
                                Engagements of this type generally begin with a diagnostic assessment against the relevant
                                standard, followed by tailored implementation support, staff training, and a structured
                                review to confirm the organization is ready to sustain the system independently.
                            </p>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:w-[40%] w-full lg:self-start lg:sticky top-20 space-y-5 py-5">
                        <div className="bg-white shadow-lg p-6 rounded-lg">
                            <h4 className="text-black pb-5 font-semibold">Engagement Info</h4>
                            <div className="space-y-6">
                                {projectInfo.map((info) => (
                                    <div key={info.label} className="flex items-start gap-3">
                                        <div className="bg-dark text-white w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">
                                            <Icon icon={info.icon} width="22" height="22" />
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-600">{info.label}</p>
                                            <p className="text-base font-semibold text-gray-900">{info.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-gray-100 shadow-lg bg-white p-5 rounded-xl">
                            <h4 className="text-black pb-5 font-semibold">Interested in a similar engagement?</h4>
                            <Link
                                href="/contact"
                                className='text-white bg-dark h-[50px] text-sm w-full rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group'
                            >
                                Get in Touch
                                <Icon icon="tabler:arrow-right" width="24" height="24" className='bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300' />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProtfolioDetails;
