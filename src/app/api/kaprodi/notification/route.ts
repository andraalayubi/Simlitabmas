import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "src/lib/session";
import lecturerService from "src/services/lecturerService";

export async function POST(req: NextRequest) {
    const token = process.env.FONNTE_TOKEN;    
    const {status, proposal_suggestion } = await req.json();
    const session = await getSession();

    // Skip notification if status is not one of the expected values
    if (!['menunggu_kaprodi', 'diterima', 'ditolak'].includes(status)) {
        return NextResponse.json({
            success: true,
            message: "Notification skipped: status not applicable",
            data: null
        });
    }

    let lecturer;
    try {
        if (status === 'menunggu_kaprodi') {
            const [kaprodi] = await lecturerService.getByFilter({
                department_id: proposal_suggestion.department_id,
                is_kaprodi: true
            }, undefined);
            lecturer = kaprodi;
        } else if (status === 'diterima' || status === 'ditolak') {
            lecturer = await lecturerService.getById(proposal_suggestion.lecturer_id);
        }

        let message = '';
        if (status === 'menunggu_kaprodi') {
            message = `Halo ${lecturer?.name}, ada pengajuan yang membutuhkan persetujuan Anda di SIMLITABMAS.`;
        } else if (status === 'diterima') {
            message = `Halo ${lecturer?.name}, pengajuan Anda telah disetujui.`;
        } else if (status === 'ditolak') {
            message = `Halo ${lecturer?.name}, maaf pengajuan Anda tidak dapat disetujui.`;
        }
        
        const formData = new URLSearchParams();
        formData.append('target', lecturer?.phone_number!);
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