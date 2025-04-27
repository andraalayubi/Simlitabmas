"use client";

import React from "react";
import LoadingPage from "src/components/Loading/LoadingPage";
import DashboardAdmin from "./_admin";
import DashboardKetuaRG from "./_ketuaRg";
import DashboardLecturer from "./_lecturer";
import DashboardKaprodi from "./_kaprodi";
import { useSession } from "src/components/session/session";
import { MRT_ColumnDef } from "mantine-react-table";
import { proposal_suggestion } from "prisma/interfaces";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";

export default function Dashboard() {
  const { session, loading: sessionLoading } = useSession();

  const columns = React.useMemo<MRT_ColumnDef<proposal_suggestion>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Judul Penelitian/Pengmas",
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
        size: 150,
      },
      {
        accessorFn: (row) => row.department?.name,
        header: "Prodi",
        size: 175,
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const proposal = cell.row.original as proposal_suggestion;
          return <ProposalSuggestionStatusBadge status={proposal.status} />;
        },
      },
    ],
    []
  );

  const columnsLecturer = React.useMemo<MRT_ColumnDef<proposal_suggestion>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Judul Penelitian/Pengmas",
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
        header: "Prodi",
        size: 175,
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const proposal = cell.row.original as proposal_suggestion;
          return <ProposalSuggestionStatusBadge status={proposal.status} />;
        },
      },
    ],
    []
  );

  if (sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type === "admin") {
    return <DashboardAdmin columns={columns} />;
  } else if (session?.user_type === "ketua_rg") {
    return <DashboardKetuaRG columns={columns} />;
  } else if (session?.user_type === "kaprodi") {
    return <DashboardKaprodi columns={columns} />;
  } else if (session?.user_type === "lecturer") {
    return <DashboardLecturer columns={columnsLecturer} />;
  }
}
