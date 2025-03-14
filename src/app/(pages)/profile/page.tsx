"use client";

import React, { useEffect } from "react";
import Sqids from "sqids";
import { useSession } from "src/components/session/session";
import { useRouter } from "next/navigation";

const Page = () => {
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const sqids = new Sqids({ minLength: 10 });
      const hashedId = sqids.encode([session.lecturer_id!]);
      router.replace(`/profile/${hashedId}`);
    } else {
      router.replace("/dashboard");
    }
  }, [session, router]);

  return <></>;
};

export default Page;
