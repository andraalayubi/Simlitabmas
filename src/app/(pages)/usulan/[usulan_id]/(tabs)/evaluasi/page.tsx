'use client'

import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/Loading/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import EvaluationAdmin from "./_admin";
import EvaluationKaprodi from "./_kaprodi";
import EvaluationKetuaRG from "./_ketua_rg";
import EvaluationLecturer from "./_lecturer";


export default function EvalauasiPage() {
    const { session, loading: sessionLoading } = useSession();
  
    useEffect(() => {
      if (!sessionLoading) {
        //   fetchDetailUsulanByUsulanId();
      }
    }, [sessionLoading]);
  
    if (sessionLoading) {
      return <></>;
    }
  
    if(session?.user_type == "admin") {
      return <EvaluationAdmin />
    } else if (session?.user_type == "lecturer") {
      return <EvaluationLecturer  />
    } else if (session?.user_type == "ketua_rg") {
      return <EvaluationKetuaRG />
    } else if (session?.user_type == "kaprodi") {
      return <EvaluationKaprodi />
    }
  }