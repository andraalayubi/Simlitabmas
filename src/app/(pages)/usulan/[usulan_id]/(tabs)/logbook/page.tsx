'use client'

import { useSession } from "@/app/components/session/session";
import LoadingPage from "@/app/components/usulan/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import LogBookAdmin from "./_admin";
import LogBookKaprodi from "./_kaprodi";
import LogBookKetuaRG from "./_ketua_rg";
import LogBookLecturer from "./_lecturer";




export default function LogbookPage() {
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
      return <LogBookAdmin />
    } else if (session?.user_type == "lecturer") {
      return <LogBookLecturer  />
    } else if (session?.user_type == "ketua_rg") {
      return <LogBookKetuaRG />
    } else if (session?.user_type == "kaprodi") {
      return <LogBookKaprodi />
    } else {
      return notFound()
    }
  }