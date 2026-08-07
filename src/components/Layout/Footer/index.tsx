import Link from "next/link";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";
import { getServices, getSiteContent } from "@/lib/cms";

const Footer = async () => {
    const [site, services] = await Promise.all([getSiteContent(), getServices()]);
    const { contact } = site;

    return (
        <footer className="pt-10 relative bg-white">
            <div className="container mx-auto px-4 max-w-screen-xl">
                {/* ===== Top Contact Section ===== */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center border-b pb-10 mb-10 gap-6">
                    {/* Contact Info */}
                    <div className="flex flex-wrap md:flex-nowrap gap-6">
                        <div className="flex items-start text-foottext text-[15px]">
                            <Icon icon="weui:location-outlined" className="w-6 h-6 mr-3 mt-1" />
                            <div className="flex flex-col">
                                <span>{contact.address}</span>
                            </div>
                        </div>

                        {contact.phones.map((phone, i) => (
                            <div key={i} className="flex items-center gap-2 text-foottext">
                                <Icon icon="majesticons:phone-retro-line" className="w-6 h-6" />
                                <span className="text-[15px]">{phone}</span>
                            </div>
                        ))}

                        {contact.emails.map((email, i) => (
                            <div key={i} className="flex items-center gap-2 text-foottext">
                                <Icon icon="clarity:email-line" className="w-6 h-6" />
                                <Link href={`mailto:${email}`} className="text-[15px] hover:text-prim">
                                    {email}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Social */}
                    <div className="flex gap-4 items-center text-foottext text-[15px]">
                        <span className="flex items-center gap-2">
                            <Icon icon="ri:linkedin-fill" width="24" height="24" />
                            {contact.linkedin}
                        </span>
                        <span className="flex items-center gap-2">
                            <Icon icon="cbi:youtube-alt" width="26" height="26" />
                            {contact.youtube}
                        </span>
                    </div>
                </div>

                {/* ===== Footer Grid ===== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
                    {/* Left Column - Logo + About */}
                    <div className="lg:col-span-5">
                        <div className="text-black pb-5">
                            <Logo />
                        </div>
                        <p className="text-[14px] leading-6 text-foottext max-w-md">
                            {site.tagline} — a professional consulting firm helping organizations achieve
                            operational excellence through Quality Management Systems, organizational
                            transformation, and business performance improvement. Since {site.since}.
                        </p>
                    </div>

                    {/* Services Column */}
                    <div className="lg:col-span-4">
                        <h4 className="text-[18px] text-black mb-3 font-chakrapetch font-bold">
                            Services
                        </h4>
                        <ul>
                            {services.slice(0, 6).map((service) => (
                                <li key={service._id} className="pb-2">
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="text-foottext text-[15px] hover:text-prim transition-colors"
                                    >
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="lg:col-span-3">
                        <h4 className="text-[18px] text-black mb-3 font-chakrapetch font-bold">
                            Company
                        </h4>
                        <ul>
                            {[
                                { label: "About Us", href: "/about" },
                                { label: "Our Services", href: "/services" },
                                { label: "Lead Consultant", href: "/team" },
                                { label: "Contact Us", href: "/contact" },
                            ].map((item) => (
                                <li key={item.href} className="pb-2">
                                    <Link
                                        href={item.href}
                                        className="text-foottext text-[15px] hover:text-prim transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ===== Bottom Section ===== */}
                <div className="flex flex-col sm:flex-row justify-between items-center border-t mt-10 pt-6 text-center sm:text-left">
                    <p className="text-[15px] text-foottext mb-3 sm:mb-0">
                        © {new Date().getFullYear()} {site.companyName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
