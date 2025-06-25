"use client";

import React from "react";
import LoadingPage from "src/components/Loading/LoadingPage";
import { useSession } from "src/components/session/session";
import LecturerRankingKaprodi from "../lecturer/_kaprodi";

export default function LecturerRanking() {
  const { session, loading: sessionLoading } = useSession();

  if (sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type === "kaprodi") {
    return <LecturerRankingKaprodi />;
  } else {
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard";
    }
    return null;
  }
}
