import type { Metadata } from "next";
import { Chakra_Petch, Poppins, Unbounded, Mona_Sans } from "next/font/google";

import "./globals.css";
import Footer from "@/components/Layout/Footer";
import ConditionalChrome from "@/components/Layout/ConditionalChrome";
import { getServices, getSiteContent } from "@/lib/cms";
import { linkedinProfileUrl } from "@/lib/links";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION, organizationSchema, websiteSchema, JsonLd } from "@/lib/seo";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakrapetch",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const mona = Mona_Sans({
  variable: "--font-mona",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Every page supplies its own title; this appends the brand automatically.
    default: `${SITE_NAME} - ISO 9001 & Quality Management Consulting in Uganda`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "ISO 9001 consulting Uganda",
    "quality management systems",
    "QMS consulting",
    "internal audit training",
    "ISO 31000 risk management",
    "business process improvement",
    "corporate training Uganda",
    "management systems certification",
  ],
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: `${SITE_NAME} - ISO 9001 & Quality Management Consulting`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/images/hero/hero-1.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ISO 9001 & Quality Management Consulting`,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/hero/hero-1.jpg"],
  },
  // Search-engine ownership verification. Set the code from Search Console /
  // Bing Webmaster Tools as an environment variable and redeploy; leaving it
  // unset simply omits the tag.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The nav's Services submenu comes from the CMS, but the whole site -
  // including /admin/login - must not 500 when the database is unreachable.
  let serviceLinks: { label: string; href: string }[] = [];
  let orgJson: unknown = null;
  let contact: { address: string; phones: string[]; emails: string[] } | null = null;
  try {
    const [services, site] = await Promise.all([getServices(), getSiteContent()]);
    contact = {
      address: site.contact?.address ?? "",
      phones: site.contact?.phones ?? [],
      emails: site.contact?.emails ?? [],
    };
    orgJson = organizationSchema({
      description: DEFAULT_DESCRIPTION,
      logo: site.logoUrl || "/images/logo/vulpian-logo-color.png",
      phones: site.contact?.phones ?? [],
      emails: site.contact?.emails ?? [],
      address: site.contact?.address ?? "Kampala, Uganda",
      sameAs: [
        linkedinProfileUrl(site.contact?.linkedin || ""),
        "https://www.youtube.com/@Vulpian-Consultants",
      ],
    });
    serviceLinks = services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    }));
  } catch (err) {
    console.error("Could not load services for the nav menu:", err);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${chakraPetch.variable} ${mona.variable} ${poppins.variable} ${unbounded.variable}`}
      >
        {orgJson ? <JsonLd data={orgJson} /> : null}
        <JsonLd data={websiteSchema()} />
        <ConditionalChrome footer={<Footer />} serviceLinks={serviceLinks} contact={contact}>
          {children}
        </ConditionalChrome>
      </body>
    </html>
  );
}
