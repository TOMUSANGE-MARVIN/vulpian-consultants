import type { Metadata } from "next";
import { Chakra_Petch, Poppins, Unbounded, Mona_Sans } from "next/font/google";

import "./globals.css";
import Footer from "@/components/Layout/Footer";
import ConditionalChrome from "@/components/Layout/ConditionalChrome";
import { getServices } from "@/lib/cms";

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
  title: "Vulpian Consultants - Empowering Excellence",
  description:
    "Vulpian Consultants is a professional consulting firm helping organizations achieve operational excellence through Quality Management Systems (QMS), organizational transformation, and business performance improvement.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The nav's Services submenu comes from the CMS, but the whole site -
  // including /admin/login - must not 500 when the database is unreachable.
  let serviceLinks: { label: string; href: string }[] = [];
  try {
    const services = await getServices();
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
        <ConditionalChrome footer={<Footer />} serviceLinks={serviceLinks}>
          {children}
        </ConditionalChrome>
      </body>
    </html>
  );
}
