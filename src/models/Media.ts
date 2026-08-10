import mongoose, { Schema } from "mongoose";

const MediaSchema = new Schema(
    {
        filename: String,
        contentType: String,
        size: Number,
        data: Buffer,
    },
    { timestamps: true, collection: "media" }
);

// Defined here rather than inside a route so that any request — upload or
// fetch — registers the model, whichever one the serverless instance hits first.
export const getMediaModel = () =>
    mongoose.models.Media || mongoose.model("Media", MediaSchema);
