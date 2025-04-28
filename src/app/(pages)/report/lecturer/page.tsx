"use client";

import React from "react";
import LoadingPage from "src/components/Loading/LoadingPage";
import { useSession } from "src/components/session/session";
import LecturerRankingAdmin from "./_admin";
import LecturerRankingKetuaRG from "./_ketuaRg";
import LecturerRankingKaprodi from "./_kaprodi";

export default function LecturerRanking() {
  const { session, loading: sessionLoading } = useSession();

  if (sessionLoading) {
    return <LoadingPage />;
  }
  console.log(session);

  if (session?.user_type === "admin") {
    return <LecturerRankingAdmin />;
  } else if (session?.user_type === "ketua_rg") {
    return <LecturerRankingKetuaRG />;
  } else if (session?.user_type === "kaprodi") {
    return <LecturerRankingKaprodi />;
  } else {
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard";
    }
    return null;
  }
}
