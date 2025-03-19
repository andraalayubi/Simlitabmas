"use client";

import React, { useEffect } from "react";
import { useSession } from "src/components/session/session";
import { useRouter } from "next/navigation";
import { encode } from "src/lib/sqids";

const Page = () => {
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const hashedId = encode(session.lecturer_id!);
      router.replace(`/profile/${hashedId}`);
    } else {
      router.replace("/dashboard");
    }
  }, [session, router]);

  return <></>;
};

export default Page;
