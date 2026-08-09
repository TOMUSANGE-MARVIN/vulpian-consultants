import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import type { Value } from "@/lib/cms";
import Reveal from "@/components/SharedComponents/Reveal";

type ValuesProps = {
    values: Value[];
};

const descriptions: Record<string, string> = {
    Excellence: "Setting a high standard in every engagement and holding ourselves accountable to it.",
    Structure: "Bringing clear, repeatable processes to complex organizational challenges.",
    Accountability: "Owning outcomes and following through on every commitment we make.",
    Growth: "Helping organizations build capability that lasts beyond our engagement.",
    Impact: "Focused on measurable, practical results, not just paperwork compliance.",
};

// Illustration per value. Declared statically rather than probed from disk:
// public/ is served from the CDN and is not bundled into the serverless
// function, so a filesystem check would always miss in production.
// To add one, drop the file in public/images/values/ and add a line here.
const illustrations: Record<string, string> = {
    Excellence: "/images/values/excellence.png",
    Structure: "/images/values/structure.png",
    Accountability: "/images/values/accountability.png",
    Growth: "/images/values/growth.png",
    Impact: "/images/values/impact.png",
};

const findVectorImage = (title: string): string | null => illustrations[title] ?? null;

const Values: React.FC<ValuesProps> = ({ values }) => {
    return (
        <section className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                <div className="text-center mb-12">
                    <span className='sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3'>
                        Our Core Values
                    </span>
                    <h2 className='mt-4 font-chakrapetch lg:text-35 font-semibold'>
                        What Drives Everything We Do
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {values.map((value, i) => {
                        const vectorImage = findVectorImage(value.title);

                        return (
                            <Reveal key={i} direction="up" delay={i * 90} className="w-full">
                            <div className="value-card w-full h-full bg-white p-6 rounded-2xl shadow-[0_2px_12px_rgba(13,30,32,0.06)] flex flex-col items-center text-center gap-4 hover:shadow-[0_8px_24px_rgba(13,30,32,0.10)] hover:-translate-y-1 transition duration-500">
                                <div className="h-[96px] w-full flex items-center justify-center">
                                    {vectorImage ? (
                                        <Image
                                            src={vectorImage}
                                            alt={`${value.title} illustration`}
                                            width={320}
                                            height={320}
                                            className="max-h-[96px] w-auto max-w-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-xl border-2 border-dashed border-prim/30 bg-prim-light flex items-center justify-center">
                                            <Icon icon={value.icon} width="30" height="30" className="text-prim/40" />
                                        </div>
                                    )}
                                </div>
                                <h4 className="font-unbounded font-medium text-16">
                                    {value.title}
                                </h4>
                                <p className="text-pera-dark text-13 leading-6">
                                    {descriptions[value.title] ?? "A principle that shapes how we work with every client."}
                                </p>
                            </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Values;
