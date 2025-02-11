"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/usulan/LoadingPage";
import { Breadcrumbs, Anchor, Badge } from "@mantine/core";
import { notFound } from "next/navigation";
import SemuaUsulanLecturer from "./_lecturer";
import { MRT_ColumnDef } from "mantine-react-table";
import SemuaUsulanAdmin from "./_admin";

interface UsulanData {
  id: number;
  judulPenelitian: string;
  dosenPengusul: string;
  researchGroup: string;
  progressUsulan: string;
  statusProposal: string;
}

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

  const user_type = session?.user_type === 'ketua_rg' 
    ? 'research_group' 
    : session?.user_type === 'lecturer' 
    ? 'lecturer' 
    : session?.user_type;

  useEffect(() => {
    const fetchUsulan = async () => {
      try {
        // const response = await fetch(`/api/${user_type}/dashboard`);
        // setUsulan(response.data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!sessionLoading) {
      console.log("session", session);
      
      fetchUsulan();
    }
  }, [sessionLoading]);

  const columns = useMemo<MRT_ColumnDef<UsulanData>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "judulPenelitian",
        header: "Judul Penelitian",
        size: 300,
      },
      {
        accessorKey: "skema",
        header: "Skema",
        size: 100,
      },
      {
        accessorKey: "dosenPengusul",
        header: "Dosen Pengusul",
        size: 200,
      },
      {
        accessorKey: "researchGroup",
        header: "Research Group",
        size: 200,
      },
      {
        accessorKey: "statusProposal",
        header: "Status Proposal",
        Cell: ({ cell }) => (
          <Badge color={cell.getValue<string>() === "Diisi" ? "green" : "red"}>
            {cell.getValue<string>()}
          </Badge>
        ),
      },
    ],
    []
  );

  if (loading || sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type === "admin") {
    return <SemuaUsulanAdmin columns={columns} />;
  } else if (session?.user_type === "lecturer") {
    return <SemuaUsulanLecturer columns={columns} />;
  } else if (session?.user_type === "ketua_rg") {
    // return <DashboardKetuaRG usulan={usulan} />;
  } else if (session?.user_type === "kaprodi") {
    // return <DashboardKaprodi usulan={usulan} />;
  } else {
    return <SemuaUsulanLecturer columns={columns} />;
    // return notFound();
  }
}
