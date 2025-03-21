'use client'

import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/Loading/LoadingPage";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import AddtionalDocumentAdmin from "./_admin";
import AddtionalDocumentKaprodi from "./_kaprodi";
import AddtionalDocumentKetuaRG from "./_ketua_rg";
import AddtionalDocumentLecturer from "./_lecturer";




export default function DokumenTambahanPage() {
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
      return <AddtionalDocumentAdmin />
    } else if (session?.user_type == "lecturer") {
      return <AddtionalDocumentLecturer  />
    } else if (session?.user_type == "ketua_rg") {
      return <AddtionalDocumentKetuaRG />
    } else if (session?.user_type == "kaprodi") {
      return <AddtionalDocumentKaprodi />
    } else {
      return notFound()
    }
  }