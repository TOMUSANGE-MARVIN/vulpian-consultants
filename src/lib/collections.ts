// One source of truth for every editable collection.
//
// The admin UI, the API routes and the Mongoose models are all generated from
// this registry, so adding a new editable section means adding one entry here
// rather than writing a model, two API routes and two pages by hand.

export type FieldType =
    | "text"
    | "textarea"
    | "paragraphs"   // string[] rendered as separate <p> blocks
    | "list"         // string[] rendered as bullets/rows
    | "image"
    | "icon"
    | "url"
    | "number";

export type Field = {
    name: string;
    label: string;
    type: FieldType;
    /** Shown under the input in plain language. */
    help?: string;
    required?: boolean;
    /** Auto-filled from this field when left blank (used for slugs). */
    derivedFrom?: string;
    placeholder?: string;
};

export type Collection = {
    /** URL segment, and the Mongo collection name unless overridden. */
    name: string;
    /** Set when the existing Mongo collection differs from the URL segment. */
    mongoCollection?: string;
    label: string;
    /** Singular, used in buttons like "Add service". */
    singular: string;
    icon: string;
    description: string;
    /** Where this content appears, shown to the editor. */
    appearsOn: string;
    /** Field used as the row title in the list view. */
    titleField: string;
    fields: Field[];
};

export const collections: Collection[] = [
    {
        name: "services",
        label: "Services",
        singular: "service",
        icon: "mdi:briefcase-outline",
        description: "The services you offer.",
        appearsOn: "Services page, home page, and the Services menu",
        titleField: "title",
        fields: [
            { name: "title", label: "Service name", type: "text", required: true },
            { name: "slug", label: "Web address", type: "text", derivedFrom: "title", help: "Filled in automatically from the name. Only change it if you know what you're doing." },
            { name: "icon", label: "Icon", type: "icon", help: "Pick an icon that suits this service." },
            { name: "summary", label: "Short description", type: "textarea", required: true, help: "One or two sentences. Shown on cards and in listings." },
            { name: "items", label: "What's included", type: "list", help: "The individual things this service covers." },
        ],
    },
    {
        name: "team",
        mongoCollection: "teammembers",
        label: "Team",
        singular: "team member",
        icon: "mdi:account-tie-outline",
        description: "Consultants shown on the site.",
        appearsOn: "Lead Consultant page and the home page",
        titleField: "name",
        fields: [
            { name: "name", label: "Full name", type: "text", required: true },
            { name: "role", label: "Job title", type: "text", required: true },
            { name: "photoUrl", label: "Photo", type: "image" },
            { name: "bio", label: "Biography", type: "paragraphs", help: "Each block becomes its own paragraph." },
            { name: "credentials", label: "Qualifications", type: "list" },
        ],
    },
    {
        name: "focusareas",
        label: "Focus Areas",
        singular: "focus area",
        icon: "mdi:target",
        description: "The \"Where We Create the Most Impact\" carousel.",
        appearsOn: "Home page",
        titleField: "title",
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "category", label: "Label", type: "text", help: "The small tag above the title, e.g. Quality." },
            { name: "description", label: "Description", type: "textarea", required: true },
            { name: "image", label: "Photo", type: "image" },
            { name: "link", label: "Links to", type: "url", placeholder: "/services/quality-management-systems-consulting" },
        ],
    },
    {
        name: "reasons",
        label: "Why Choose Us",
        singular: "reason",
        icon: "mdi:thumb-up-outline",
        description: "The four reasons beside the photo.",
        appearsOn: "Home page",
        titleField: "title",
        fields: [
            { name: "title", label: "Heading", type: "text", required: true },
            { name: "icon", label: "Icon", type: "icon" },
            { name: "description", label: "Description", type: "textarea", required: true },
        ],
    },
    {
        name: "standards",
        label: "Standards",
        singular: "standard",
        icon: "mdi:certificate-outline",
        description: "The ISO / PECB / PMP badges that scroll across.",
        appearsOn: "Home page and About page",
        titleField: "label",
        fields: [
            { name: "label", label: "Name", type: "text", required: true, placeholder: "ISO 9001:2015" },
            { name: "sub", label: "Caption", type: "text", placeholder: "Quality Management" },
            { name: "src", label: "Logo", type: "image" },
            { name: "link", label: "Official website", type: "url", help: "Optional. The standard's own website, e.g. https://pecb.com. Visitors who click the logo are taken there.", placeholder: "https://pecb.com" },
            { name: "renderHeight", label: "Display height", type: "number", help: "Pixels. Around 40 for wide logos, 58 for round ones." },
        ],
    },
    {
        name: "testimonials",
        label: "Testimonials",
        singular: "testimonial",
        icon: "mdi:format-quote-close",
        description: "Client feedback quotes.",
        appearsOn: "Home page",
        titleField: "position",
        fields: [
            { name: "text", label: "Quote", type: "textarea", required: true },
            { name: "position", label: "Who said it", type: "text", required: true, help: "A role rather than a name, e.g. \"Quality Assurance Lead, Public Sector Agency\"." },
        ],
    },
    {
        name: "faqs",
        label: "FAQs",
        singular: "question",
        icon: "mdi:help-circle-outline",
        description: "Frequently asked questions.",
        appearsOn: "FAQ page",
        titleField: "question",
        fields: [
            { name: "question", label: "Question", type: "text", required: true },
            { name: "answer", label: "Answer", type: "textarea", required: true },
        ],
    },
    {
        name: "videos",
        label: "Videos",
        singular: "video",
        icon: "mdi:youtube",
        description: "YouTube videos from your channel.",
        appearsOn: "Case Studies page",
        titleField: "title",
        fields: [
            { name: "videoUrl", label: "YouTube link", type: "text", required: true, help: "Paste the full link, e.g. https://youtu.be/abc123. The ID is worked out for you.", placeholder: "https://youtu.be/..." },
            { name: "title", label: "Title", type: "text", required: true },
        ],
    },
    {
        name: "linkedinposts",
        label: "LinkedIn Posts",
        singular: "LinkedIn post",
        icon: "mdi:linkedin",
        description: "Posts from your LinkedIn page.",
        appearsOn: "Updates page",
        titleField: "title",
        fields: [
            { name: "postUrl", label: "LinkedIn link", type: "url", required: true, help: "Open the post on LinkedIn, copy the address from your browser, and paste it here.", placeholder: "https://www.linkedin.com/posts/..." },
            { name: "title", label: "Title", type: "text", required: true, help: "A short line describing the post. This is what visitors read on the card." },
            { name: "image", label: "Post image", type: "image", help: "The picture from the post. LinkedIn does not let us fetch this automatically, so save it from the post and upload it here." },
        ],
    },
    {
        name: "courses",
        label: "Courses",
        singular: "course",
        icon: "mdi:school-outline",
        description: "Training courses people can enrol on.",
        appearsOn: "Courses page",
        titleField: "title",
        fields: [
            { name: "title", label: "Course name", type: "text", required: true, placeholder: "ISO 9001:2015 Lead Auditor" },
            { name: "standard", label: "Standard or category", type: "text", help: "Shown as a small tag on the card.", placeholder: "ISO 9001" },
            { name: "summary", label: "Short description", type: "textarea", required: true, help: "One or two sentences about who the course is for and what it covers." },
            { name: "duration", label: "Duration", type: "text", placeholder: "5 days" },
            { name: "delivery", label: "How it is delivered", type: "text", placeholder: "In-person or online" },
            { name: "fee", label: "Fee", type: "text", help: "Optional. Leave blank to show nothing.", placeholder: "On request" },
            { name: "image", label: "Course image", type: "image" },
            { name: "outline", label: "What it covers", type: "list", help: "The main topics. Shown as bullets on the card." },
        ],
    },
    {
        name: "blogs",
        label: "Blog Posts",
        singular: "post",
        icon: "mdi:post-outline",
        description: "Articles and insights.",
        appearsOn: "Blog page and home page",
        titleField: "title",
        fields: [
            { name: "title", label: "Title", type: "text", required: true },
            { name: "slug", label: "Web address", type: "text", derivedFrom: "title", help: "Filled in automatically from the title." },
            { name: "category", label: "Category", type: "text", placeholder: "QMS" },
            { name: "author", label: "Author", type: "text", placeholder: "Vulpian Consultants" },
            { name: "date", label: "Date shown", type: "text", placeholder: "12 Mar" },
            { name: "image", label: "Cover image", type: "image" },
            { name: "description", label: "Summary", type: "textarea", required: true, help: "Shown on cards and previews." },
            { name: "body", label: "Article", type: "paragraphs", help: "Each block becomes a paragraph." },
            { name: "takeaways", label: "Key takeaways", type: "list" },
            { name: "quoteText", label: "Pull quote", type: "textarea", help: "Optional highlighted quote." },
            { name: "quoteAttribution", label: "Quote credit", type: "text" },
            { name: "metaTitle", label: "SEO title", type: "text", help: "What Google shows as the heading. Aim for under 60 characters. Leave blank to use the post title." },
            { name: "metaDescription", label: "SEO description", type: "textarea", help: "The grey text under the title in Google results. Aim for 150-160 characters. Leave blank to use the summary." },
            { name: "keywords", label: "Keywords", type: "list", help: "Words people might search for to find this post." },
        ],
    },
];

export const getCollection = (name: string) =>
    collections.find((c) => c.name === name);

export const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

/** Accepts any YouTube URL form and returns the bare video id. */
export const youtubeId = (input: string): string => {
    const s = (input || "").trim();
    const patterns = [
        /youtu\.be\/([A-Za-z0-9_-]{6,})/,
        /[?&]v=([A-Za-z0-9_-]{6,})/,
        /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/,
        /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/,
    ];
    for (const re of patterns) {
        const m = s.match(re);
        if (m) return m[1];
    }
    return s.replace(/^https?:\/\/\S*/, "");
};
