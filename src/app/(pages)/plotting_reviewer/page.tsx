"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

// redirecting page only

export default function PlottingReviewerPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // redirect to tab 'overview'
  useEffect(() => {
    if (!pathname.includes("skema")) {
      router.replace(`/plotting_reviewer/penelitian`);
    }
  }, [pathname]);

  return null;
}
