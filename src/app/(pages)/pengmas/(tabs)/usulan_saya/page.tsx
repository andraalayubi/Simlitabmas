"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/usulan/LoadingPage";
import { notFound } from "next/navigation";
import { MRT_ColumnDef } from "mantine-react-table";
import {
  proposal_suggestion,
  proposal_suggestion_status,
} from "prisma/interfaces";
import UsulanSayaAdmin from "./_admin";
import UsulanSayaLecturer from "./_lecturer";
import UsulanSayaKetuaRG from "./_ketua_rg";
import UsulanSayaKaprodi from "./_kaprodi";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";

export default function AllSuggestionPage() {
  const { session, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);

  const user_type =
    session?.user_type === "ketua_rg"
      ? "research_group"
      : session?.user_type === "lecturer"
      ? "lecturer"
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

  const columns = useMemo<MRT_ColumnDef<proposal_suggestion>[]>(
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
        accessorKey: "statusProposal",
        header: "Status Proposal",
        Cell: ({ cell }) => (
          <ProposalSuggestionStatusBadge
            status={cell.getValue<proposal_suggestion_status>()}
          />
        ),
      },
    ],
    []
  );

  if (loading || sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type === "admin") {
    return <UsulanSayaAdmin columns={columns} />;
  } else if (session?.user_type === "lecturer") {
    return <UsulanSayaLecturer columns={columns} />;
  } else if (session?.user_type === "ketua_rg") {
    return <UsulanSayaKetuaRG columns={columns} />;
  } else if (session?.user_type === "kaprodi") {
    return <UsulanSayaKaprodi columns={columns} />;
  } else {
    return notFound();
  }
}
