'use client'

import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/Loading/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import CostAdmin from "./_admin";
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
    } else {
      return notFound()
    }
  }