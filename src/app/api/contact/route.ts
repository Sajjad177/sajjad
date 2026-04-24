import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'First name, email, and message are required.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
  from: process.env.EMAIL_ADDRESS,
  to: process.env.EMAIL_ADDRESS,
  subject: `📩 New Inquiry: ${firstName} ${lastName}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          background-color: #f4f7f9;
        }
        .card {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          border-top: 4px solid #007bff;
        }
        .header {
          margin-bottom: 25px;
          border-bottom: 1px solid #eee;
          padding-bottom: 15px;
        }
        .header h2 {
          color: #1a1a1a;
          margin: 0;
          font-size: 22px;
        }
        .info-row {
          margin-bottom: 15px;
        }
        .label {
          color: #888;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
          display: block;
        }
        .value {
          color: #333;
          font-size: 16px;
          font-weight: 500;
        }
        .message-box {
          margin-top: 25px;
          padding: 20px;
          background-color: #fcfcfc;
          border-left: 3px solid #ddd;
          color: #444;
          line-height: 1.6;
          font-style: italic;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h2>New Contact Inquiry</h2>
          </div>
          
          <div class="info-row">
            <span class="label">From</span>
            <div class="value">${firstName} ${lastName}</div>
          </div>
          
          <div class="info-row">
            <span class="label">Email Address</span>
            <div class="value"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></div>
          </div>

          <div class="message-box">
            <span class="label" style="font-style: normal;">Message</span>
            <p style="white-space: pre-wrap; margin-top: 10px;">${message}</p>
          </div>
        </div>
        <div class="footer">
          Sent via your website contact form.
        </div>
      </div>
    </body>
    </html>
  `,
};

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
