import { useEffect, useState } from "react";
import { SessionPayload } from "src/lib/encrypt";
import { getClientSession } from "src/lib/clientSession";

export function useSession() {
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const sessionData = await getClientSession();
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeSession();
  }, []);

  return { session, loading };
}
