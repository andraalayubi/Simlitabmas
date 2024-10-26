import { NextRequest, NextResponse } from 'next/server';
import prisma from "../../../../../prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  try {
    const config = await prisma.config.findUnique({
      where: { id },
    });

    if (!config) {
      return NextResponse.json(
        {
          success: false,
          message: 'Config not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: config,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Internal Server Error ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { id, value } = await req.json();

  try {
    const updatedConfig = await prisma.config.update({
      where: { id: Number(id) },
      data: { value },
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedConfig,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Internal Server Error ${error}`,
      },
      { status: 500 }
    );
  }
}