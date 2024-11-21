// this is for client component

// src/lib/getSession.ts
import { SessionPayload } from './encrypt';

export async function getClientSession() {
    try {
        const response = await fetch("/api/login", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching session: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const session: SessionPayload = data.payload;

        return session;
    } catch (error) {
        console.error("Error fetching session:", error);
        return null;
    }
}
