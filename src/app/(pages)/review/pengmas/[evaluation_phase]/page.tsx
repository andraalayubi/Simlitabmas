"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "src/components/session/session";
import { MRT_ColumnDef } from "mantine-react-table";
import {
  evaluation,
  proposal_suggestion_status,
  review,
} from "prisma/interfaces";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import { Skeleton, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import TableLayout from "src/components/table/tableLayout";
import { useParams } from "next/navigation";
import reviewAction from "src/action/reviewAction";

export default function AllEvaluationPage() {
  const user_type = "lecturer";
  const type = "pengmas";
  const { session, loading: sessionLoading } = useSession();
  const [data, setData] = useState<review[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const evaluation_phase = Array.isArray(params.evaluation_phase)
    ? params.evaluation_phase[0]
    : params.evaluation_phase;
  const lecturer_id = session?.lecturer_id;

  const getReview = useCallback(async () => {
    if (!lecturer_id || !evaluation_phase) return;

    const response = await reviewAction.getReviews(user_type, setLoading, {
      lecturer_id,
      evaluation_phase,
      type,
      get_evaluation: true,
    });

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setData(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [lecturer_id, evaluation_phase, type, user_type]);

  useEffect(() => {
    if (!sessionLoading && lecturer_id) {
      getReview();
    }
  }, [sessionLoading, lecturer_id, getReview]);

  const columns = useMemo<MRT_ColumnDef<review>[]>(
    () => [
      {
        accessorFn: (row) =>
          row.evaluation?.proposal_suggestion?.year_research?.year,
        header: "Tahun",
        size: 100,
      },
      {
        accessorFn: (row) => row.evaluation?.proposal_suggestion?.name,
        header: "Judul Penelitian",
        size: 300,
      },
      {
        accessorFn: (row) =>
          row.evaluation?.proposal_suggestion?.lecturer?.name,
        header: "Dosen Pengusul",
        size: 200,
      },
      {
        accessorFn: (row) => row.evaluation?.proposal_suggestion?.schema?.name,
        header: "Skema",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status Evaluation",
        Cell: ({ cell }) => (
          <ProposalSuggestionStatusBadge
            status={cell.getValue<proposal_suggestion_status>()}
          />
        ),
      },
    ],
    []
  );

  return (
    <Skeleton visible={sessionLoading}>
      <div className="flex justify-between items-center pt-5 pb-2 px-6">
        <Text size="lg" fw={700}>
          Daftar Evaluasi
        </Text>
      </div>
      <div>
        <TableLayout
          columns={columns}
          data={data}
          isLoading={loading}
          enableRowClick={true}
          getRowClickUrl={(row) => `/evaluasi_usulan/${row.id}`}
        />
      </div>
    </Skeleton>
  );
}
