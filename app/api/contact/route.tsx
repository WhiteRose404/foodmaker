// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactFormData = {
  firstname: string;
  lastname: string;
  business: string;
  email: string;
  message: string;
  subject?: string;
};

export async function POST(request: Request) {
  try {
    // Extract form data from request body
    const body: ContactFormData = await request.json();
    const { firstname, lastname, business, email, message, subject = 'New Contact Form Submission' } = body;

    // Validate required fields
    if (!firstname || !lastname || !business || !email || !message) {
      console.log("we got", body)
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Configure Zoho Mail transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zeptomail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.ZOHO_EMAIL || 'your-email@dish.ma',
        pass: process.env.ZOHO_PASSWORD || 'your-zoho-password',
      },
    });

    // Compose email content
    const mailOptions = {
      from: process.env.ZOHO_EMAIL || 'your-email@dish.ma',
      to: 'contact@dish.ma',
      subject: subject,
      replyTo: email,
      text: `Name: ${lastname} ${firstname}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div>
          <h3>New contact form submission</h3>
          <p><strong>Name:</strong> ${firstname} ${lastname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error?.message },
      { status: 500 }
    );
  }
}