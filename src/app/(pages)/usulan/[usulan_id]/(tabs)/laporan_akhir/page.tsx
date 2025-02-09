'use client'

import { useSession } from "@/app/components/session/session";
import LoadingPage from "@/app/components/usulan/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import FinalReportAdmin from "./_admin";
import FinalReportKaprodi from "./_kaprodi";
import FinalReportKetuaRG from "./_ketua_rg";
import FinalReportLecturer from "./_lecturer";




export default function LaporanAkhirPage() {
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
      return <FinalReportAdmin />
    } else if (session?.user_type == "lecturer") {
      return <FinalReportLecturer  />
    } else if (session?.user_type == "ketua_rg") {
      return <FinalReportKetuaRG />
    } else if (session?.user_type == "kaprodi") {
      return <FinalReportKaprodi />
    } else {
      return notFound()
    }
  }