import type { Metadata } from "next";

/**
 * Canonical origin for the site. Set NEXT_PUBLIC_SITE_URL in the environment
 * once the real domain is live — canonical URLs, Open Graph images and the
 * sitemap all derive from it.
 */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.vulpianco.com"
).replace(/\/$/, "");

export const SITE_NAME = "Vulpian Consultants";

export const DEFAULT_DESCRIPTION =
    "Vulpian Consultants helps organizations in Uganda and beyond achieve operational excellence through Quality Management Systems (ISO 9001), risk management, business process improvement, and corporate training.";

type PageSeoInput = {
    title: string;
    description?: string;
    path?: string;
    image?: string;
    keywords?: string[];
    type?: "website" | "article";
    publishedTime?: string;
    modifiedTime?: string;
};

/** Builds a complete metadata object: canonical, Open Graph and Twitter card. */
export function pageMetadata({
    title,
    description = DEFAULT_DESCRIPTION,
    path = "/",
    image,
    keywords,
    type = "website",
    publishedTime,
    modifiedTime,
}: PageSeoInput): Metadata {
    const url = `${SITE_URL}${path}`;
    const ogImage = image
        ? image.startsWith("http")
            ? image
            : `${SITE_URL}${image}`
        : `${SITE_URL}/images/hero/hero-1.jpg`;

    return {
        title,
        description,
        keywords: keywords?.length ? keywords : undefined,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            type,
            locale: "en_US",
            images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

/* --------------------------------------------------------- structured data */

type OrgInput = {
    description: string;
    logo: string;
    phones: string[];
    emails: string[];
    address: string;
    sameAs: string[];
};

export const organizationSchema = (o: OrgInput) => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: o.description,
    logo: `${SITE_URL}${o.logo}`,
    image: `${SITE_URL}${o.logo}`,
    telephone: o.phones,
    email: o.emails,
    address: { "@type": "PostalAddress", addressLocality: o.address, addressCountry: "UG" },
    areaServed: "UG",
    sameAs: o.sameAs.filter(Boolean),
});

export const websiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
});

export const articleSchema = (a: {
    title: string;
    description: string;
    image?: string;
    slug: string;
    author: string;
    published?: string;
    modified?: string;
}) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    image: a.image ? `${SITE_URL}${a.image}` : undefined,
    author: { "@type": "Organization", name: a.author || SITE_NAME },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
    datePublished: a.published,
    dateModified: a.modified || a.published,
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
});

export const serviceSchema = (s: { title: string; summary: string; slug: string }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.summary,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "UG",
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
    })),
});

/** Renders a JSON-LD script tag. */
export const JsonLd = ({ data }: { data: unknown }) => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
);
