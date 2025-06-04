'use client'

import { useSession } from "src/components/session/session";
import { Skeleton } from "@mantine/core";
import MonevAdmin from "./_admin";
import MonevLecturer from "./_lecturer";

export default function MonevPage() {
    const { session, loading: sessionLoading } = useSession();
  
    if(session?.user_type == "admin") {
      return <Skeleton visible={sessionLoading}><MonevAdmin /></Skeleton>
    } else if (session?.user_type == "lecturer") {
      return <Skeleton visible={sessionLoading}><MonevLecturer session={session} /></Skeleton>
    }
  }