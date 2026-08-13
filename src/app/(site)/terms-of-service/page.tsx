import React from "react";
import Link from "next/link";
import HeroSub from "@/components/SharedComponents/HeroSub";
import { LegalPage, LegalSection, LegalList } from "@/components/SharedComponents/Legal";
import { getSiteContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
    title: "Terms of Service",
    description:
        "The terms on which Vulpian Consultants makes this website and its content available.",
    path: "/terms-of-service",
});

export const revalidate = 300;

const Page = async () => {
    const site = await getSiteContent();
    const email = site.contact?.emails?.[0] || "info@vulpianco.com";
    const company = site.companyName || "Vulpian Consultants";

    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/terms-of-service", text: "Terms of Service" },
    ];

    return (
        <>
            <HeroSub title="Terms of Service" description="" breadcrumbLinks={breadcrumbLinks} image="/images/hero/hero-2.jpg" />

            <LegalPage>
                <LegalSection title="About these terms">
                    <p>
                        These terms govern your use of the {company} website. By browsing the
                        site you accept them. If you do not agree with them, please stop
                        using the site.
                    </p>
                    <p>
                        These terms cover the website only. Consulting, training and advisory
                        work is governed by the separate written agreement we sign for that
                        engagement. Where the two differ, that agreement takes precedence.
                    </p>
                </LegalSection>

                <LegalSection title="Information on this site is general">
                    <p>
                        The content here - including articles, guidance on ISO 9001 and other
                        standards, service descriptions and videos - is published for general
                        information. It is not professional advice for your particular
                        circumstances, and it is not a substitute for an engagement.
                    </p>
                    <p>
                        Standards, regulations and best practice change. We take care to keep
                        this site accurate but cannot guarantee that everything is current or
                        complete at the moment you read it. Do not act on anything here
                        without taking advice suited to your own situation.
                    </p>
                </LegalSection>

                <LegalSection title="No client relationship">
                    <p>
                        Reading this site, sending an enquiry through the contact form, or
                        exchanging initial emails with us does not by itself create a
                        consulting relationship. That begins only when both sides agree a
                        scope of work in writing.
                    </p>
                </LegalSection>

                <LegalSection title="Enquiries you send us">
                    <p>
                        When you use the contact form, please send only what is needed to
                        start a conversation. Do not send confidential documents, personal
                        data about other people, or anything sensitive - contact us first and
                        we will agree a secure way to share it.
                    </p>
                    <p>
                        You confirm that what you send is accurate and that you are entitled
                        to share it with us. How we handle your enquiry is described in our{" "}
                        <Link href="/privacy-policy" className="text-dark font-medium underline underline-offset-2">Privacy Policy</Link>.
                    </p>
                </LegalSection>

                <LegalSection title="Intellectual property">
                    <p>
                        The content of this site - text, images, layout, our name and logo -
                        belongs to {company} or is used with permission, and is protected by
                        copyright and trade mark law.
                    </p>
                    <p>You may:</p>
                    <LegalList
                        items={[
                            "Read, print and share pages for your own or your organization's internal use.",
                            "Quote short extracts, provided you credit us and link back to the page.",
                        ]}
                    />
                    <p>You may not, without our written permission:</p>
                    <LegalList
                        items={[
                            "Republish our material as your own or as part of a commercial offering.",
                            "Copy substantial parts of the site, or systematically scrape it.",
                            "Use our name or logo in a way that suggests endorsement or partnership.",
                        ]}
                    />
                    <p>
                        Third-party marks shown on this site - including ISO, PECB and PMP -
                        belong to their respective owners. They appear to describe the
                        standards we work with and the qualifications our consultants hold,
                        and do not imply those bodies endorse us.
                    </p>
                </LegalSection>

                <LegalSection title="Links and embedded content">
                    <p>
                        We link to other websites and embed videos and maps from third
                        parties. We do not control those services and are not responsible for
                        their content, availability or practices. A link is not an
                        endorsement.
                    </p>
                </LegalSection>

                <LegalSection title="Availability">
                    <p>
                        We aim to keep the site available but do not guarantee uninterrupted
                        access. We may change, suspend or withdraw any part of it, including
                        this page, without notice.
                    </p>
                </LegalSection>

                <LegalSection title="Limitation of liability">
                    <p>
                        To the fullest extent the law allows, {company} is not liable for any
                        loss arising from your use of, or reliance on, this website or its
                        content - including lost profits, lost business, or costs incurred
                        acting on general information published here.
                    </p>
                    <p>
                        Nothing in these terms limits liability that cannot lawfully be
                        limited, such as liability for death or personal injury caused by
                        negligence, or for fraud.
                    </p>
                </LegalSection>

                <LegalSection title="Governing law">
                    <p>
                        These terms are governed by the laws of the Republic of Uganda, and
                        the courts of Uganda have jurisdiction over any dispute arising from
                        them or from your use of this site.
                    </p>
                </LegalSection>

                <LegalSection title="Changes">
                    <p>
                        We may revise these terms from time to time. The version published
                        here is the one that applies, and the date at the top shows when it
                        last changed.
                    </p>
                </LegalSection>

                <LegalSection title="Contact us">
                    <p>
                        Questions about these terms can be sent to{" "}
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
