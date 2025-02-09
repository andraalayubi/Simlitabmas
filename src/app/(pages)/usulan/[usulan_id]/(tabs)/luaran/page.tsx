'use client'

import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/usulan/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import ExternalDocumentAdmin from "./_admin";
import ExternalDocumentKaprodi from "./_kaprodi";
import ExternalDocumentKetuaRG from "./_ketua_rg";
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
      return <ExternalDocumentLecturer  />
    } else if (session?.user_type == "ketua_rg") {
      return <ExternalDocumentKetuaRG />
    } else if (session?.user_type == "kaprodi") {
      return <ExternalDocumentKaprodi />
    } else {
      return notFound()
    }
  }