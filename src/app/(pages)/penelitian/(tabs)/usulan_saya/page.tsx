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
import UsulanSayaLecturer from "./_lecturer";
import UsulanSayaAdmin from "./_admin";
import UsulanSayaKaprodi from "./_kaprodi";
import UsulanSayaKetuaRG from "./_ketua_rg";
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
    if (!sessionLoading) {
      setLoading(false);
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
        accessorKey: "researchGroup",
        header: "Research Group",
        size: 200,
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
//
