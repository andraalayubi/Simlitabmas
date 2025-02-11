'use server'

import { v4 as uuid4 } from 'uuid';
import minioClient from '../client/minio';
import { IncomingMessage } from 'http';
import sharp from 'sharp';
import { randomBytes } from 'crypto';

export interface Object {
    name: string;
    buffer: Buffer;
    type: string;
}

// save object
export async function saveObject(object: Object) {
    const uuid = uuid4();
    let bucketName: string;
    let objectName: string;

    const objectType = await getContentTypeFromFileName(object.name);

    if (objectType === 'image/png' || objectType === 'image/jpg' || objectType === 'image/gif') {
        object.buffer = await sharp(object.buffer)
            .png()
            .toBuffer();
        bucketName = process.env.MINIO_BUCKET_IMG_NAME || '';
        objectName = `IMG-${uuid}.png`;

    } else if (objectType === 'application/pdf') {
        bucketName = process.env.MINIO_BUCKET_DOC_NAME || '';
        objectName = `DOC-${uuid}.pdf`;

    } else {
        const fileExtension = object.name.split('.').pop();
        bucketName = process.env.MINIO_BUCKET_OBJ_NAME || '';
        objectName = `OBJ-${uuid}.${fileExtension}`;
    }

    if (!bucketName) {
        throw new Error('Bucket name is not defined in environment variables.');
    }

    const result = await minioClient.putObject(
        bucketName,
        objectName,
        object.buffer,
        { 'Content-Type': objectType },
        function (err: any, objInfo: any) {
            if (err) {
                console.log('Error during MinIO upload:', err);
                throw err;
            }
            return objInfo;
        }
    );

    return {
        result: result,
        filename: objectName,
    };
}


// get object
export const getFileFromMinio = async (
    objectName: string,
    objectType: string,
): Promise<IncomingMessage> => {


    // determine bucket by file type
    let bucketName = '';
    if (objectType === 'image/png' || objectType === 'image/jpg' || objectType === 'image/gif') {
        bucketName = process.env.MINIO_BUCKET_IMG_NAME || '';
    } else if (objectType === 'application/pdf') {
        bucketName = process.env.MINIO_BUCKET_DOC_NAME || '';
    } else {
        bucketName = process.env.MINIO_BUCKET_OBJ_NAME || '';
    }

    return new Promise((resolve, reject) => {
        minioClient.getObject(bucketName, objectName, (err: Error, stream: any) => {
            if (err) {
                console.log('Failed to get object', err)
                return reject(err);
            }
            resolve(stream);
        });
    });
};


export const getContentTypeFromFileName = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'png':
            return 'image/png';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'gif':
            return 'image/gif';
        case 'pdf':
            return 'application/pdf';
        default:
            return 'application/octet-stream';
    }
};