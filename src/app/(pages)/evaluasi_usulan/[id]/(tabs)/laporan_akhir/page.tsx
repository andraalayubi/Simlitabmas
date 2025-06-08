'use client'

import { useSession } from "src/components/session/session";
import { Skeleton } from "@mantine/core";
import FinalReportAdmin from "./_admin";
import FinalReportLecturer from "./_lecturer";

export default function MonevPage() {
    const { session, loading: sessionLoading } = useSession();
  
    if(session?.user_type == "admin") {
      return <Skeleton visible={sessionLoading}><FinalReportAdmin /></Skeleton>
    } else if (session?.user_type == "lecturer") {
      return <Skeleton visible={sessionLoading}><FinalReportLecturer session={session} /></Skeleton>
    }
  }