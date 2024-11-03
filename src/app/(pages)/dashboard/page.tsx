"use client";

import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import axios from "axios";
import LoadingPage from "@/app/components/usulan/LoadingPage";
import { getClientSession } from "@/app/lib/clientSession";
import DashboardAdmin from "./_admin";
import DashboardKetuaRG from "./_ketuaRg";
import DashboardLecturer from "./_lecturer";
import { SessionPayload } from "@/app/lib/encrypt";


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

export default function Home() {
  const [usulan, setUsulan] = useState<Usulan[]>([]);
  const [session, setSession] = useState<SessionPayload| null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      const sessionData = await getClientSession();
      setSession(sessionData);

      try {
        const response = await axios.get("/api/usulan");
        setUsulan(response.data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (session?.user_type === "admin") {
    return <DashboardAdmin usulan={usulan} />;
  } else if (session?.user_type === "dosen") {
    return <DashboardLecturer usulan={usulan} />;
  } else if (session?.user_type === "ketua_rg") {
    return <Dashboard usulan={usulan} />;
  } else {
    return <DashboardKetuaRG usulan={usulan} />;
  }
}
