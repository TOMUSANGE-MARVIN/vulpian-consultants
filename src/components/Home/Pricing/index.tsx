import Link from "next/link";
import { Icon } from "@iconify/react";
import { engagementOptions } from "@/lib/staticContent";

const Pricing = () => {
    return (
        <section className=" overflow-hidden py-14 lg:py-18 xl:py-22 bg-prim-light">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-14">
                <div className="text-center">
                    <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                        Engagement Options
                    </span>
                    <h2 className='mt-4 font-chakrapetch lg:text-35 font-semibold mb-5'>
                        Ways to Work With Us
                    </h2>
                    <p className="text-pera-dark max-w-2xl mx-auto">
                        Every engagement is scoped to your organization — these are starting points, not fixed packages. Get in touch for a tailored quote.
                    </p>
                </div>

                {/* Engagement Cards */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-12">
                    {engagementOptions.map((plan) => (
                        <div
                            key={plan.name}
                            className={`pt-8 px-8 pb-8 rounded-2xl shadow hover:shadow-lg transition flex flex-col ${plan.highlighted ? "bg-dark text-white" : "bg-white"}`}
                        >
                            <h3 className={`text-22 font-bold text-start font-chakrapetch ${plan.highlighted ? "text-white" : "text-black"}`}>{plan.name}</h3>
                            <p className={`text-start mt-4 text-sm mb-8 ${plan.highlighted ? "text-white/80" : "text-muted"}`}>
                                {plan.description}
                            </p>
                            <span className="font-semibold text-xl">Includes:</span>
                            <div className="space-y-3 pt-3 flex-1">
                                {plan.features.map((feature) => (
                                    <p key={feature} className={`flex gap-2 ${plan.highlighted ? "text-white" : "text-dark"}`}>
                                        <Icon icon="material-symbols:check-rounded" width="24" height="24" className="shrink-0" />
                                        {feature}
                                    </p>
                                ))}
                            </div>
                            <Link
                                href="/contact"
                                className={`h-[50px] text-sm lg:text-16 w-full rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 justify-center items-center tracking-wider group mt-8 ${plan.highlighted ? "bg-white text-black" : "bg-dark text-white"}`}
                            >
                                Request a Quote
                                <Icon icon="tabler:arrow-right" width="24" height="24" className='bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300' />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
