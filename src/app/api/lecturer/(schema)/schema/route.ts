import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import schemaService from '@/app/services/schemaService';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {    
    const schemas = await schemaService.getAllActive();
    console.log('schemas: ', schemas);
    

    return NextResponse.json({
      success: true,
      data: schemas
    }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving schemas:', error);
    return NextResponse.json({
      success: false,
      message: 'Unable to retrieve schemas',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}