"use client";

import React from "react";
import LoadingPage from "src/components/Loading/LoadingPage";
import LecturerResearchRankingKetuaRgPage from "./_ketua_rg";
import LecturerResearchRankingAdminPage from "./_admin";
import { useSession } from "src/components/session/session";


export default function LecturerResearchRanking() {
  const { session, loading: sessionLoading } = useSession();

  if (sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type === "ketua_rg") {
    return <LecturerResearchRankingKetuaRgPage session={session}/>;
  } else if (session?.user_type === "admin") {
    return <LecturerResearchRankingAdminPage />;
  } else {
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard";
    }
    return null;
  }
}
