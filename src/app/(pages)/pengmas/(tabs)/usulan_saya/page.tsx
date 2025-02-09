"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/usulan/LoadingPage";
import { Breadcrumbs, Anchor } from "@mantine/core";


export default function MySuggestionPage() {
  const { session, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionLoading) {
      //   fetchUsulan();
    }
  }, [sessionLoading]);

  if (sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type === "admin") {
    return (
      <>
      </>
    );
  } else if (session?.user_type === "ketua_rg") {
    return;
  }
}
