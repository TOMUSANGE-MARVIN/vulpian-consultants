import React from "react";
import Image from "next/image";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Icon } from "@iconify/react";
import Team from "@/components/Home/Team";
import Process from "@/components/Home/Process";
import Companies from "@/components/Home/Companies";
import Testimonials from "@/components/Home/Testimonials";
import { getLeadConsultant, getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

const Page = async () => {
    const [site, lead] = await Promise.all([getSiteContent(), getLeadConsultant()]);

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/about", text: "About" },
    ];

    return (
        <>
            <HeroSub title="About" description="" breadcrumbLinks={breadcrumbLinks} />

            {/* Who We Are */}
            <div id="who-we-are" className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22 scroll-mt-32">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-8">
                    <div>
                        <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                            Who We Are
                        </span>
                        <h2 className='w-full lg:w-3/4 mt-4 font-chakrapetch lg:text-35 font-semibold'>
                            Since {site.since}
                        </h2>
                    </div>
                    <div className="space-y-5 max-w-4xl">
                        {site.whoWeAre.paragraphs.map((p, i) => (
                            <p key={i} className="text-pera-dark text-16 leading-7">{p}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22 bg-prim-light">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-8">
                    <div>
                        <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                            Our Values
                        </span>
                        <h2 className='w-full lg:w-3/4 mt-4 font-chakrapetch lg:text-35 font-semibold'>
                            What Drives Everything We Do
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
                        {site.values.map((value, i) => (
                            <div
                                key={i}
                                className="about-item w-full bg-white shadow-xl p-5 space-y-4 rounded-xl border group hover:bg-prim transition duration-500 flex flex-col items-center text-center"
                            >
                                <div className="about-icon border border-dark w-[70px] h-[70px] rounded-full flex justify-center items-center prim-grident transition-transform duration-500 group-hover:rotate-y-360">
                                    <Icon
                                        icon={value.icon}
                                        width="36"
                                        height="36"
                                        className="group-hover:text-white transition-colors duration-500"
                                    />
                                </div>
                                <h4 className="group-hover:text-white transition-colors duration-500 font-medium font-unbounded text-18">
                                    {value.title}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vision & Mission */}
            <div className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 flex lg:flex-row flex-col items-start gap-5">
                    <div className="content w-full lg:w-[55%]">
                        <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                            Get to Know Us
                        </span>
                        <h2 className='w-full mt-4 font-chakrapetch lg:text-35 font-semibold mb-8'>
                            Driving Excellence and Sustainable Growth
                        </h2>
                        <div className="flex lg:flex-nowrap flex-wrap gap-4">
                            <div className="bg-prim-light p-5 rounded-xl w-full lg:w-1/2">
                                <h4 className="font-unbounded text-xl pb-3">Our Mission</h4>
                                <p className="text-pera-dark leading-6">
                                    {site.mission}
                                </p>
                            </div>

                            <div className="bg-prim-light p-5 rounded-xl w-full lg:w-1/2">
                                <h4 className="font-unbounded text-xl pb-3">Our Vision</h4>
                                <p className="text-pera-dark leading-6">
                                    {site.vision}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="image lg:w-[45%] w-full rounded-lg overflow-hidden">
                        <Image src="/images/about/lead-consultant-training.jpg" alt="Vulpian Consultants ISO 9001 training session" width={1000} height={667} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <Process approach={site.approach} />

            <Companies />
            <Testimonials />
            <Team member={lead} />
        </>
    );
};

export default Page;
