import nodemailer from 'nodemailer';

export const sendTicketEmail = async (
    email: string,
    pdfBuffer: Buffer,
    bookingRef: string
) => {
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
        subject: `Your E-Ticket (${bookingRef})`,
        html: `
      <p>Your booking has been confirmed.</p>
      <p><strong>Booking Ref:</strong> ${bookingRef}</p>
      <p>Please find your e-ticket attached.</p>
    `,
        attachments: [
            {
                filename: `ticket-${bookingRef}.pdf`,
                content: pdfBuffer
            }
        ]
    });
};
