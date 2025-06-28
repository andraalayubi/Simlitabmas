import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import memberService from "src/services/memberService";

export async function GET(req: NextRequest, { params }: { params: Params }) {

    try {
        const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);
        const proposal_suggestion = await memberService.getVendorMembers(proposalSuggestionId);
        
        return NextResponse.json({
            success: true,
            message: "Success getting data",
            data: proposal_suggestion
        }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }

}

export async function POST(req: NextRequest, { params }: { params: Params }) {
    try {      
        const proposalSuggestionId = parseInt(params.proposal_suggestion_id, 10);
        const body = await req.json();
        
        const result = await memberService.addVendorMember({
            proposal_suggestion_id: proposalSuggestionId,
            ...body
        });

        return NextResponse.json({
            success: true,
            data: result,
            message: "Vendor member added successfully"
        }, { status: 201 });

    } catch (error: any) {
        console.error("Error adding vendor member:", error);
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        const url = new URL(req.url);
        const memberId = url.searchParams.get('memberId');
        
        if (!memberId) {
            return NextResponse.json({
                success: false,
                message: 'Member ID is required',
            }, { status: 400 });
        }

        await memberService.deleteVendorMember(parseInt(memberId, 10));

        return NextResponse.json({
            success: true,
            message: 'Vendor member deleted successfully',
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error deleting vendor member:', error);
        return NextResponse.json({
            success: false,
            message: `Internal Server Error: ${error.message}`,
        }, { status: 500 });
    }
}
