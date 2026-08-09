"use client";

import React, { useEffect, useRef, useState } from "react";

type Direction = "left" | "right" | "up";

type RevealProps = {
    children: React.ReactNode;
    /** Side the element travels in from. */
    direction?: Direction;
    /** Stagger, in ms. */
    delay?: number;
    /** Layout classes belong here, not on an inner wrapper — this element IS
     *  the flex/grid child, so widths must live on it. */
    className?: string;
};

const Reveal: React.FC<RevealProps> = ({
    children,
    direction = "up",
    delay = 0,
    className = "",
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Toggled both ways on purpose: the element resets once it
                // leaves the viewport, so the animation replays on every pass
                // rather than firing only on first load.
                setVisible(entry.isIntersecting);
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            className={`reveal reveal-${direction} ${visible ? "reveal-visible" : ""} ${className}`}
        >
            {children}
        </div>
    );
};

export default Reveal;
