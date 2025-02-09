"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "@/app/components/usulan/LoadingPage";
import DashboardAdmin from "./_admin";
import DashboardKetuaRG from "./_ketuaRg";
import DashboardLecturer from "./_lecturer";
import DashboardKaprodi from "./_kaprodi";
import { useSession } from "@/app/components/session/session";
import { notFound } from "next/navigation";

interface Usulan {
  id: number;
  title: string;
  date: string;
  schema: string;
  dosenPengusul: string;
  prodi: string;
  status: string;
  statusClass: string;
}

export default function Dashboard() {
  const [usulan, setUsulan] = useState<Usulan[]>([]);
  const { session, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);

  const user_type = session?.user_type === 'ketua_rg' 
    ? 'research_group' 
    : session?.user_type === 'lecturer' 
    ? 'lecturer' 
    : session?.user_type;

  useEffect(() => {
    const fetchUsulan = async () => {
      try {
        const response = await axios.get("/api/{$user_type}/dashboard");
        setUsulan(response.data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!sessionLoading) {
      fetchUsulan();
    }
  }, [sessionLoading]);

  if (loading || sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type === "admin") {
    return <DashboardAdmin usulan={usulan} />;
  } else if (session?.user_type === "lecturer") {
    return <DashboardLecturer usulan={usulan} />;
  } else if (session?.user_type === "ketua_rg") {
    return <DashboardKetuaRG usulan={usulan} />;
  } else if (session?.user_type === "kaprodi") {
    return <DashboardKaprodi usulan={usulan} />;
  } else {
    return notFound()
  }
}
