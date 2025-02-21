import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import userService from "src/services/userService";

interface Params {
    id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    const user_id = parseInt(params.id);

    const session = await getSession();

    try {
        await userService.remove(user_id);

        return NextResponse.json({
            success: true,
            message: "Success deleting data",
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}