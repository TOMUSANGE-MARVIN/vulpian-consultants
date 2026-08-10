import mongoose, { Schema } from "mongoose";

const AdminUserSchema = new Schema(
    {
        email: { type: String, required: true },
        // scrypt hash + per-user salt. The plain password is never stored.
        passwordHash: { type: String, required: true },
        salt: { type: String, required: true },
    },
    { timestamps: true, collection: "adminusers" }
);

export const getAdminUserModel = () =>
    mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);
