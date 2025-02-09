'use client'

import { useSession } from "@/app/components/session/session";
import LoadingPage from "@/app/components/usulan/LoadingPage";
import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";
import ProposalAdmin from "./_admin";
import ProposalKaprodi from "./_kaprodi";
import ProposalKetuaRG from "./_ketua_rg";
import ProposalLecturer from "./_lecturer";

export default function ProposalPage() {
    const { session, loading: sessionLoading } = useSession();
    const params = useParams();
    const usulan_id = params.usulan_id;
  
    useEffect(() => {
      if (!sessionLoading) {
        //   fetchDetailUsulanByUsulanId();
      }
    }, [sessionLoading]);
  
    // if (sessionLoading) {
    //   return <LoadingPage />;
    // }
  
    if(session?.user_type == "admin") {
      return <ProposalAdmin />
    } else if (session?.user_type == "dosen") {
      return <ProposalLecturer  />
    } else if (session?.user_type == "ketua_rg") {
      return <ProposalKetuaRG />
    } else if (session?.user_type == "kaprodi") {
      return <ProposalKaprodi />
    } 
  }