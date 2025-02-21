import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import lecturerService from "src/services/lecturerService";
import userService from "src/services/userService";

interface Params {
    lecturer_id: string;
}

// create user by lecturer_id
export async function POST(req: NextRequest, { params }: { params: Params }) {
    const lecturer_id = parseInt(params.lecturer_id);
    const payload = await req.json();

    const session = await getSession();

    try {
        const lecturer = await lecturerService.getById(lecturer_id);

        // check if email / username not exist for this user type
        let existUser = null;
        if (payload.username !== null) {
            existUser = await userService.getUserByEmail(payload.email, payload.user_type)
        } else {
            existUser = await userService.getUserByUsername(payload.username, payload.user_type)
        }

        if (existUser) {
            return NextResponse.json({
                success: true,
                message: "User already exists",
            }, { status: 400 });
        }

        // check if user already has this role
        const lecturerUser = await userService.getFilteredUsers({ lecturer_id: lecturer_id, user_type: payload.user_type });
        if (lecturerUser.length > 0) {
            return NextResponse.json({
                success: true,
                message: "User for this lecturer already exists",
            }, { status: 400 });
        }

        const user = await userService.addNewUser({
            ...payload,
            name: lecturer!.name,
            lecturer_id: lecturer_id
        })

        return NextResponse.json({
            success: true,
            message: "Success create new user lecturer",
            data: user
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}