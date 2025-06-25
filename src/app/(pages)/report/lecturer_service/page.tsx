"use client";

import React from "react";
import LoadingPage from "src/components/Loading/LoadingPage";
import { useSession } from "src/components/session/session";
import LecturerRankingKaprodiPage from "./_kaprodi";
import LecturerRankingAdminPage from "./_admin";


export default function LecturerResearchRanking() {
  const { session, loading: sessionLoading } = useSession();

  if (sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type === "kaprodi") {
    return <LecturerRankingKaprodiPage/>
  } else if (session?.user_type === "admin") {
    return <LecturerRankingAdminPage/>;
  } else {
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard";
    }
    return null;
  }
}
