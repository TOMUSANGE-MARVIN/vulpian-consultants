import { HeaderItem, SubmenuItem } from "@/type/menu";

// The Services submenu is populated from the CMS at render time, so adding a
// service in the admin makes it appear in the nav automatically.
export const buildHeaderData = (serviceLinks: SubmenuItem[] = []): HeaderItem[] => [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
        label: "Services",
        href: "/services",
        submenu: serviceLinks.length > 0 ? serviceLinks : undefined,
    },
    { label: "Courses", href: "/courses" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Updates", href: "/updates" },
    { label: "FAQ", href: "/faq" },
    { label: "Blogs", href: "/blog" },
    { label: "Contact", href: "/contact" },
];
