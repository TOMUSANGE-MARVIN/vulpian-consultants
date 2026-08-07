import React from "react";
import Logo from "../Logo";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface SidebarProps {
    isOpenSidebar: boolean;
    setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpenSidebar, setIsOpenSidebar }) => {
    return (
        <div
            className={`hidden lg:block fixed top-0 right-0 h-screen lg:w-[35%] xxl:w-[40%] shadow-2xl bg-dark-blur backdrop-blur-lg p-10 rounded-tl-3xl rounded-bl-3xl z-50 transform transition-transform duration-500 ease-in-out overflow-y-scroll
      ${isOpenSidebar ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Header */}
            <div className="text-white flex justify-between items-center w-full">
                <Logo variant="white" />
                <div
                    className="close-btn group bg-white rounded-sm text-prim p-2 cursor-pointer"
                    onClick={() => setIsOpenSidebar(false)}
                >
                    <Icon
                        icon="material-symbols:close"
                        width="30"
                        height="30"
                        className="group-hover:rotate-90 transition duration-500"
                    />
                </div>
            </div>

            {/* Content */}
            <p className="text-pera-light py-8">
                We help organizations achieve operational excellence through effective
                Quality Management Systems, organizational transformation, and business
                performance improvement.
            </p>

            {/* Contact Info */}
            <h3 className="font-chakrapetch pb-3 pt-8">Contact Info</h3>
            <div className="space-y-3">
                <div>
                    <span className="text-pera-light font-chakrapetch">Phone</span> <br />
                    <Link
                        href="/contact"
                        className="text-white font-unbounded font-normal"
                    >
                        +256 772142260
                    </Link>
                </div>
                <div>
                    <span className="text-pera-light font-chakrapetch">Email</span> <br />
                    <Link
                        href="/contact"
                        className="text-white font-unbounded font-normal"
                    >
                        nyimba89@gmail.com
                    </Link>
                </div>
                <div>
                    <span className="text-pera-light font-chakrapetch">Location</span>{" "}
                    <br />
                    <Link
                        href="/contact"
                        className="text-white font-unbounded font-normal"
                    >
                        Kampala, Uganda
                    </Link>
                </div>
            </div>

            {/* Socials */}
            <h3 className="font-chakrapetch pb-3 pt-8">Follow Us</h3>
            <div className="social-icons flex gap-3">
                <span className="text-white p-1 rounded-sm flex items-center gap-2 text-sm">
                    <Icon
                        icon="ri:linkedin-fill"
                        width="30"
                        height="30"
                        className="text-white p-1 rounded-sm bg-blue-500"
                    />
                    Vulpian Consultants
                </span>
                <span className="text-white p-1 rounded-sm flex items-center gap-2 text-sm">
                    <Icon
                        icon="mdi:youtube"
                        width="30"
                        height="30"
                        className="text-white p-1 rounded-sm bg-red-500"
                    />
                    Vulpian-Consultants
                </span>
            </div>
        </div>
    );
};

export default Sidebar;
