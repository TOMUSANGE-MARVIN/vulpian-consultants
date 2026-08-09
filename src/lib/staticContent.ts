// Static, non-CMS content for the secondary template sections (partners strip,
// focus areas, testimonials, engagement options, blog, FAQ, case studies).
// Kept out of MongoDB deliberately — these are template-structure sections,
// not core business content, so they're edited here directly.

// What actually happens at each stage of a Vulpian engagement, shown in the
// "How it works" card alongside "Our Approach". Keyed by the approach step
// title stored in the CMS — add a matching key here if a step is renamed.
export const howItWorksByStage: Record<string, string[]> = {
    Understand: [
        "An initial consultation to learn your objectives and constraints",
        "Review of your existing processes, documentation, and systems",
        "Stakeholder interviews across the relevant departments",
        "Gap analysis against the applicable standard",
        "A written findings report with prioritised recommendations",
    ],
    Deliver: [
        "A tailored scope of work, timeline, and set of deliverables",
        "Design of the management system framework and documentation",
        "Development of policies, procedures, and process maps",
        "Hands-on support as new controls are rolled out",
        "Review checkpoints to confirm the work fits how you operate",
    ],
    Build: [
        "Training tailored to each role and level in the organisation",
        "Internal auditor development and certification support",
        "Coaching for process owners and management representatives",
        "Practical tools, templates, and checklists your team keeps",
        "Knowledge transfer so the system runs without us",
    ],
    Improve: [
        "Internal audits against the standard and your own criteria",
        "Management review facilitation and follow-up",
        "Root cause analysis of nonconformities and recurring issues",
        "Corrective and preventive action tracking",
        "Readiness checks ahead of external certification audits",
    ],
    Impact: [
        "Agreement on the measures that matter to your organisation",
        "Baseline data captured before the changes take effect",
        "Monitoring of process performance and customer feedback",
        "Reporting that shows what changed and what it delivered",
        "Recommendations for the next cycle of improvement",
    ],
};

// Shown when a CMS approach step has no matching entry above.
export const howItWorksFallback = [
    "You reach out through our contact form, by phone, or by email",
    "We hold an initial consultation to understand your needs and context",
    "We assess your current systems and identify the gaps that matter",
    "We propose a tailored scope of work, timeline, and deliverables",
    "We deliver, and support your team through implementation",
];

export type Video = { id: string; title: string };

// Vulpian Consultants' YouTube channel. Titles fetched from YouTube's oEmbed
// endpoint, so they match the published videos exactly.
export const videos: Video[] = [
    { id: "ml9z3lvt9os", title: "Beyond Compliance: Building a Quality Culture That Empowers Frontline Employee Decision Making" },
    { id: "OcYkd5g3dos", title: "ISO Audit Preparation — 7 Common Audit Failures and How Enterprise Teams Can Prevent Them" },
    { id: "xrmqXqq9fvM", title: "Foundations of an ISO 9001 System" },
    { id: "wso5YSdjCKk", title: "How to Conduct a Risk-Based Internal Audit Using Predictive Decision Trees" },
    { id: "aV2nxj-_4lg", title: "5 Leadership Traits Every Quality Manager Needs" },
    { id: "zpNQPm22oWE", title: "The Job Before the Job — A Powerful Message for Every Job Seeker" },
];

export const focusAreas = [
    {
        category: "Quality",
        title: "Quality Management Systems (QMS)",
        description: "Design, implementation, and continual improvement of QMS aligned with ISO 9001 — from readiness assessments to internal audits and documentation.",
        image: "/images/projects/focus-quality.jpg",
        link: "/services/quality-management-systems-consulting",
    },
    {
        category: "People",
        title: "Corporate Training & Capacity Building",
        description: "Customized training programmes in leadership, customer excellence, risk-based thinking, and change management for teams across the public and private sector.",
        image: "/images/projects/focus-training.jpg",
        link: "/services/corporate-training-and-capacity-building",
    },
    {
        category: "Process",
        title: "Business Process Improvement",
        description: "Reviewing, redesigning, and optimizing operations to lift efficiency, productivity, and service delivery across the business lifecycle.",
        image: "/images/projects/focus-process.jpg",
        link: "/services/business-process-improvement",
    },
    {
        category: "Governance",
        title: "Risk Management Consulting",
        description: "Embedding risk-based thinking into everyday operations to support compliance, resilience, and sound decision-making.",
        image: "/images/projects/focus-risk-v3.jpg",
        link: "/services/risk-management-consulting",
    },
];

// Anonymized, illustrative feedback — not attributed to named individuals or photos,
// since no client testimonials have been collected yet. Replace with real quotes
// (and re-add photos) once available.
export const testimonials = [
    {
        id: 1,
        text: "The QMS implementation support was practical from day one — our team could apply what we learned immediately instead of sitting on a shelf as documentation nobody reads.",
        position: "Quality Assurance Lead, Public Sector Agency",
    },
    {
        id: 2,
        text: "What stood out was how the training was tailored to our actual processes rather than a generic ISO 9001 script. The internal audit findings from the mock audit alone were worth the engagement.",
        position: "Operations Manager, Financial Services",
    },
    {
        id: 3,
        text: "Risk-based thinking sounds abstract until someone shows you how to embed it into your existing SOPs. That's exactly what this engagement delivered.",
        position: "Compliance Officer, NGO",
    },
];

export const engagementOptions = [
    {
        name: "Assessment & Diagnostic",
        description: "A focused starting point for organizations that need clarity before committing to a full programme.",
        features: [
            "ISO 9001 readiness assessment",
            "Gap analysis against current processes",
            "Findings report with prioritized recommendations",
            "One follow-up consultation session",
        ],
        highlighted: false,
    },
    {
        name: "Implementation Partner",
        description: "End-to-end support to design, document, and embed a management system that actually gets used.",
        features: [
            "Everything in Assessment & Diagnostic",
            "QMS design and documentation (manuals, SOPs, SLAs)",
            "Internal audit and management review facilitation",
            "Staff training on the new system",
            "Certification-readiness support",
        ],
        highlighted: true,
    },
    {
        name: "Ongoing Retainer",
        description: "Continued advisory support once your system is live, so improvement doesn't stop at certification.",
        features: [
            "Everything in Implementation Partner",
            "Scheduled internal audits and reviews",
            "Priority access to the lead consultant",
            "Quarterly performance and risk reviews",
        ],
        highlighted: false,
    },
];

export type BlogPost = {
    id: number;
    slug: string;
    title: string;
    category: string;
    author: string;
    date: string;
    image: string;
    description: string;
    body: string[];
    pullQuote: { text: string; attribution: string };
    takeaways: string[];
};

export const blogs: BlogPost[] = [
    {
        id: 1,
        slug: "why-iso-9001-matters-beyond-compliance",
        title: "Why ISO 9001 Matters Beyond Compliance",
        category: "QMS",
        author: "Vulpian Consultants",
        date: "12 Mar",
        image: "/images/blog/blog-iso-9001-v2.jpg",
        description: "ISO 9001 is often treated as a certificate to chase. Organizations that get the most value treat it as an operating system instead.",
        body: [
            "Most organizations approach ISO 9001 the same way: get certified, satisfy a client or regulator requirement, move on. That approach produces a QMS that lives in a binder rather than in daily operations — and it shows up quickly in audit findings and repeat non-conformities.",
            "The organizations that get lasting value treat the standard's seven quality management principles — customer focus, leadership, engagement of people, process approach, improvement, evidence-based decision making, and relationship management — as an operating philosophy, not a checklist.",
            "In practice that means process documentation people actually use, management reviews that change decisions rather than just recording minutes, and internal audits framed as improvement tools rather than compliance exercises.",
        ],
        pullQuote: {
            text: "Quality is never an accident; it is always the result of high intention, sincere effort, and skillful execution.",
            attribution: "William A. Foster",
        },
        takeaways: [
            "Certification is a milestone, not the objective",
            "Documentation should reflect how work actually happens",
            "Management review should drive real decisions",
            "Internal audits are an improvement tool, not a compliance box",
        ],
    },
    {
        id: 2,
        slug: "building-a-culture-of-continual-improvement",
        title: "Building a Culture of Continual Improvement",
        category: "Organizational Development",
        author: "Vulpian Consultants",
        date: "28 Apr",
        image: "/images/blog/blog-2.jpg",
        description: "Continual improvement fails when it's treated as a project with an end date. Here's what makes it stick instead.",
        body: [
            "Continual improvement initiatives commonly launch with energy — a kickoff workshop, a new dashboard, a change management plan — and quietly fade within a year. The pattern is familiar: improvement gets treated as a project rather than a habit.",
            "What separates organizations where continual improvement sticks is that it gets built into existing rhythms: management reviews that end with assigned actions, internal audits that feed a visible improvement register, and front-line staff who have a simple channel to flag inefficiencies without going through five layers of approval.",
            "None of this requires new software or a large budget. It requires clear ownership, a short feedback loop, and leadership that visibly acts on what improvement processes surface.",
        ],
        pullQuote: {
            text: "There is no improvement without change; there is no change without learning.",
            attribution: "W. Edwards Deming (paraphrased)",
        },
        takeaways: [
            "Improvement needs an owner, not just a policy",
            "Short feedback loops beat annual review cycles",
            "Front-line staff need a simple way to raise issues",
            "Leadership follow-through is what makes it credible",
        ],
    },
    {
        id: 3,
        slug: "risk-based-thinking-in-practice",
        title: "Risk-Based Thinking in Practice",
        category: "Risk Management",
        author: "Vulpian Consultants",
        date: "9 Jun",
        image: "/images/blog/blog-risk-v2.jpg",
        description: "Risk-based thinking is one of the most misunderstood requirements in ISO 9001. It doesn't require a separate risk department — it requires a habit.",
        body: [
            "When organizations hear 'risk-based thinking' they often assume it means standing up a formal enterprise risk management function, complete with a risk register spreadsheet nobody updates after the first quarter.",
            "In an ISO 9001 context, risk-based thinking is simpler and more embedded: it means routinely asking what could prevent a process from achieving its intended result, before it happens rather than after an audit finding forces the conversation.",
            "That habit fits naturally into process design, supplier selection, and management review — it doesn't need a parallel system. Organizations that embed it this way tend to catch problems earlier and spend less time firefighting.",
        ],
        pullQuote: {
            text: "The biggest risk is not taking any risk. In a world that's changing quickly, the only strategy guaranteed to fail is not taking risks.",
            attribution: "Mark Zuckerberg",
        },
        takeaways: [
            "Risk-based thinking is a habit, not a department",
            "Ask 'what could go wrong' during process design, not after",
            "It should be embedded in existing processes, not run in parallel",
            "Early identification beats after-the-fact firefighting",
        ],
    },
];

export const faqs = [
    {
        question: "What industries do you work with?",
        answer: "We work across both public and private sector organizations — including government agencies, financial services, NGOs, and healthcare — wherever there's a need for stronger management systems, compliance, or operational performance.",
    },
    {
        question: "Do we need to be pursuing ISO 9001 certification to work with you?",
        answer: "No. While QMS design and ISO 9001 readiness is our core expertise, many clients engage us for business process improvement, risk management, training, or advisory services independent of a certification goal.",
    },
    {
        question: "How long does a typical QMS implementation take?",
        answer: "It depends on organizational size and current maturity, but most implementation engagements run 3–6 months from initial assessment through to certification readiness, followed by ongoing support if needed.",
    },
    {
        question: "Can you deliver training on-site or only remotely?",
        answer: "Both. Our corporate training and capacity building programmes are delivered on-site, virtually, or in a blended format depending on what works best for your team.",
    },
    {
        question: "How do we get started?",
        answer: "Reach out through the contact form or give us a call. We'll schedule an initial consultation to understand your needs and recommend whether an assessment, full implementation, or training engagement is the right starting point.",
    },
];
