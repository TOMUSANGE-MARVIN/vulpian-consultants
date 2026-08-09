import React from "react";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { Icon } from "@iconify/react";
import { getServices, getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

const Page = async () => {
    const [site, services] = await Promise.all([getSiteContent(), getServices()]);
    const { contact } = site;

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/contact", text: "Contact" },
    ];

    return (
        <>
            <HeroSub title="Contact" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-5.jpg" />
            <div className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22 bg-prim-light">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-14">
                    <div className="contact-wrapper grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
                        <div className="contact-item w-full bg-white shadow-xl space-y-6 p-5 rounded-xl border group hover:bg-prim transition duration-500 h-[230px] flex flex-col justify-between text-center">
                            <div className="solution-icon border border-dark w-[70px] h-[70px] rounded-full mx-auto flex justify-center items-center prim-grident transition-transform duration-500 group-hover:rotate-y-360">
                                <Icon icon="tdesign:location" width="30" height="30" className="group-hover:text-white transition-colors duration-500" />
                            </div>
                            <div className="contact-info">
                                <h4 className="group-hover:text-white transition-colors duration-500 font-medium font-unbounded text-18 pb-3">
                                    Address
                                </h4>
                                <p className="text-pera-dark font-normal group-hover:text-white transition-colors duration-500">
                                    {contact.address}
                                </p>
                            </div>
                        </div>

                        <div className="contact-item w-full bg-white shadow-xl space-y-6 p-5 rounded-xl border group hover:bg-prim transition duration-500 h-[230px] flex flex-col justify-between text-center">
                            <div className="solution-icon border border-dark w-[70px] h-[70px] rounded-full mx-auto flex justify-center items-center prim-grident transition-transform duration-500 group-hover:rotate-y-360">
                                <Icon icon="ic:outline-email" width="30" height="30" className="group-hover:text-white transition-colors duration-500" />
                            </div>
                            <div className="contact-info">
                                <h4 className="group-hover:text-white transition-colors duration-500 font-medium font-unbounded text-18 pb-3">
                                    Email Us
                                </h4>
                                <p className="text-pera-dark font-normal group-hover:text-white transition-colors duration-500">
                                    {contact.emails.map((e, i) => (<React.Fragment key={i}>{e}<br /></React.Fragment>))}
                                </p>
                            </div>
                        </div>

                        <div className="contact-item w-full bg-white shadow-xl space-y-6 p-5 rounded-xl border group hover:bg-prim transition duration-500 h-[230px] flex flex-col justify-between text-center">
                            <div className="solution-icon border border-dark w-[70px] h-[70px] rounded-full mx-auto flex justify-center items-center prim-grident transition-transform duration-500 group-hover:rotate-y-360">
                                <Icon icon="mi:call" width="30" height="30" className="group-hover:text-white transition-colors duration-500" />
                            </div>
                            <div className="contact-info">
                                <h4 className="group-hover:text-white transition-colors duration-500 font-medium font-unbounded text-18 pb-3">
                                    Call Us
                                </h4>
                                <p className="text-pera-dark font-normal group-hover:text-white transition-colors duration-500">
                                    {contact.phones.map((p, i) => (<React.Fragment key={i}>{p}<br /></React.Fragment>))}
                                </p>
                            </div>
                        </div>

                        <div className="contact-item w-full bg-white shadow-xl space-y-6 p-5 rounded-xl border group hover:bg-prim transition duration-500 h-[230px] flex flex-col justify-between text-center">
                            <div className="solution-icon border border-dark w-[70px] h-[70px] rounded-full mx-auto flex justify-center items-center prim-grident transition-transform duration-500 group-hover:rotate-y-360">
                                <Icon icon="ri:linkedin-fill" width="30" height="30" className="group-hover:text-white transition-colors duration-500" />
                            </div>
                            <div className="contact-info">
                                <h4 className="group-hover:text-white transition-colors duration-500 font-medium font-unbounded text-18 pb-3">
                                    Follow Us
                                </h4>
                                <p className="text-pera-dark font-normal group-hover:text-white transition-colors duration-500">
                                    LinkedIn: {contact.linkedin} <br />
                                    YouTube: {contact.youtube}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22">
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-14">
                    <div className="w-full flex flex-col lg:flex-row gap-5">
                        <div className="w-full lg:w-[50%] bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-unbounded">
                                Feel Free to Get in Touch
                            </h2>

                            <form className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-600 font-medium mb-2">Full Name *</label>
                                    <input type="text" placeholder="Enter your name" className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2" required />
                                </div>

                                <div>
                                    <label className="block text-gray-600 font-medium mb-2">Email Address *</label>
                                    <input type="email" placeholder="Enter your email" className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2" required />
                                </div>

                                <div>
                                    <label className="block text-gray-600 font-medium mb-2">Phone number *</label>
                                    <input type="tel" placeholder="Enter your phone" className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2" required />
                                </div>

                                <div>
                                    <label className="block text-gray-600 font-medium mb-2">Service of Interest</label>
                                    <select className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2 bg-transparent" required>
                                        <option value="">Choose a service</option>
                                        {services.map((s) => (
                                            <option key={s._id} value={s.slug}>{s.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-600 font-medium mb-2">Type message *</label>
                                    <textarea rows={4} placeholder="Write your message..." className="w-full border-b border-gray-300 focus:border-teal-500 focus:outline-none py-2 resize-none" required></textarea>
                                </div>
                                <button type="submit"
                                    className='text-white bg-dark h-[50px] text-sm lg:text-16 w-fit rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group mt-5 lg:mt-0 cursor-pointer'
                                >
                                    Send a Message
                                    <Icon icon="tabler:arrow-right" width="24" height="24" className='bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300' />
                                </button>
                            </form>
                        </div>
                        <div className="w-full lg:w-[50%] h-[350px] lg:h-[500px] rounded-2xl overflow-hidden">
                            <iframe src="https://www.google.com/maps?q=Kampala,Uganda&output=embed" width="100%" height="100%" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
