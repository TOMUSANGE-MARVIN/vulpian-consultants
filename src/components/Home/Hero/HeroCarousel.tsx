"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const slides = [
    "/images/hero/hero-1.jpg",
    "/images/hero/hero-2.jpg",
    "/images/hero/hero-3.jpg",
    "/images/hero/hero-4.jpg",
    "/images/hero/hero-5.jpg",
];

// Must stay in step with the .hero-slide-active animation duration in globals.css.
const SLIDE_MS = 6000;

const HeroCarousel: React.FC = () => {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) return;

        const timer = setInterval(() => {
            setActive((i) => (i + 1) % slides.length);
        }, SLIDE_MS);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="hero-image absolute inset-0 w-full h-full overflow-hidden" aria-hidden>
            {slides.map((src, i) => (
                <div
                    key={src}
                    className={`hero-slide absolute inset-0 ${i === active ? "hero-slide-active" : ""}`}
                >
                    <Image
                        src={src}
                        alt=""
                        fill
                        sizes="100vw"
                        priority={i === 0}
                        className="object-cover"
                    />
                </div>
            ))}
        </div>
    );
};

export default HeroCarousel;
