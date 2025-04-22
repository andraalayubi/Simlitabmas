"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useNotification from "src/components/notification/notification";
import { useParams } from "next/navigation";
import {
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import TableLayout from "src/components/table/tableLayout";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import ProposalSuggestionPhaseBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionPhaseBadge";

export default function ProgressRecapPage() {
  const user_type = "admin";
  const [loading, setLoading] = useState(true);
  const [proposalSuggestion, setProposalSuggestion] = useState<
    proposal_suggestion[]
  >([]);
  const { showNotification } = useNotification();

  // map column
  const columns = useMemo<MRT_ColumnDef<proposal_suggestion>[]>(
    () => [
      {
        accessorKey: "jenis",
        header: "Jenis",
        size: 80,
        Cell: ({ row }) =>
          !row.original.research_group ? "Pengmas" : "Penelitian",
      },
      {
        accessorKey: "name",
        header: "Judul Usulan",
        size: 200,
      },
      {
        accessorKey: "schema.name",
        header: "Tahun",
        size: 50,
      },
      {
        accessorKey: "lecturer.name",
        header: "Pengusul",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        Cell: ({ cell }) => (
          <ProposalSuggestionStatusBadge
            status={cell.getValue<proposal_suggestion_status>()}
          />
        ),
      },
      {
        accessorKey: "phase",
        header: "Tahap",
        size: 100,
        Cell: ({ cell }) => (
          <ProposalSuggestionPhaseBadge
            phase={cell.getValue<proposal_suggestion_phase>()}
          />
        ),
      },
    ],
    []
  );

  const getProposalSuggestion = useCallback(async () => {
    const response = await proposalSuggestionAction.getProposalSuggestion(
      user_type,
      setLoading,
    );
    
    if (response.success) {
      setProposalSuggestion(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getProposalSuggestion();
  }, [getProposalSuggestion]);

  return (
    <>
      <div>
        <TableLayout
          columns={columns}
          data={proposalSuggestion}
          isLoading={loading}
          enableRowClick={true}
          getRowClickUrl={(row) => `/usulan/${row.id}`}
        />
      </div>
    </>
  );
}
