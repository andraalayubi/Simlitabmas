"use client";

import { Button, Skeleton, Card, Text, FileButton } from "@mantine/core";
import { useParams } from "next/navigation";
import { proposal_suggestion, evaluation } from "prisma/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import PdfViewer from "src/components/pdf/pdfViewer";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import useNotification from "src/components/notification/notification";
import evaluationAction from "src/action/evaluationAction";

const ProposalAdmin = () => {
  const user_type = "admin";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const evaluation_id = params.id as string;
  const { showNotification } = useNotification();
  const [evaluation, setEvaluation] = useState<evaluation | null>(null);

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

  useEffect(() => {
    getProposalSuggestion();
  }, [getProposalSuggestion]);

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

          {/* Kolom Tombol + Hasil Reviewer */}
          <div className="flex flex-col gap-4">
            {/* Hasil Reviewer */}
            <div className="grid grid-cols-1 gap-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalAdmin;
