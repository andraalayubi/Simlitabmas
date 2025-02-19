"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/usulan/LoadingPage";
import { notFound } from "next/navigation";
import SemuaUsulanLecturer from "./_lecturer";
import { MRT_ColumnDef } from "mantine-react-table";
import SemuaUsulanKetuaRG from "./_ketua_rg";
import SemuaUsulanKaprodi from "./_kaprodi";
import {
  proposal_suggestion,
  proposal_suggestion_status,
} from "prisma/interfaces";
import SemuaUsulanAdmin from "./_admin";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import { Skeleton } from "@mantine/core";

export default function AllSuggestionPage() {
  const { session, loading: sessionLoading } = useSession();

  const columns = useMemo<MRT_ColumnDef<proposal_suggestion>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Judul Penelitian",
        size: 300,
      },
      {
        accessorKey: "schema.name",
        header: "Skema",
        size: 100,
      },
      {
        accessorKey: "lecturer.name",
        header: "Dosen Pengusul",
        size: 200,
      },
      {
        accessorKey: "status",
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
