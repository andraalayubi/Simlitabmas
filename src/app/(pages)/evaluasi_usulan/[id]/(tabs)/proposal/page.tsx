'use client'

import { useSession } from "src/components/session/session";
import ProposalAdmin from "./_admin";
import ProposalLecturer from "./_lecturer";
import { Skeleton } from "@mantine/core";

export default function ProposalPage() {
    const { session, loading: sessionLoading } = useSession();
  
    if(session?.user_type == "admin") {
      return <Skeleton visible={sessionLoading}><ProposalAdmin /></Skeleton>
    } else if (session?.user_type == "lecturer") {
      return <Skeleton visible={sessionLoading}><ProposalLecturer session={session} /></Skeleton>
    }
  }