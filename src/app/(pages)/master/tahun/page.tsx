"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

// redirecting page only

export default function AuditTahunDetailPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // redirect to tab 'overview'
  useEffect(() => {
    if (!pathname.includes("tahun_usulan")) {
      router.replace(`/master/tahun/tahun_usulan`);
    }
  }, [pathname]);

  return null;
}
