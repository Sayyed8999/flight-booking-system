import PDFDocument from 'pdfkit';

export const generateTicketPdf = (booking: any): Promise<Buffer> => {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ size: 'A4', margin: 50 });

        const buffers: Buffer[] = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        doc
            .fontSize(20)
            .text('Flight Booking E-Ticket', { align: 'center' })
            .moveDown(2);

        doc.fontSize(12);

        doc.text(`Booking Reference: ${booking.bookingRef}`);
        doc.text(`Status: ${booking.status}`);
        doc.moveDown();

        doc.text(`Route: ${booking.flight.origin} - ${booking.flight.destination}`);
        doc.text(`Departure: ${new Date(booking.flight.departureTime).toLocaleString()}`);
        doc.text(`Airline: ${booking.flight.airline}`);
        doc.text(`Flight No: ${booking.flight.flightNumber}`);
        doc.moveDown();

        doc.text(`Passengers:`);
        booking.passengers.forEach((p: any, index: number) => {
            doc.text(`${index + 1}. ${p.name} (${p.gender}, ${p.age})`);
        });

        doc.moveDown(2);
        doc.text('Thank you for booking with Flight Booking System ✈️');

        doc.end();
    });
};
