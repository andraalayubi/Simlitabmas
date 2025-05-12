import { NextRequest, NextResponse } from 'next/server';
import { getSession } from "src/lib/session";
import criterionService from 'src/services/criterionService';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        const body = await request.json();
        console.log(body)
        const newCriterion = {
            name: body.name,
            category: body.type,
            phase: body.phase,
        };

        const criterion = await criterionService.create(newCriterion);

        return NextResponse.json({
            success: true,
            message: "Success creating data",
            data: criterion
        }, { status: 201 });
    } catch (error: any) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: `Internal Server error: ${error.message}`
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {

      try {
          const data = await criterionService.getCriteria();
  
          return NextResponse.json({
              success: true,
              message: "Success getting data",
              data: data
          }, { status: 200 });
      } catch (error: any) {
          return NextResponse.json({
              success: false,
              message: `Internal Server error: ${error.message}`
          }, { status: 500 });
      }
  }