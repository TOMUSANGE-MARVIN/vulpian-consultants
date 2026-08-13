import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getServices, getPosts } from "@/lib/cms";

// Cached rather than rebuilt per request: crawlers should never be waiting on
// a database round-trip, and an admin save clears this explicitly (see
// revalidateSite), so new services and posts still appear immediately.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${SITE_URL}/team`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE_URL}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
        { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${SITE_URL}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    // Service and post pages come from the CMS, so new content is discoverable
    // without anyone remembering to update a list.
    const [services, posts] = await Promise.all([getServices(), getPosts()]);

    return [
        ...staticPages,
        ...services.map((s) => ({
            url: `${SITE_URL}/services/${s.slug}`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        ...posts.map((p) => ({
            url: `${SITE_URL}/blog/${p.slug}`,
            lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ];
}
