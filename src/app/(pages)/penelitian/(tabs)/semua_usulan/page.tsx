"use client";

import React, { useMemo } from "react";
import { useSession } from "src/components/session/session";
import { MRT_ColumnDef } from "mantine-react-table";
import {
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import SemuaUsulanLecturer from "./_lecturer";
import SemuaUsulanAdmin from "./_admin";
import SemuaUsulanKaprodi from "./_kaprodi";
import SemuaUsulanKetuaRG from "./_ketua_rg";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import { Skeleton } from "@mantine/core";
import ProposalSuggestionPhaseBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionPhaseBadge";

export default function AllSuggestionPage() {
  const { session, loading: sessionLoading } = useSession();
  
  const columns = useMemo<MRT_ColumnDef<proposal_suggestion>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Judul Penelitian",
        size: 300,
      },
      {
        accessorFn: (row) => row.year_research?.year,
        header: "Tahun",
        size: 100,
      },
      {
        accessorFn: (row) => row.schema?.name,
        header: "Skema",
        size: 100,
      },
      {
        accessorFn: (row) => row.lecturer?.name,
        header: "Dosen Pengusul",
        size: 200,
      },
      {
        accessorFn: (row) => row.research_group?.name,
        header: "Research Group",
        size: 200,
      },
      {
        accessorKey: "phase",
        header: "Tahap Usulan",
        Cell: ({ cell }) => (
          <ProposalSuggestionPhaseBadge
            phase={cell.getValue<proposal_suggestion_phase>()}
          />
        ),
      },
      {
        accessorKey: "status",
        header: "Status Usulan",
        Cell: ({ cell }) => (
          <ProposalSuggestionStatusBadge
            status={cell.getValue<proposal_suggestion_status>()}
          />
        ),
      },
    ],
    []
  );

  if (session?.user_type === "admin") {
    return <Skeleton visible={sessionLoading}><SemuaUsulanAdmin columns={columns} /></Skeleton>;
  } else if (session?.user_type === "lecturer") {
    return <Skeleton visible={sessionLoading}><SemuaUsulanLecturer columns={columns} /></Skeleton>;
  } else if (session?.user_type === "ketua_rg") {
    return <Skeleton visible={sessionLoading}><SemuaUsulanKetuaRG columns={columns} /></Skeleton>;
  } else if (session?.user_type === "kaprodi") {
    return <Skeleton visible={sessionLoading}><SemuaUsulanKaprodi columns={columns} /></Skeleton>;
  }
}
