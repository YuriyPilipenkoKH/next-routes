import mongoose, { InferSchemaType } from "mongoose";

export enum Roles {
    User = "user",
    Admin = "admin",
    Editor = "editor",
}

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false,
    },
    image: {type: String},
    authProviderId: { type: String },
    role: {
        type: String,
        enum: Object.values(Roles), // Allowed roles
        default: Roles.User, // Default role
    }
})
// Infer the type of the schema and fix `_id` type
type UserDocument = Omit<InferSchemaType<typeof userSchema>, '_id'> & { _id: string };

export const User = mongoose.models?.User || mongoose.model('User', userSchema)

export interface UserRoleProps {
    user: UserDocument; // Use the inferred schema type
    onRoleChange: (userId: string, newRole: string) => void;
  }