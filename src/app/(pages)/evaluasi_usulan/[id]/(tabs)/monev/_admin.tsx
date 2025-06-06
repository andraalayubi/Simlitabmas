"use client";

import {
  Button,
  Skeleton,
  Card,
  Text,
  FileButton,
  Divider,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { proposal_suggestion, evaluation, review } from "prisma/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import PdfViewer from "src/components/pdf/pdfViewer";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import useNotification from "src/components/notification/notification";
import evaluationAction from "src/action/evaluationAction";
import reviewAction from "src/action/reviewAction";

const MonevAdmin = () => {
  const user_type = "admin";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const evaluation_id = params.id as string;
  const { showNotification } = useNotification();
  const [evaluation, setEvaluation] = useState<evaluation | null>(null);
  const [reviews, setReviews] = useState<review[]>([]);

  const getProposalSuggestion = useCallback(async () => {
    const response = await evaluationAction.getEvaluation(
      user_type,
      setLoading,
      Number(evaluation_id)
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setEvaluation(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [evaluation_id, user_type]);

  const getReviews = useCallback(async () => {
    if (!evaluation?.proposal_suggestion_id) return;

    const response = await reviewAction.getReviews(user_type, setLoading, {
      get_reviewer: true,
      get_evaluation: true,
      proposal_suggestion_id: evaluation.proposal_suggestion_id,
    });

    if (response.success) {
      setReviews(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [evaluation, user_type]);

  useEffect(() => {
    getProposalSuggestion();
    getReviews();
  }, [getProposalSuggestion]);

  useEffect(() => {
    if (evaluation?.proposal_suggestion_id) {
      getReviews();
    }
  }, [evaluation]);

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg p-6">
        {/* Baris Judul, Status, dan Tahap Usulan */}
        <Skeleton visible={loading}>
          <ProposalSuggestionSummaryCard
            proposal_suggestion_name={evaluation?.proposal_suggestion?.name!}
            status={evaluation?.proposal_suggestion?.status!}
            phase={evaluation?.proposal_suggestion?.phase!}
          />
        </Skeleton>
        {/* Grid utama dengan perbandingan 5:3 pada layar besar, 1 kolom pada layar kecil */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[5fr_3fr] gap-6">
          {/* Kolom PDF Viewer (Lebih besar) */}
          <div>
            <Skeleton visible={loading}>
              <PdfViewer
                pdfUrl={
                  evaluation?.proposal_suggestion?.proposal?.file_url
                    ? `/api/file?name=${evaluation?.proposal_suggestion?.proposal?.file_url}`
                    : null
                }
              />
            </Skeleton>
          </div>

          {/* Hasil Reviewer */}
          <Skeleton visible={loading}>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center">
                <Text size="lg" fw={600}>
                  Komentar Reviewer
                </Text>
              </div>
              <Divider size="md"></Divider>
              {reviews
                .filter(
                  (row) =>
                    row.evaluation?.evaluation_phase === "evaluasi_monev"
                )
                .map((row) => (
                  <Card shadow="sm" padding="lg" key={row.id}>
                    <Text size="md" fw={600}>
                      {row.reviewer?.lecturer?.name}
                    </Text>
                    <Text size="sm">{row.note ?? "-"}</Text>
                  </Card>
                ))}
            </div>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default MonevAdmin;
