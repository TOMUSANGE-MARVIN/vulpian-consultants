import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Logo: React.FC<{ variant?: "white" | "color" }> = ({ variant = "color" }) => {
    const src = variant === "white"
        ? "/images/logo/vulpian-logo-white.png"
        : "/images/logo/vulpian-logo-color.png";

    return (
        <Link href="/" className="flex items-center">
            <Image
                src={src}
                alt="Vulpian Consultants"
                width={173}
                height={162}
                className="h-12 md:h-14 w-auto"
                priority
            />
        </Link>
    );
};

export default Logo;
