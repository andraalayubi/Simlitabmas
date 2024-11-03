// this is for client component

// src/lib/getSession.ts
import axios from 'axios';
import { SessionPayload } from './encrypt';

export async function getClientSession() {
    try {
        const response = await axios.get("/api/login");

        const session: SessionPayload = response.data.payload;

        return session;
    } catch (error) {
        console.error("Error fetching session:", error);
        return null;
    }
}
