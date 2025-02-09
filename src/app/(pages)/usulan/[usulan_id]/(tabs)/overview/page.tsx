'use client'

import React, { useEffect } from "react";
import { useSession } from "@/app/components/session/session";
import LoadingPage from "@/app/components/usulan/LoadingPage";
import { SessionPayload } from "src/lib/encrypt";
import OverviewAdmin from "./_admin";
import OverviewLecturer from "./_lecturer";
import OverviewKetuaRG from "./_ketua_rg";
import OverviewKaprodi from "./_kaprodi";
import { notFound } from "next/navigation";

export default function OverviewPage() {
  const { session, loading: sessionLoading } = useSession();
  const dummy = 'dummy';

  useEffect(() => {
    if (!sessionLoading) {
      //   fetchDetailUsulanByUsulanId();
    }
  }, [sessionLoading]);

  if (sessionLoading) {
    return <LoadingPage />;
  }

  if(session?.user_type == "admin") {
    return <OverviewAdmin overview={dummy}/>
  } else if (session?.user_type == "lecturer") {
    return <OverviewLecturer  overview={dummy}/>
  } else if (session?.user_type == "ketua_rg") {
    return <OverviewKetuaRG overview={dummy}/>
  } else if (session?.user_type == "kaprodi") {
    return <OverviewKaprodi overview={dummy}/>
  } else {
    return notFound()
  }
}
