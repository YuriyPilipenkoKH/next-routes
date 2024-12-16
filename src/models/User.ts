import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
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
    authProviderId: {type: String},
    role: {
        type: String,
        enum: ['admin', 'user', 'editor'], // Allowed roles
        default: 'user', // Default role
    }
})
// Infer the type of the schema
type UserDocument = InferSchemaType<typeof userSchema>;

export const User = mongoose.models?.User || mongoose.model('User', userSchema)

export interface UserRoleProps {
    user: UserDocument; // Use the inferred schema type
    onRoleChange: (userId: string, newRole: string) => void;
  }