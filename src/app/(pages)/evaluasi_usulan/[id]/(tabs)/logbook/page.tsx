'use client'

import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/Loading/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import LogBookAdmin from "./_admin";
import LogBookLecturer from "./_lecturer";




export default function LogbookPage() {
    const { session, loading: sessionLoading } = useSession();
    const dummy = 'dummy';
  
    useEffect(() => {
      if (!sessionLoading) {
        //   fetchDetailUsulanByUsulanId();
      }
    }, [sessionLoading]);
  
    if(session?.user_type == "admin") {
      return <LogBookAdmin />
    } else if (session?.user_type == "lecturer") {
      return <LogBookLecturer session={session} />
    } 
  }