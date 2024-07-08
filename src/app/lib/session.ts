'use server'

import { cookies } from 'next/headers'
import { encrypt, decrypt } from './encrypt'
import { Gelar, UserType } from '../../../prisma/models'

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
export async function createSession(userId: string, user_type: UserType, gelar: Gelar, jabatan: string) {
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);  // 1 jam
    const session = await encrypt({ userId, expiresAt, user_type, gelar, jabatan })

    cookies().set('session', session, {
        httpOnly: true,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
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
