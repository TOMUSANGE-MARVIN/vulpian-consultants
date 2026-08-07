import mongoose, { Schema } from "mongoose";

const ValueSchema = new Schema(
    { title: { type: String, required: true }, icon: { type: String, default: "" } },
    { _id: false }
);

const ApproachStepSchema = new Schema(
    { title: { type: String, required: true }, description: { type: String, default: "" } },
    { _id: false }
);

const SiteContentSchema = new Schema(
    {
        // Identifies the singleton document.
        key: { type: String, default: "site", unique: true },

        companyName: { type: String, default: "Vulpian Consultants" },
        tagline: { type: String, default: "Empowering Excellence" },
        since: { type: String, default: "2019" },
        logoUrl: { type: String, default: "" },

        hero: {
            title: { type: String, default: "" },
            ctaText: { type: String, default: "Get Started" },
            ctaHref: { type: String, default: "/contact" },
            quote: { type: String, default: "" },
        },

        whoWeAre: {
            paragraphs: { type: [String], default: [] },
        },

        values: { type: [ValueSchema], default: [] },

        vision: { type: String, default: "" },
        mission: { type: String, default: "" },

        approach: { type: [ApproachStepSchema], default: [] },

        contact: {
            address: { type: String, default: "" },
            phones: { type: [String], default: [] },
            emails: { type: [String], default: [] },
            linkedin: { type: String, default: "" },
            youtube: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

export default mongoose.models.SiteContent ||
    mongoose.model("SiteContent", SiteContentSchema);
