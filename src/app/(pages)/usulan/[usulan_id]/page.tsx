'use client'

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";


export default function SuggestionDetailPage() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const usulan_id = params.usulan_id;


    // redirect to tab 'overview'
    useEffect(() => {
        if (!pathname.includes("overview")) {
          router.replace(`/usulan/${usulan_id}/overview`);
        }
      }, [pathname, usulan_id]);  

      return <>
      </>
    
}