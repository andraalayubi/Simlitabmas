'use client'

import React from "react";
import { useSession } from "src/components/session/session";
import { Skeleton } from "@mantine/core";
import RiwayatPengusulAdmin from "./_admin";
import RiwayatPengusulLecturer from "./_lecturer";

export default function OverviewPage() {
  const { session, loading: sessionLoading } = useSession();

  if(session?.user_type == "admin") {
    return <Skeleton visible={sessionLoading}><RiwayatPengusulAdmin /></Skeleton>
  } else if (session?.user_type == "lecturer") {
    return <Skeleton visible={sessionLoading}><RiwayatPengusulLecturer  session={session}/></Skeleton>
  }
}
