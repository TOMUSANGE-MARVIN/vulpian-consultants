import React from "react";

export const LAST_UPDATED = "13 August 2026";

export const LegalSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-10">
        <h2 className="font-chakrapetch text-22 lg:text-25 font-semibold text-prim normal-case mb-3">
            {title}
        </h2>
        <div className="space-y-3 text-pera-dark leading-7">{children}</div>
    </section>
);

export const LegalList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
    <ul className="list-disc ps-6 space-y-2">
        {items.map((item, i) => (
            <li key={i}>{item}</li>
        ))}
    </ul>
);

export const LegalPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-light py-14 lg:py-18 xl:py-22">
        <div className="container mx-auto lg:max-w-(--breakpoint-md) px-4">
            <p className="text-14 text-pera-dark/70 mb-8">Last updated: {LAST_UPDATED}</p>
            {children}
        </div>
    </div>
);
