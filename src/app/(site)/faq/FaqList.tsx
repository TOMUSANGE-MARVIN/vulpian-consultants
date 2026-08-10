"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import type { Faq } from "@/lib/cms";

const FaqList: React.FC<{ faqs: Faq[] }> = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

    return (
        <div className="space-y-4 w-full">
            {faqs.map((item, index) => (
                <div
                    key={item._id}
                    className={`border rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index ? "bg-prim text-white" : "bg-white text-black"}`}
                >
                    <button
                        className="w-full cursor-pointer flex justify-between items-center px-6 py-6 text-left focus:outline-none"
                        onClick={() => toggle(index)}
                        aria-expanded={openIndex === index}
                    >
                        <span className="font-medium">{item.question}</span>
                        <Icon icon={openIndex === index ? "akar-icons:minus" : "akar-icons:plus"} className="text-xl shrink-0 ml-3" />
                    </button>
                    {openIndex === index && (
                        <div className="px-6 py-4 border-t border-white/20 bg-white/5 text-white/90 leading-7">
                            {item.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FaqList;
