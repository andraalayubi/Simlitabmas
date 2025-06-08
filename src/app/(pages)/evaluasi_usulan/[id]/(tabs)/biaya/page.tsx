'use client'

import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/Loading/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import CostAdmin from "./_admin";
import CostKaprodi from "./_kaprodi";
import CostKetuaRG from "./_ketua_rg";
import CostLecturer from "./_lecturer";




export default function BiayaPage() {
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
      return <CostAdmin />
    } else if (session?.user_type == "lecturer") {
      return <CostLecturer  />
    } else if (session?.user_type == "ketua_rg") {
      return <CostKetuaRG />
    } else if (session?.user_type == "kaprodi") {
      return <CostKaprodi />
    } else {
      return notFound()
    }
  }