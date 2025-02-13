'use server'

import { cookies } from 'next/headers'
import { encrypt, decrypt } from './encrypt'
import { user } from 'prisma/interfaces'

// get sesi
export async function getSession() {
    const cookie = cookies().get('session')?.value
    if (!cookie) {
        return null
    } else {
        return await decrypt(cookie)
    }
}


// membuat sesi
export async function createSession(user: user) {
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000 * 24);

    // 1 jam
    const session = await encrypt({ 
        user_id: user.id, 
        expiresAt: expiresAt, 
        name: user.name, 
        email: user.email, 
        username: user.username, 
        user_type: user.user_type, 
        lecturer_id: user.lecturer_id 
    })

    cookies().set('session', session, {
        httpOnly: true,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })

    return session;
}


// update sesi / tambah 
export async function updateSession() {
    const session = cookies().get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);
    cookies().set('session', session, {
        httpOnly: true,
        secure: false,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}


export async function deleteSession() {
    cookies().delete('session')
}

export { decrypt }
