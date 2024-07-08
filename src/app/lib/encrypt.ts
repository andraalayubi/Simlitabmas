import { SignJWT, jwtVerify, JWTPayload } from 'jose'
import { Gelar, UserType } from '../../../prisma/models';

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

interface Payload extends JWTPayload {
    userId: string;
    expiresAt: Date;
    user_type: UserType;
    gelar: Gelar;
    jabatan: string
}

// membuat enkripsi payload informasi user
export async function encrypt(payload: Payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encodedKey)
}

// decrypt payload informasi user
export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}
