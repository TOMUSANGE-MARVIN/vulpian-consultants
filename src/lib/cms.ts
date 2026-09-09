import "server-only";
import { dbConnect } from "./mongodb";
import SiteContentModel from "@/models/SiteContent";
import ServiceModel from "@/models/Service";
import TeamMemberModel from "@/models/TeamMember";

// Plain-object types returned to client/server components (Mongoose docs aren't serializable).

export type Value = { title: string; icon: string };
export type ApproachStep = { title: string; description: string };

export type SiteContent = {
    companyName: string;
    tagline: string;
    since: string;
    logoUrl: string;
    hero: { title: string; ctaText: string; ctaHref: string; quote: string };
    whoWeAre: { paragraphs: string[] };
    values: Value[];
    vision: string;
    mission: string;
    approach: ApproachStep[];
    contact: {
        address: string;
        phones: string[];
        emails: string[];
        linkedin: string;
        youtube: string;
    };
};

export type Service = {
    _id: string;
    order: number;
    slug: string;
    title: string;
    summary: string;
    icon: string;
    items: string[];
};

export type TeamMember = {
    _id: string;
    order: number;
    name: string;
    role: string;
    isLead: boolean;
    bio: string[];
    credentials: string[];
    photoUrl: string;
};

function serialize<T>(doc: unknown): T {
    return JSON.parse(JSON.stringify(doc));
}

/** Used when the database is unreachable, so a blip can't fail a build. */
const FALLBACK_SITE: SiteContent = {
    companyName: "Vulpian Consultants",
    tagline: "Empowering Excellence",
    since: "2019",
    logoUrl: "/images/logo/vulpian-logo-color.png",
    hero: { title: "Empowering Excellence", ctaText: "Get Started", ctaHref: "/contact", quote: "" },
    whoWeAre: { paragraphs: [] },
    values: [],
    vision: "",
    mission: "",
    approach: [],
    contact: { address: "", phones: [], emails: [], linkedin: "", youtube: "" },
};

export async function getSiteContent(): Promise<SiteContent> {
    try {
        await dbConnect();
        let doc = await SiteContentModel.findOne({ key: "site" }).lean();
        if (!doc) {
            doc = await SiteContentModel.create({ key: "site" });
            doc = await SiteContentModel.findOne({ key: "site" }).lean();
        }
        return serialize<SiteContent>(doc);
    } catch (err) {
        console.error("Could not load site content:", err);
        return FALLBACK_SITE;
    }
}

export async function getServices(): Promise<Service[]> {
    try {
        await dbConnect();
        const docs = await ServiceModel.find({}).sort({ order: 1 }).lean();
        return serialize<Service[]>(docs);
    } catch (err) {
        console.error("Could not load services:", err);
        return [];
    }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    try {
        await dbConnect();
        const doc = await ServiceModel.findOne({ slug }).lean();
        return doc ? serialize<Service>(doc) : null;
    } catch (err) {
        console.error("Could not load service:", err);
        return null;
    }
}

export async function getTeam(): Promise<TeamMember[]> {
    try {
        await dbConnect();
        const docs = await TeamMemberModel.find({}).sort({ order: 1 }).lean();
        return serialize<TeamMember[]>(docs);
    } catch (err) {
        console.error("Could not load team:", err);
        return [];
    }
}

export async function getLeadConsultant(): Promise<TeamMember | null> {
    try {
    await dbConnect();
    // Falls back to the first member by order, so someone added from the admin
    // still appears even though the admin has no "is lead" switch.
    const doc =
        (await TeamMemberModel.findOne({ isLead: true }).lean()) ??
        (await TeamMemberModel.findOne({}).sort({ order: 1 }).lean());
        return doc ? serialize<TeamMember>(doc) : null;
    } catch (err) {
        console.error("Could not load the lead consultant:", err);
        return null;
    }
}

/* ---------------------------------------------------------------------------
 * Editable sections. Each returns [] when the database is unreachable so a
 * blip degrades a section rather than breaking the page.
 * ------------------------------------------------------------------------- */

import { getModel } from "@/models/dynamic";

export type FocusArea = { _id: string; category: string; title: string; description: string; image: string; link: string };
export type Reason = { _id: string; icon: string; title: string; description: string };
export type Standard = { _id: string; label: string; sub: string; src: string; link?: string; renderHeight: number };
export type Testimonial = { _id: string; text: string; position: string };
export type Faq = { _id: string; question: string; answer: string };
export type VideoItem = { _id: string; videoUrl: string; title: string };
export type Course = {
    _id: string; title: string; standard?: string; summary: string;
    duration?: string; delivery?: string; fee?: string; image?: string; outline?: string[];
};
export type LinkedInPost = { _id: string; postUrl: string; title: string; image: string };
export type Post = {
    _id: string; title: string; slug: string; category: string; author: string; date: string;
    image: string; description: string; body: string[]; takeaways: string[];
    quoteText?: string; quoteAttribution?: string;
    metaTitle?: string; metaDescription?: string; keywords?: string[];
    createdAt?: string; updatedAt?: string;
};

async function listOf<T>(name: string): Promise<T[]> {
    try {
        await dbConnect();
        const Model = getModel(name);
        if (!Model) return [];
        const docs = await Model.find({}).sort({ order: 1, createdAt: 1 }).lean();
        return serialize<T[]>(docs);
    } catch (err) {
        console.error(`Could not load "${name}" from the CMS:`, err);
        return [];
    }
}

export const getFocusAreas = () => listOf<FocusArea>("focusareas");
export const getReasons = () => listOf<Reason>("reasons");
export const getStandards = () => listOf<Standard>("standards");
export const getTestimonials = () => listOf<Testimonial>("testimonials");
export const getFaqs = () => listOf<Faq>("faqs");
export const getVideos = () => listOf<VideoItem>("videos");
export const getCourses = () => listOf<Course>("courses");
export const getLinkedInPosts = () => listOf<LinkedInPost>("linkedinposts");
export const getPosts = () => listOf<Post>("blogs");

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const posts = await getPosts();
    return posts.find((p) => p.slug === slug) ?? null;
}
