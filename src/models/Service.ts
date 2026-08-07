import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema(
    {
        order: { type: Number, default: 0 },
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        summary: { type: String, default: "" },
        icon: { type: String, default: "bxs:business" },
        items: { type: [String], default: [] },
    },
    { timestamps: true }
);

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
