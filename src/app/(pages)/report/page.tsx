"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

// redirecting page only

export default function ReportPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // redirect to tab 'overview'
  useEffect(() => {
    if (!pathname.includes("lecturer")) {
      router.replace(`/report/lecturer`);
    }
  }, [pathname]);

  return null;
}
