import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/app/lib/session";

export async function POST(req: NextRequest) {

    try {
        deleteSession();

        return NextResponse.json({
            success: true,
            message: "Logout successful",
        },
            {
                status: 200, // OK
            })
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: `Internal server error ${error}`,
            },
            {
                status: 500,
            }
        );
    }
}