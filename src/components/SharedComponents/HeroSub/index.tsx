import React, { FC } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbLink } from "@/type/breadcrumb";

interface HeroSubProps {
  title: string;
  description: string;
  breadcrumbLinks: BreadcrumbLink[];
  /** Banner photo. Defaults to one of the hero carousel images. */
  image?: string;
}

const HeroSub: FC<HeroSubProps> = ({ breadcrumbLinks, image = "/images/hero/hero-1.jpg" }) => {
  return (
    <section
      className="bg-cover relative overflow-x-hidden section-banner"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[119px] -left-1/4 top-0"></div>
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 relative z-1">
        <div className="absolute -bottom-35 left-0 flex flex-col h-full text-start items-start">
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </div>
    </section>
  );
};

export default HeroSub;
