"use client";

import React, { useMemo } from "react";
import { useSession } from "src/components/session/session";
import { MRT_ColumnDef } from "mantine-react-table";
import {
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import UsulanSayaAdmin from "./_admin";
import UsulanSayaLecturer from "./_lecturer";
import UsulanSayaKetuaRG from "./_ketua_rg";
import UsulanSayaKaprodi from "./_kaprodi";
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
        accessorFn: (row) => row.department?.name,
        header: "Program Studi",
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
    return (
      <Skeleton visible={sessionLoading}>
        <UsulanSayaAdmin columns={columns} />
      </Skeleton>
    );
  } else if (session?.user_type === "lecturer") {
    return (
      <Skeleton visible={sessionLoading}>
        <UsulanSayaLecturer columns={columns} />
      </Skeleton>
    );
  } else if (session?.user_type === "ketua_rg") {
    return (
      <Skeleton visible={sessionLoading}>
        <UsulanSayaKetuaRG columns={columns} />
      </Skeleton>
    );
  } else if (session?.user_type === "kaprodi") {
    return (
      <Skeleton visible={sessionLoading}>
        <UsulanSayaKaprodi columns={columns} />
      </Skeleton>
    );
  }
}
