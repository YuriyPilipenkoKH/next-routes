import mongoose from "mongoose";

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

export const User = mongoose.models?.User || mongoose.model('User', userSchema)

export interface UserRoleProps {
    user: typeof User;
    onRoleChange: (userId: string, newRole: string) => void;
  }