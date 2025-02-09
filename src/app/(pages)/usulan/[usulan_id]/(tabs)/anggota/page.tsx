'use client'

import { useSession } from "@/app/components/session/session";
import LoadingPage from "@/app/components/usulan/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import AnggotaAdmin from "./_admin";
import AnggotaKaprodi from "./_kaprodi";
import AnggotaKetuaRG from "./_ketua_rg";
import AnggotaLecturer from "./_lecturer";


export default function AnggotaPage() {
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
      return <AnggotaAdmin />
    } else if (session?.user_type == "lecturer") {
      return <AnggotaLecturer  />
    } else if (session?.user_type == "ketua_rg") {
      return <AnggotaKetuaRG />
    } else if (session?.user_type == "kaprodi") {
      return <AnggotaKaprodi />
    } else {
      return notFound()
    }
  }