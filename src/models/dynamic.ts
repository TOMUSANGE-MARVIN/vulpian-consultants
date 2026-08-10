import mongoose, { Schema } from "mongoose";
import { collections, type Collection, type FieldType } from "@/lib/collections";

const mongoType = (type: FieldType) => {
    switch (type) {
        case "paragraphs":
        case "list":
            return [String];
        case "number":
            return Number;
        default:
            return String;
    }
};

const buildSchema = (collection: Collection) => {
    const shape: Record<string, { type: unknown; default?: number }> = {
        // Every collection is user-orderable from the admin.
        order: { type: Number, default: 0 },
    };
    for (const field of collection.fields) {
        shape[field.name] = { type: mongoType(field.type) };
    }
    return new Schema(shape as never, {
        timestamps: true,
        collection: collection.mongoCollection ?? collection.name,
    });
};

/**
 * Models are registered lazily and reused across hot reloads, which is why we
 * check mongoose.models first — re-registering throws OverwriteModelError.
 */
export const getModel = (name: string) => {
    const collection = collections.find((c) => c.name === name);
    if (!collection) return null;
    return (
        mongoose.models[name] ||
        mongoose.model(name, buildSchema(collection))
    );
};
