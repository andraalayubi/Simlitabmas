'use client'

import { useSession } from "src/components/session/session";
import { useEffect } from "react";
import ProposalAdmin from "./_admin";
import ProposalKaprodi from "./_kaprodi";
import ProposalKetuaRG from "./_ketua_rg";
import ProposalLecturer from "./_lecturer";
import { Skeleton } from "@mantine/core";

export default function ProposalPage() {
    const { session, loading: sessionLoading } = useSession();
  
    useEffect(() => {
      if (!sessionLoading) {
        //   fetchDetailUsulanByUsulanId();
      }
    }, [sessionLoading]);
  
    if(session?.user_type == "admin") {
      return <Skeleton visible={sessionLoading}><ProposalAdmin /></Skeleton>
    } else if (session?.user_type == "lecturer") {
      return <Skeleton visible={sessionLoading}><ProposalLecturer /></Skeleton>
    } else if (session?.user_type == "ketua_rg") {
      return <Skeleton visible={sessionLoading}><ProposalKetuaRG /></Skeleton>
    } else if (session?.user_type == "kaprodi") {
      return <Skeleton visible={sessionLoading}><ProposalKaprodi /></Skeleton>
    }
  }