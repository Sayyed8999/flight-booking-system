import { Request, Response } from 'express';
import {
    registerUser,
    verifySignupOtp,
    setPassword,
    loginUser,
    resendSignupOtp
} from './auth.service';
import { UserModel } from '../users/users.model';
import { generateOtp } from './auth.utils';

export const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;
        await registerUser(name, email);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const verifySignupOtpController = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, otp } = req.body;
        await verifySignupOtp(email, otp);

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const setPasswordController = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password, confirmPassword } = req.body;
        await setPassword(email, password, confirmPassword);

        res.status(200).json({ message: 'Signup completed successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await loginUser(email, password);

        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

export const resendSignupOtpController = async (
    req: Request,
    res: Response
) => {
    try {
        const { email } = req.body;

        await resendSignupOtp(email);

        res.status(200).json({ message: 'OTP resent successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};


