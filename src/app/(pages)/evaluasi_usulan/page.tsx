"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

// redirecting page only

export default function EvaluasiUsulanPage() {
  const router = useRouter();

  // redirect to tab 'overview'
  useEffect(() => {
      router.replace(`/dashboard`);
  }, []);

  return null;
}
