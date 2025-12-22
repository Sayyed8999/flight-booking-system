import bcrypt from 'bcryptjs';
import { UserModel } from '../users/users.model';
import { generateOtp } from './auth.utils';
import jwt from 'jsonwebtoken';
import { sendOtp } from '../../utils/otp';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerUser = async (name: string, email: string) => {
    let user = await UserModel.findOne({ email });

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    if (user) {
        if (user.isVerified) {
            throw new Error('Email already registered');
        }

        user.signupOtp = otp;
        user.signupOtpExpiresAt = otpExpiry;
        await user.save();
    } else {
        user = await UserModel.create({
            name,
            email,
            signupOtp: otp,
            signupOtpExpiresAt: otpExpiry
        });
    }

    await sendOtp({ email, otp });
};

export const verifySignupOtp = async (email: string, otp: string) => {
    const user = await UserModel.findOne({ email });

    if (!user) throw new Error('User not found');

    if (
        user.signupOtp !== otp ||
        !user.signupOtpExpiresAt ||
        user.signupOtpExpiresAt < new Date()
    ) {
        throw new Error('Invalid or expired OTP');
    }

    user.isVerified = true;
    user.signupOtp = undefined;
    user.signupOtpExpiresAt = undefined;

    await user.save();
};

export const setPassword = async (
    email: string,
    password: string,
    confirmPassword: string
) => {
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }

    const user = await UserModel.findOne({ email });

    if (!user) throw new Error('User not found');
    if (!user.isVerified) throw new Error('Email not verified');

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;

    await user.save();
};


export const loginUser = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    if (!user.isVerified) {
        throw new Error('Email not verified');
    }

    if (!user.password) {
        throw new Error('Password not set');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

export const resendSignupOtp = async (email: string) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.signupOtp = otp;
    user.signupOtpExpiresAt = otpExpiry;

    await user.save();

    await sendOtp({ email, otp });
};
