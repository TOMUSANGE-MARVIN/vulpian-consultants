import { Icon } from "@iconify/react";
import Image from "next/image";
import Reveal from "@/components/SharedComponents/Reveal";
import React from "react";
import type { TeamMember } from "@/lib/cms";

type TeamProps = {
    member: TeamMember | null;
    compact?: boolean;
};

const Team: React.FC<TeamProps> = ({ member, compact }) => {
    if (!member) return null;

    return (
        <section className="bg-light overflow-hidden py-14 lg:py-18 xl:py-22 bg-prim-light">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 space-y-14">
                <div className="team-content gap-2 text-center">
                    <span className="sub-title text-14 bg-prim text-white py-1 rounded-xl relative font-chakrapetch capitalize ps-5 pe-3">
                        Meet Our Lead Consultant
                    </span>
                    <h2 className="w-full lg:w-3/4 mx-auto mt-4 font-chakrapetch lg:text-35 font-semibold">
                        {member.name}
                    </h2>
                    <span className="text-pera-dark text-16">{member.role}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    <Reveal direction="left" className="w-full lg:w-[35%] shrink-0">
                        <div className="bg-white rounded-2xl overflow-hidden aspect-[4/5] flex items-center justify-center">
                            {member.photoUrl ? (
                                <Image
                                    src={member.photoUrl}
                                    alt={member.name}
                                    width={400}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Icon icon="mdi:account-circle" width={160} height={160} className="text-prim/40" />
                            )}
                        </div>
                    </Reveal>

                    <Reveal direction="right" className="w-full lg:w-[65%] space-y-6">
                        {member.bio.slice(0, compact ? 2 : undefined).map((p, i) => (
                            <p key={i} className="text-pera-dark text-16 leading-7">{p}</p>
                        ))}

                        {member.credentials.length > 0 && (
                            <div className="bg-white rounded-xl p-6">
                                <h4 className="font-unbounded text-lg pb-4">Credentials</h4>
                                <ul className="grid sm:grid-cols-2 gap-3">
                                    {member.credentials.map((c, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <Icon icon="material-symbols:check-rounded" width="22" height="22" className="bg-prim text-white rounded-full p-0.5 shrink-0 mt-0.5" />
                                            <span className="text-pera-dark text-15">{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Team;
