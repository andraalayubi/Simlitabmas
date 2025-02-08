import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import { createSession, getSession } from "@/app/lib/session";
import userService from '@/app/services/userService';

export async function POST(req: NextRequest) {
  const { email, username, password, user_type } = await req.json();

  try {
    let user;

    // Cari pengguna berdasarkan email atau username
    if (email) {
      user = await userService.getUserByEmail(email, user_type);
    } else if (username) {
      user = await userService.getUserByUsername(username, user_type);
    }

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "user not found"
      }, { status: 400 });
    }
    
    const passwordMatch = await bcrypt.compare(password, await user.password!);
    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        message: "Password salah"
      }, { status: 400 });
    }

    // Buat sesi sesuai role
    const session = await createSession(user);
    console.log('create session ', session);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        token: session
      }
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Internal Server error: ${error.message}`
    }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  const session = await getSession();

  return NextResponse.json({
    success: true,
    payload: session
  });
}
