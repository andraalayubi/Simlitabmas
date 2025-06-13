import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Spoiler, Text } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import {
  evaluation,
  proposal_suggestion_status,
  review,
  reviewer,
} from "prisma/interfaces";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import evaluationAction from "src/action/evaluationAction";
import DrawerPlottingReviewer from "src/components/drawer/PlottingReviewerDrawer";
import reviewerAction from "src/action/reviewerAction";
import TableLayout from "src/components/table/tableLayout";
import { MRT_ColumnDef } from "mantine-react-table";
import reviewAction from "src/action/reviewAction";
import ActionButton from "src/components/button/actionButton";
import EvaluationPhaseBadge from "src/components/badge/evaluation/EvaluationPhaseBadge";
import { IconInfoCircle } from "@tabler/icons-react";
import { Workflow } from "src/lib/workflow";
import * as XLSX from "xlsx";
import saveAs from "file-saver";

const OverviewAdmin = () => {
  const user_type = "admin";
  const [loading, setLoading] = useState(true);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [evaluation, setEvaluation] = useState<evaluation | null>(null);
  const { showNotification } = useNotification();
  const params = useParams();
  const evaluation_id = params.id as string;
  const phase = evaluation?.evaluation_phase;
  const [reviewers, setReviewers] = useState<reviewer[]>([]);
  const [reviews, setReviews] = useState<review[]>([]);
  const [existingReviewerIds, setExistingReviewerIds] = useState<number[]>([]);
  const workflow = new Workflow();

  const getReviewers = useCallback(async () => {
    if (!evaluation?.category) return;

    const response = await reviewerAction.getReviewers(user_type, setLoading, {
      get_lecturer: true,
      get_review: true,
      category: evaluation.category,
    });

    if (response.success) {
      setReviewers(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [evaluation, user_type]);

  const getReviews = useCallback(async () => {
    if (!evaluation?.proposal_suggestion_id) return;

    const response = await reviewAction.getReviews(user_type, setLoading, {
      get_reviewer: true,
      get_evaluation: true,
      proposal_suggestion_id: evaluation.proposal_suggestion_id,
    });

    if (response.success) {
      setReviews(response.data);
      const ids = response.data
        .filter(
          (r: review) =>
            r.evaluation?.evaluation_phase === evaluation?.evaluation_phase
        )
        .map((r: review) => r.reviewer_id);

      setExistingReviewerIds(ids);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [evaluation, user_type]);

  const getEvaluation = useCallback(async () => {
    const response = await evaluationAction.getEvaluation(
      user_type,
      setLoading,
      Number(evaluation_id)
    );

    if (response.success) {
      setEvaluation(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [evaluation_id, user_type]);

  // close drawer and refetch data
  const handleSuccess = useCallback(() => {
    getEvaluation();
    setDrawerOpened(false);
  }, [getEvaluation]);

  const exportToExcel = () => {
    if (reviews.length === 0) return;

    const exportData = reviews.map((r) => ({
      "Nama Reviewer": r.reviewer?.lecturer?.name ?? "-",
      Nilai: r.average_score ?? "-",
      Catatan: r.note ?? "-",
      "Tahap Review":
        r.evaluation?.evaluation_phase
          ?.split("_")
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(" ") ?? "-",
      "Status Review": r.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Review");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "data-review.xlsx");
  };

  useEffect(() => {
    getEvaluation();
  }, [getEvaluation]);

  useEffect(() => {
    if (
      evaluation?.category &&
      evaluation?.proposal_suggestion_id &&
      evaluation.evaluation_phase
    ) {
      getReviewers();
      getReviews();
    }
  }, [evaluation]);

  const deleteReview = async (review_id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus review dari tahap ini?")) {
      const response = await reviewAction.deleteReview(user_type, review_id);

      if (response.success) {
        showNotification({ status: "success", message: response.message });
        getEvaluation();
      } else {
        showNotification({ status: "error", message: response.message });
      }
    }
  };

  const columns = useMemo<MRT_ColumnDef<review>[]>(
    () => [
      {
        accessorFn: (row) => row.reviewer?.lecturer?.name,
        header: "Nama Reviewer",
        size: 200,
      },
      {
        accessorFn: (row) => row.average_score,
        header: "Nilai",
        size: 50,
      },
      {
        accessorFn: (row) => row.note,
        header: "Catatan",
        size: 250,
      },
      {
        accessorFn: (row) => row.evaluation?.evaluation_phase,
        header: "Tahap Review",
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return value
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "); // kapitalisasi + ubah underscore ke spasi
        },
      },
      {
        accessorKey: "status",
        header: "Status Review",
        Cell: ({ cell }) => (
          <ProposalSuggestionStatusBadge
            status={cell.getValue<proposal_suggestion_status>()}
          />
        ),
      },
      {
        header: "Aksi",
        size: 50,
        Cell: ({ row }) => {
          return row.original.evaluation?.evaluation_phase ===
            evaluation?.evaluation_phase ? (
            <ActionButton
              type="delete"
              label="Hapus Review"
              onClick={() => deleteReview(row.original.id)}
            />
          ) : null;
        },
      },
    ],
    [evaluation?.evaluation_phase]
  );

  return (
    <>
      <DrawerPlottingReviewer
        user_type={user_type}
        evaluation={evaluation!}
        phase={phase!}
        type={evaluation?.category!}
        reviewer={reviewers.filter(
          (r) =>
            !existingReviewerIds.includes(r.id) &&
            r.lecturer_id !== evaluation?.proposal_suggestion?.lecturer_id
        )}
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        editable={false}
        loading={loading}
        onSuccess={handleSuccess}
        existingReviewerCount={existingReviewerIds.length}
      />

      <Skeleton visible={loading}>
        <Card shadow="sm" padding="lg" mb="lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Ringkasan Evaluasi Usulan</h2>
            <div className="flex space-x-4">
              <Button color="blue" onClick={() => setDrawerOpened(true)}>
                Pilih Reviewer
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-[auto_auto_1fr] gap-x-8 gap-y-4 my-8 items-baseline">
            {/* Baris Judul Usulan */}
            <Text className="font-medium">Judul Usulan</Text>
            <Text>:</Text>
            <Text className="col-span-1">
              {evaluation?.proposal_suggestion?.name}
            </Text>

            {/* Baris Tipe Usulan */}
            <Text className="font-medium">Tipe Usulan</Text>
            <Text>:</Text>
            <Text>
              {evaluation?.proposal_suggestion?.research_group_id != null
                ? "Penelitian"
                : "Pengabdian Masyarakat"}
            </Text>

            {/* Baris Status Usulan */}
            <Text className="font-medium">Status Evaluasi Usulan</Text>
            <Text>:</Text>
            <div>
              <ProposalSuggestionStatusBadge
                status={evaluation?.proposal_suggestion?.status!}
              />
            </div>

            {/* Baris Tahap Usulan */}
            <Text className="font-medium">Tahap Evaluasi Usulan</Text>
            <Text>:</Text>
            <div>
              <EvaluationPhaseBadge phase={evaluation?.evaluation_phase!} />
            </div>

            {/* Baris Proses */}
            <Text className="font-medium">Proses</Text>
            <Text>:</Text>
            <div className="flex text-blue-600">
              <span>
                <IconInfoCircle />
              </span>
              <Spoiler
                maxHeight={30}
                showLabel="lihat"
                hideLabel="sembunyi"
                className="text-gray-600"
              >
                {
                  workflow.getAll(
                    evaluation?.proposal_suggestion?.status!,
                    evaluation?.proposal_suggestion?.phase!,
                    evaluation?.proposal_suggestion?.research_group_id! != null
                      ? "penelitian"
                      : "pengmas"
                  ).info
                }
              </Spoiler>
            </div>

            {/* Baris Skema Penelitian */}
            <Text className="font-medium">Skema Penelitian</Text>
            <Text>:</Text>
            <Text>{evaluation?.proposal_suggestion?.schema?.name}</Text>

            {/* Baris Tahun */}
            <Text className="font-medium">Tahun</Text>
            <Text>:</Text>
            <Text>{evaluation?.proposal_suggestion?.year_research?.year}</Text>

            {/* Baris Research Group / Program Studi */}
            {evaluation?.proposal_suggestion?.research_group_id != null ? (
              <>
                <Text className="font-medium">Research Group</Text>
                <Text>:</Text>
                <Text>
                  {evaluation?.proposal_suggestion?.research_group?.name}
                </Text>
              </>
            ) : (
              <>
                <Text className="font-medium">Program Studi</Text>
                <Text>:</Text>
                <Text>{evaluation?.proposal_suggestion?.department?.name}</Text>
              </>
            )}
          </div>
          {/* <TableOverview /> */}
        </Card>
      </Skeleton>

      <Skeleton visible={loading}>
        <div className="flex ml-4">
          <Button color="green" onClick={exportToExcel}>
          Download Excel
        </Button>
        </div>
        <div className="mt-4">
          <TableLayout
            columns={columns}
            data={reviews}
            isLoading={loading}
            enableRowClick={false}
          />
        </div>
      </Skeleton>
    </>
  );
};

export default OverviewAdmin;
