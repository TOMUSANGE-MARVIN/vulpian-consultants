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

export async function getSiteContent(): Promise<SiteContent> {
    await dbConnect();
    let doc = await SiteContentModel.findOne({ key: "site" }).lean();
    if (!doc) {
        doc = await SiteContentModel.create({ key: "site" });
        doc = await SiteContentModel.findOne({ key: "site" }).lean();
    }
    return serialize<SiteContent>(doc);
}

export async function getServices(): Promise<Service[]> {
    await dbConnect();
    const docs = await ServiceModel.find({}).sort({ order: 1 }).lean();
    return serialize<Service[]>(docs);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    await dbConnect();
    const doc = await ServiceModel.findOne({ slug }).lean();
    return doc ? serialize<Service>(doc) : null;
}

export async function getTeam(): Promise<TeamMember[]> {
    await dbConnect();
    const docs = await TeamMemberModel.find({}).sort({ order: 1 }).lean();
    return serialize<TeamMember[]>(docs);
}

export async function getLeadConsultant(): Promise<TeamMember | null> {
    await dbConnect();
    // Falls back to the first member by order, so someone added from the admin
    // still appears even though the admin has no "is lead" switch.
    const doc =
        (await TeamMemberModel.findOne({ isLead: true }).lean()) ??
        (await TeamMemberModel.findOne({}).sort({ order: 1 }).lean());
    return doc ? serialize<TeamMember>(doc) : null;
}

/* ---------------------------------------------------------------------------
 * Editable sections. Each returns [] when the database is unreachable so a
 * blip degrades a section rather than breaking the page.
 * ------------------------------------------------------------------------- */

import { getModel } from "@/models/dynamic";

export type FocusArea = { _id: string; category: string; title: string; description: string; image: string; link: string };
export type Reason = { _id: string; icon: string; title: string; description: string };
export type Standard = { _id: string; label: string; sub: string; src: string; renderHeight: number };
export type Testimonial = { _id: string; text: string; position: string };
export type Faq = { _id: string; question: string; answer: string };
export type VideoItem = { _id: string; videoUrl: string; title: string };
export type Post = {
    _id: string; title: string; slug: string; category: string; author: string; date: string;
    image: string; description: string; body: string[]; takeaways: string[];
    quoteText?: string; quoteAttribution?: string;
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
export const getPosts = () => listOf<Post>("blogs");

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const posts = await getPosts();
    return posts.find((p) => p.slug === slug) ?? null;
}
