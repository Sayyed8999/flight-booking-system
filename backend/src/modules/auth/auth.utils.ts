import nodemailer from 'nodemailer';

export const generateOtp = (): string =>
    Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtpEmail = async (email: string, otp: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transporter.sendMail({
        from: `"Flight Booking" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Verify your email',
        html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 10 minutes.</p>`
    });
};
