import { SignJWT, jwtVerify, JWTPayload } from 'jose'
// import { Gelar, UserType } from '../../../prisma/models';
import { lecturer, user_type, user } from 'prisma/interfaces';

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export interface SessionPayload extends JWTPayload {
    user_id: user['id'];
    expiresAt: Date;
    name: user['name'];
    email: user['email'];
    username: user['username'];
    user_type: user['user_type'];
}

// membuat enkripsi payload informasi user
export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(encodedKey)
}

// decrypt payload informasi user
export async function decrypt(session: string | undefined = '') {
    try {

        if (session === undefined) {
            console.log('session', session);
            return null;
        }

        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload

    } catch (error: any) {
        console.log('Failed to verify session', error)
    }
}
