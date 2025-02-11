import { getFileFromMinio, getContentTypeFromFileName, saveObject } from "src/services/fileService";
import { NextRequest, NextResponse } from "next/server";

// export const config = {
//     api: {
//         bodyParser: false
//     }
// }

export async function GET(req: NextRequest) {
    const fileName = req.nextUrl.searchParams.get("name");
    
    try {
        console.log("Getting file with name ", fileName);
        const contentType = await getContentTypeFromFileName(fileName ? fileName : '');
        
        // get file
        const fileStream = await getFileFromMinio(fileName!, contentType);
        
        const newHeaders = new Headers(req.headers)
        newHeaders.set('Content-Type', contentType)
        newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');

        const chunks: Uint8Array[] = [];
        for await (const chunk of fileStream) {
            chunks.push(chunk);
        }
        const imageBuffer = Buffer.concat(chunks);
        const base64Image = imageBuffer.toString('base64');

        // return new Response(imageBuffer, { headers: { 'content-type': 'image/png' } });
        return new Response(imageBuffer, { headers: { 'content-type': contentType } });
    } catch (error) {
        console.error('Error fetching image from MinIO:', error);
        return NextResponse.json({ data: error, status: 500 })
    }
}


export async function POST(req: NextRequest) {
    const data = await req.formData();

    try {
        const file: File | null = data.get('file') as unknown as File

        if (!File) {
            return NextResponse.json({ message: 'File not found', status: 404 });
        }

        const bytes = await file!.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // save by type 
        const result = await saveObject({name: file.name, buffer: buffer, type: file.type })

        return NextResponse.json({ data: result, status: 200 });

    } catch (error: any) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ message: 'Error uploading file', error: error.message }, { status: 500 });
    }
}


