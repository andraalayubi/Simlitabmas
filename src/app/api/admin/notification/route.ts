import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import reviewerService from "src/services/reviewerService";

export async function POST(req: NextRequest) {
    const token = process.env.FONNTE_TOKEN;    
    const { reviewer_id } = await req.json();
    const session = await getSession();

    let reviewer;
    try {
        reviewer = await reviewerService.getById(reviewer_id);
        let message = `Halo ${reviewer?.lecturer?.name}, ada usulan yang membutuhkan review Anda di SIMLITABMAS.`;
        
        const formData = new URLSearchParams();
        formData.append('target', reviewer?.lecturer?.phone_number!);
        formData.append('message', message);

        const headers = new Headers();
        headers.append('Authorization', token!);

        const response = await axios.post("https://api.fonnte.com/send", formData, {
            headers: {
                'Authorization': token!,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const result = response.data;

        return NextResponse.json({
            success: true,
            message: "Success send notification",
            data: result
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}