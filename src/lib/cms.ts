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
    const doc = await TeamMemberModel.findOne({ isLead: true }).lean();
    return doc ? serialize<TeamMember>(doc) : null;
}
