'use client'

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";


export default function DetailUsulanPage() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const usulan_id = params.usulan_id;

    useEffect(() => {
        if (!pathname.includes("overview")) {
          router.replace(`/usulan2/penelitian/${usulan_id}/overview`);
        }
      }, [pathname, usulan_id]);  

      return <>
      </>
    
}