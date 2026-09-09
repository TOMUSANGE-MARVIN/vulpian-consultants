"use client"
import Link from 'next/link'
import { HeaderItem } from '@/type/menu'
import { usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'

const HeaderLinks: React.FC<{ item: HeaderItem; scrolled?: boolean }> = ({ item, scrolled }) => {
    const path = usePathname();

    // Long lists (the Services menu) need two columns - a single 240px column
    // of 14 long titles runs off the bottom of the viewport.
    const isWide = (item.submenu?.length ?? 0) > 6;

    return (
        <div className='relative group shrink-0'>
            <Link
                href={item.href}
                className={`text-base font-normal flex items-center whitespace-nowrap transition-colors duration-500 ${scrolled ? "text-prim hover:text-dark" : "text-white hover:text-white"}`}
            >
                {item.label}
                {item.submenu && (
                    <Icon icon="iconamoon:arrow-down-2-duotone" width="22" height="22" className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                )}
            </Link>

            {item.submenu && (
                <div
                    className={`absolute left-0 top-10 rounded-lg mt-1 bg-white shadow-lg overflow-hidden
          opacity-0 scale-95 invisible
          group-hover:opacity-100 group-hover:scale-100 group-hover:visible
          transition-all duration-300 ${isWide ? "w-[600px] max-w-[90vw] p-2" : "w-60"}`}
                >
                    <div className={isWide ? "grid grid-cols-2 gap-x-2" : ""}>
                        {item.submenu.map((subItem, index) => (
                            <Link
                                key={index}
                                href={subItem.href}
                                className={`block px-4 py-2 text-[15px] leading-snug transition ${isWide ? "rounded-md" : ""} ${path === subItem.href
                                    ? "text-white bg-dark"
                                    : "text-midnight_text hover:bg-dark hover:text-white"
                                    }`}
                            >
                                {subItem.label}
                            </Link>
                        ))}
                    </div>

                    {isWide && (
                        <Link
                            href={item.href}
                            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-prim-light px-4 py-2.5 text-[15px] font-semibold text-prim transition hover:bg-dark hover:text-white"
                        >
                            View all services
                            <Icon icon="tabler:arrow-right" width="18" height="18" />
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default HeaderLinks;
