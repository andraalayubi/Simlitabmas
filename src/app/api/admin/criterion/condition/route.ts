import { NextResponse } from "next/server";

export async function GET() {
    const condition = [
        {
          id: 1,
          type: "penelitian",
          phase: "evaluasi_proposal"
        },
        {
          id: 2,
          type: "penelitian",
          phase: "evaluasi_monev"
        },
        {
          id: 3,
          type: "penelitian",
          phase: "evaluasi_akhir"
        },
        {
          id: 4,
          type: "pengmas",
          phase: "evaluasi_proposal"
        },
        {
          id: 5,
          type: "pengmas",
          phase: "evaluasi_monev"
        },
        {
          id: 6,
          type: "pengmas",
          phase: "evaluasi_akhir"
        },
      ];
      

  return NextResponse.json(
    {
      success: true,
      message: "Data kondisi berhasil dimuat",
      data: condition,
    },
    { status: 200 }
  );
}
