import prisma from "../../../../../prisma";
import { NextRequest, NextResponse } from "next/server";
import departmentService from "src/services/departmentService";

export async function GET(req: NextRequest) {

    try {
        const departments = await departmentService.getAllActive();

        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: departments
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }

}

// export async function POST(req: NextRequest, { params }: { params: Params }) {
//     try {      
//         const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);

//         const body = await req.json();

//         const newVendorMember = await memberService.addVendorMember({
//             proposal_suggestion_id: proposalSuggestionId,
//             name: body.name,
//             description: body.description,
//           });

//         return NextResponse.json({
//             success: true,
//             data: newVendorMember,
//             message: "Vendor associated with proposal suggestion successfully"
//         }, { status: 201 });

//     } catch (error: any) {
//         console.error("Error creating proposal suggestion:", error);
//         return NextResponse.json({
//             success: false,
//             message: `Internal Server Error: ${error.message}`,
//         }, { status: 500 });
//     }
// }