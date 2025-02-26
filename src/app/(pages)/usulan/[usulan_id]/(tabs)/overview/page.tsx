'use client'

import React from "react";
import { useSession } from "src/components/session/session";
import OverviewAdmin from "./_admin";
import OverviewLecturer from "./_lecturer";
import OverviewKetuaRG from "./_ketua_rg";
import OverviewKaprodi from "./_kaprodi";
import { Skeleton } from "@mantine/core";

export default function OverviewPage() {
  const { session, loading: sessionLoading } = useSession();

  if(session?.user_type == "admin") {
    return <Skeleton visible={sessionLoading}><OverviewAdmin /></Skeleton>
  } else if (session?.user_type == "lecturer") {
    return <Skeleton visible={sessionLoading}><OverviewLecturer  session={session}/></Skeleton>
  } else if (session?.user_type == "ketua_rg") {
    return <Skeleton visible={sessionLoading}><OverviewKetuaRG /></Skeleton>
  } else if (session?.user_type == "kaprodi") {
    return <Skeleton visible={sessionLoading}><OverviewKaprodi /></Skeleton>
  }
}
