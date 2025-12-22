import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER as string;
const SMTP_PASS = process.env.SMTP_PASS as string;


export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async ({
    email,
    otp,
}: {
    email?: string;
    otp: string;
}) => {
    if (email) {
        await sendOtpEmail(email, otp);
    } else {
        throw new Error('No recipient for OTP');
    }
};

const sendOtpEmail = async (email: string, otp: string) => {
    console.log(SMTP_USER, SMTP_PASS, email)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    const mailOptions = {
        from: '"Flight-Booking" <no-reply@FlightBooking.com>',
        to: email,
        subject: 'Your OTP for Sign Up',
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 OTP sent to ${email}`);
};