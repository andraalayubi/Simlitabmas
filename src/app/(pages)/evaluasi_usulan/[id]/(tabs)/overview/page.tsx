'use client'

import React from "react";
import { useSession } from "src/components/session/session";
import OverviewLecturer from "./_lecturer";
import { Skeleton } from "@mantine/core";
import OverviewAdmin from "./_admin";

export default function OverviewPage() {
  const { session, loading: sessionLoading } = useSession();

  if(session?.user_type == "admin") {
    return <Skeleton visible={sessionLoading}><OverviewAdmin /></Skeleton>
  } else if (session?.user_type == "lecturer") {
    return <Skeleton visible={sessionLoading}><OverviewLecturer  session={session}/></Skeleton>
  }
}
