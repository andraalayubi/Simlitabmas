"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "@/app/components/session/session";
import LoadingPage from "@/app/components/usulan/LoadingPage";
import { Breadcrumbs, Anchor } from "@mantine/core";

const BreadcrumbItems = [
  { title: "Usulan", href: "/usulan2/penelitian" },
  { title: "Penelitian", href: "/usulan2/penelitian" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function AllSuggestionPage() {
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
