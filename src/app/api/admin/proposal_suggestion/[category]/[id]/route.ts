import prisma from "../../../../../../prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

// get proposal suggestion based on id
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const id = parseInt(params.id);

  try {
    const dosen = await prisma.proposal_suggestion.findMany({});

    return NextResponse.json(
      {
        success: true,
        data: dosen,
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