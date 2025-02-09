"use client";

import React, { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function ResearchPage() {
  const router = useRouter();
  const pathname = usePathname();



  // redirect to tab 'usulan saya'
  useEffect(() => {
    if (!pathname.includes("usulan_saya")) {
      router.replace(`/pengmas/usulan_saya`);
    }
  }, [pathname]);

  return <></>;
}
