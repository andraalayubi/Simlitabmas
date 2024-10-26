import prisma from "../../../../../prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  category: string;
}

// get proposal suggestion based on category
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const category = parseInt(params.category);

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

// delete proposal
export async function DELETE(req: NextRequest, res: NextResponse) {
  const { id } = await req.json();
  try {
    const proposal = await prisma.proposal_suggestion.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Proposal berhasil dihapus",
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
