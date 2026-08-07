import mongoose, { Schema } from "mongoose";

const TeamMemberSchema = new Schema(
    {
        order: { type: Number, default: 0 },
        name: { type: String, required: true },
        role: { type: String, default: "" },
        isLead: { type: Boolean, default: false },
        bio: { type: [String], default: [] },
        credentials: { type: [String], default: [] },
        photoUrl: { type: String, default: "" },
    },
    { timestamps: true }
);

export default mongoose.models.TeamMember ||
    mongoose.model("TeamMember", TeamMemberSchema);
