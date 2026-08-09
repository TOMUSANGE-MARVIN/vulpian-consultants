"use client"
import React, { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { buildHeaderData } from './Navigation/menuData';
import HeaderLinks from './Navigation/headerLinks';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Sidebar from './Sidebar';
import MobileHeaderLink from './Navigation/mobileheaderLinks';
import type { SubmenuItem } from '@/type/menu';

const Header: React.FC<{ serviceLinks?: SubmenuItem[] }> = ({ serviceLinks = [] }) => {
    const headerData = buildHeaderData(serviceLinks);
    const [sticky, setSticky] = useState(false);
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);

    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <>
            <header
                className="fixed h-24 px-4 top-5 left-[2.5%] py-1 z-50 w-[95%] flex navbar items-center transition-all duration-500 rounded-3xl bg-white/10 backdrop-blur-sm"
            >
                <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) flex justify-between items-center xl:gap-16 lg:gap-8 py-6">
                    <div className='text-white'>
                        <Logo />
                    </div>
                    <nav className='hidden lg:flex grow items-center justify-center space-x-10 text-base'>
                        {headerData.map((item, index) => (
                            <HeaderLinks key={index} item={item} scrolled={sticky} />
                        ))}
                    </nav>

                    <div className='nav-right gap-4 hidden lg:flex items-center'>
                        <Link
                            href="/contact"
                            className='text-white bg-dark h-[50px] rounded-full font-chakrapetch font-semibold flex gap-2 ps-4 pe-2 py-2 w-auto justify-center items-center tracking-wider group'
                        >
                            Let&apos;s Talk
                            <Icon icon="tabler:arrow-right" width="24" height="24" className='bg-prim text-white rounded-full h-full w-[35px] p-1.5 group-hover:-rotate-45 transition duration-300' />
                        </Link>

                        <button
                            onClick={() => setIsOpenSidebar(true)}
                            className="block p-2 cursor-pointer group"
                            aria-label="Toggle mobile menu"
                        >
                            <span className={`block w-6 h-0.5 transition-colors duration-500 ${sticky ? "bg-prim" : "bg-white"}`}></span>

                            <span
                                className={`block w-4 h-0.5 mt-1.5 transition-all duration-300 ease-in-out group-hover:w-6 ${sticky ? "bg-prim" : "bg-white"}`}
                            ></span>

                            <span className={`block w-6 h-0.5 mt-1.5 transition-colors duration-500 ${sticky ? "bg-prim" : "bg-white"}`}></span>
                        </button>
                    </div>

                    <button
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className="lg:hidden block p-2 cursor-pointer group"
                        aria-label="Toggle mobile menu"
                    >
                        <span className={`block w-6 h-0.5 transition-colors duration-500 ${sticky ? "bg-prim" : "bg-white"}`}></span>

                        <span
                            className={`block w-4 h-0.5 mt-1.5 transition-all duration-300 ease-in-out group-hover:w-6 ${sticky ? "bg-prim" : "bg-white"}`}
                        ></span>

                        <span className={`block w-6 h-0.5 mt-1.5 transition-colors duration-500 ${sticky ? "bg-prim" : "bg-white"}`}></span>
                    </button>
                </div>

            </header>

            <div
                ref={mobileMenuRef}
                className={`lg:hidden fixed top-0 right-0 h-screen w-full sm:w-[50%] lg:w-[40%] shadow-2xl bg-dark-blur backdrop-blur-lg p-10 z-50 transform transition-transform overflow-y-scroll duration-500 ease-in-out ${navbarOpen ? "-translate-x-0" : "translate-x-[110%]"
                    }`}
            >
                <div className="text-white flex justify-between items-center w-full">
                    <Logo variant="white" />
                    <button onClick={() => setNavbarOpen(false)} aria-label="Close mobile menu">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col items-start py-4">
                    {headerData.map((item, index) => (
                        <MobileHeaderLink key={index} item={item} onNavigate={() => setNavbarOpen(false)} />
                    ))}
                </nav>

                {/* Search */}
                <h3 className="font-chakrapetch pb-3">Search Now!</h3>
                <form className="search-box relative flex">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="bg-white ps-3 h-[45px]"
                        required
                    />
                    <button
                        type="submit"
                        className="absolute right-0 h-full border-l border-border cursor-pointer"
                    >
                        <Icon icon="ei:search" width="50" height="30" />
                    </button>
                </form>

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

            <Sidebar
                isOpenSidebar={isOpenSidebar}
                setIsOpenSidebar={setIsOpenSidebar}
            />
        </>
    );
};

export default Header;