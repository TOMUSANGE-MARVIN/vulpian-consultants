import { HeaderItem } from "@/type/menu";

export const headerData: HeaderItem[] = [
    { label: "Home", href: "/" },
    {
        label: "Pages",
        href: "#",
        submenu: [
            { label: "About Us", href: "/about" },
            { label: "Lead Consultant", href: "/team" },
            { label: "Faq", href: "/faq" },
            { label: "Contact", href: "/contact" }
        ]
    },
    {
        label: "Services",
        href: "/services",
        submenu: [
            { label: "Services List", href: "/services" },
            { label: "Services Details", href: "/services/quality-management-systems-consulting" }
        ]
    },
    {
        label: "Case Studies",
        href: "/protfolio",
        submenu: [
            { label: "Case Studies", href: "/protfolio" },
            { label: "Case Study Details", href: "/protfolio/qms-implementation-public-sector" }
        ]
    },
    {
        label: "Blog",
        href: "/blog",
        submenu: [
            { label: "Blog", href: "/blog" },
            { label: "Blog Details", href: "/blog/why-iso-9001-matters-beyond-compliance" }
        ]
    },
    { label: "Contact", href: "/contact" },
]
