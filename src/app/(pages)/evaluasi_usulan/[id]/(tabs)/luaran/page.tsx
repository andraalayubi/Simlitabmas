'use client'

import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/Loading/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import ExternalDocumentAdmin from "./_admin";
import ExternalDocumentLecturer from "./_lecturer";

export default function LuaranPage() {
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
      return <ExternalDocumentAdmin />
    } else if (session?.user_type == "lecturer") {
      return <ExternalDocumentLecturer session={session} />
    } else {
      return notFound()
    }
  }