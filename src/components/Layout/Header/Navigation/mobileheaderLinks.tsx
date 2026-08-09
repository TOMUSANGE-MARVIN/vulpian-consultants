import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "@/type/menu";
import { Icon } from "@iconify/react";

const MobileHeaderLink: React.FC<{ item: HeaderItem; onNavigate?: () => void }> = ({
    item,
    onNavigate,
}) => {
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const hasSubmenu = Boolean(item.submenu?.length);

    return (
        <div className="relative w-full">
            <div className="flex items-center justify-between w-full py-2 text-white">
                {/* The label is always a real link. Previously it was a plain
                    span, so every item without a submenu did nothing on tap. */}
                <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="flex-1 py-1 hover:text-white/80 transition-colors"
                >
                    {item.label}
                </Link>

                {hasSubmenu && (
                    <button
                        type="button"
                        onClick={() => setSubmenuOpen(!submenuOpen)}
                        aria-label={`${submenuOpen ? "Collapse" : "Expand"} ${item.label} menu`}
                        aria-expanded={submenuOpen}
                        className="p-2 -mr-2 cursor-pointer"
                    >
                        <Icon
                            icon="iconamoon:arrow-down-2-duotone"
                            width="24"
                            height="24"
                            className={`transition-transform duration-300 ${submenuOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                )}
            </div>

            {hasSubmenu && (
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${submenuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    {item.submenu?.map((subItem, index) => (
                        <Link
                            key={index}
                            href={subItem.href}
                            onClick={onNavigate}
                            className="block py-2 text-midnight_text hover:bg-dark hover:text-white bg-white ps-3"
                        >
                            {subItem.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MobileHeaderLink;
