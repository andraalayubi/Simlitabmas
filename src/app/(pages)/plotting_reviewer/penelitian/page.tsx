"use client";

import React, { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function PenelitianPage() {
  const router = useRouter();
  const pathname = usePathname();



  // redirect to tab 'usulan saya'
  useEffect(() => {
    if (!pathname.includes("evaluasi_proposal")) {
      router.replace(`/plotting_reviewer/penelitian/evaluasi_proposal`);
    }
  }, [pathname]);

  return <></>;
}
