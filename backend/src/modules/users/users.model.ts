import { Schema, Types, model } from 'mongoose';

export interface UserDocument extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    isVerified: boolean;
    signupOtp: string | undefined;
    signupOtpExpiresAt: Date | undefined
}

const UserSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: { type: String },

        isVerified: {
            type: Boolean,
            default: false
        },

        signupOtp: { type: String },
        signupOtpExpiresAt: { type: Date },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    { timestamps: true }
);

export const UserModel = model<UserDocument>('User', UserSchema);
