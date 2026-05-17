import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.otp !== otp || new Date() > user.otpExpiry!) {
      return NextResponse.json({ error: 'Invalid or expired session. Please start over.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { 
        password: hashedPassword,
        otp: null,
        otpExpiry: null 
      },
    });

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
