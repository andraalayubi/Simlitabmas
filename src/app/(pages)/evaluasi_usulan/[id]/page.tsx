'use client'

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";


export default function EvaluationDetailPage() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const id = params.id;


    // redirect to tab 'overview'
    useEffect(() => {
        if (!pathname.includes("overview")) {
          router.replace(`/evaluasi_usulan/${id}/overview`);
        }
      }, [pathname, id]);  

      return <>
      </>
    
}