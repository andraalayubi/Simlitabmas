import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';
import bcrypt from "bcrypt";
import { createSession, getSession } from "@/app/lib/session";
import { Gelar, UserType } from '../../../../prisma/models';


export async function GET(req: NextRequest) {

  const session = await getSession();

  return NextResponse.json({
    success: true,
    payload: session
  })
}


export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        dosen: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Email tidak ditemukan",
      }, { status: 400 },)

    }

    // get jabatan info
    if (user.dosen && user.dosen.jabatan_id) {
      const jabatan = await prisma.jabatan.findFirst({
        where: {
          id: user!.dosen!.jabatan_id,
        },
      })


      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {

        return NextResponse.json({
          success: false,
          message: "password salah",
        }, { status: 400 },)
      }

      let loggedUserType: UserType;
      if (user.user_type === 'admin') {
        loggedUserType = UserType.ADMIN;
      } else if (user.user_type === 'ketua_rg') {
        loggedUserType = UserType.KETUA_RG;
      } else if (user.user_type === 'kaprodi') {
        loggedUserType = UserType.KAPRODI;
      } else {
        loggedUserType = UserType.DOSEN;
      }

      let loggedGelarUser: Gelar;
      if (user.dosen?.gelar_tertinggi === 'S1') {
        loggedGelarUser = Gelar.S1;
      } else if (user.dosen?.gelar_tertinggi === 'S2') {
        loggedGelarUser = Gelar.S2;
      } else {
        loggedGelarUser = Gelar.S3;
      }

      // buat sesi sesuai role
      await createSession(user.id.toString(), loggedUserType, loggedGelarUser, jabatan!.nama.toString());


      return NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          user_type: loggedUserType,
          gelar: loggedGelarUser,
        },
      }, { status: 200 },)

    } else {

      return NextResponse.json({
        success: false,
        message: "Invalid User",
      }, { status: 400 },)


    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Internal Server error ${error}`

    }, { status: 500 },)

  }

}