import React from "react";
import Link from "next/link";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { LegalPage, LegalSection, LegalList } from "@/components/SharedComponents/Legal";
import { getSiteContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
    title: "Privacy Policy",
    description:
        "How Vulpian Consultants collects, uses and protects personal information submitted through this website.",
    path: "/privacy-policy",
});

export const revalidate = 300;

const Page = async () => {
    const site = await getSiteContent();
    const email = site.contact?.emails?.[0] || "info@vulpianco.com";
    const address = site.contact?.address || "Kampala, Uganda";
    const company = site.companyName || "Vulpian Consultants";

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/privacy-policy", text: "Privacy Policy" },
    ];

    return (
        <>
            <HeroSub title="Privacy Policy" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-4.jpg" />

            <LegalPage>
                <LegalSection title="Who we are">
                    <p>
                        {company} is a consulting firm based in {address}, providing quality
                        management, risk management, training and advisory services. This
                        policy explains what personal information we collect through this
                        website, why we collect it, and what we do with it.
                    </p>
                    <p>
                        It applies to this website only. It does not cover information you
                        give us during a consulting engagement, which is governed by the
                        agreement we sign with you.
                    </p>
                </LegalSection>

                <LegalSection title="Information we collect">
                    <p>We only collect information you choose to give us. Specifically:</p>
                    <LegalList
                        items={[
                            <><strong>Contact form submissions.</strong> Your name, email address, phone number, the service you are interested in, and your message.</>,
                            <><strong>Direct correspondence.</strong> Anything you include when you email or call us using the details published on this site.</>,
                            <><strong>Server logs.</strong> Our hosting provider records standard technical information such as IP address, browser type and the pages requested. This is used for security and to keep the site running.</>,
                        ]}
                    />
                    <p>
                        We do not run advertising trackers, and we do not use analytics
                        software on this website. We do not buy or otherwise obtain personal
                        information about you from third parties.
                    </p>
                </LegalSection>

                <LegalSection title="How we use it">
                    <LegalList
                        items={[
                            "To reply to your enquiry and discuss how we might work together.",
                            "To provide the services you ask us for.",
                            "To keep records of business correspondence.",
                            "To keep the website secure and functioning.",
                        ]}
                    />
                    <p>
                        We will not send you marketing messages unless you have asked us to,
                        and we will never sell your information to anyone.
                    </p>
                </LegalSection>

                <LegalSection title="Third parties we rely on">
                    <p>
                        A small number of services process data on our behalf, or receive
                        data directly when you use a particular feature:
                    </p>
                    <LegalList
                        items={[
                            <><strong>Formspree</strong> delivers our contact form submissions to us by email. What you type into the contact form passes through their systems.</>,
                            <><strong>Vercel</strong> hosts this website and keeps standard server logs.</>,
                            <><strong>MongoDB Atlas</strong> stores the website&apos;s own content, such as service descriptions and articles. It does not store visitor information.</>,
                            <><strong>YouTube</strong> supplies the videos embedded on our Case Studies page. We use YouTube&apos;s privacy-enhanced mode, so YouTube does not set tracking cookies unless you actually play a video.</>,
                            <><strong>Google Maps</strong> supplies the map on our contact page. Loading that page loads content from Google, who may record the request.</>,
                        ]}
                    />
                    <p>
                        Each of these providers has its own privacy policy governing what it
                        does with data it receives.
                    </p>
                </LegalSection>

                <LegalSection title="Cookies">
                    <p>
                        This website does not use cookies to track visitors, and there is no
                        advertising or analytics cookie to consent to.
                    </p>
                    <p>
                        We set a single cookie, named <code className="bg-prim-light px-1.5 py-0.5 rounded text-14">vulpian_admin</code>,
                        only when a member of our team signs in to manage the site&apos;s content.
                        It exists purely to keep that person signed in and is never set for
                        ordinary visitors.
                    </p>
                    <p>
                        The embedded YouTube and Google Maps content described above may set
                        their own cookies in your browser when those parts of the site load.
                    </p>
                </LegalSection>

                <LegalSection title="How long we keep it">
                    <p>
                        We keep enquiries for as long as needed to respond and to maintain a
                        record of our business correspondence, and no longer than is
                        reasonable for that purpose. Server logs are retained by our host on
                        their own schedule. If you would like us to delete your enquiry, ask
                        and we will.
                    </p>
                </LegalSection>

                <LegalSection title="Your rights">
                    <p>
                        Under Uganda&apos;s Data Protection and Privacy Act, 2019 - and under the
                        GDPR if you are contacting us from the European Economic Area - you
                        have the right to:
                    </p>
                    <LegalList
                        items={[
                            "Ask what personal information we hold about you.",
                            "Ask us to correct anything that is wrong.",
                            "Ask us to delete information we no longer need.",
                            "Object to how we are using your information.",
                            "Withdraw consent you previously gave.",
                        ]}
                    />
                    <p>
                        To exercise any of these, email us at{" "}
                        <a href={`mailto:${email}`} className="text-dark font-medium underline underline-offset-2">{email}</a>.
                        We will respond as promptly as we can.
                    </p>
                </LegalSection>

                <LegalSection title="Security">
                    <p>
                        This site is served over an encrypted connection, and access to the
                        content management system is restricted to authorised staff with
                        individual credentials. No system is completely secure, so please
                        avoid sending confidential or sensitive information through the
                        contact form - contact us directly and we will agree a suitable way
                        to share it.
                    </p>
                </LegalSection>

                <LegalSection title="Children">
                    <p>
                        This website is aimed at organizations and business contacts. We do
                        not knowingly collect information from children.
                    </p>
                </LegalSection>

                <LegalSection title="Changes to this policy">
                    <p>
                        We may update this policy as our services or the tools we use change.
                        The date at the top of this page shows when it was last revised.
                    </p>
                </LegalSection>

                <LegalSection title="Contact us">
                    <p>
                        Questions about this policy, or about how we handle your information,
                        can be sent to{" "}
                        <a href={`mailto:${email}`} className="text-dark font-medium underline underline-offset-2">{email}</a>{" "}
                        or through our{" "}
                        <Link href="/contact" className="text-dark font-medium underline underline-offset-2">contact page</Link>.
                    </p>
                </LegalSection>
            </LegalPage>
        </>
    );
};

export default Page;
