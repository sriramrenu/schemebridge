import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Valid for 2 minutes
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiry },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_KEY,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: 'Scheme Bridge - Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #1e3a8a;">Password Reset Request</h2>
          <p>Your OTP for password reset is:</p>
          <h1 style="letter-spacing: 5px; color: #1e3a8a; font-size: 32px; background: #f3f4f6; padding: 10px; border-radius: 8px; width: fit-content;">${otp}</h1>
          <p>This OTP is valid for exactly <strong>2 minutes</strong>.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
