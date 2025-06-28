"use client";

import React, { useCallback, useEffect, useState } from "react";
import useNotification from "src/components/notification/notification";
import { useParams } from "next/navigation";
import { proposal_suggestion, evaluation } from "prisma/interfaces";
import { Card, Stack } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import FinalReportCard from "src/components/card/proposal_suggestion/FinalReportCard";
import evaluationAction from "src/action/evaluationAction";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import HistoryCard from "src/components/card/proposal_suggestion/HistoryCard";

const RiwayatPengusulAdmin = () => {
  const user_type = "admin";
  const params = useParams();
  const evaluation_id = params.id;
  const { showNotification } = useNotification();

  const [loading, setLoading] = useState(true);
  const [proposalSuggestion, setProposalSuggestion] = useState<
    proposal_suggestion[]
  >([]);
  const [evaluation, setEvaluation] = useState<evaluation | null>(null);
  const lecturer_id = Number(evaluation?.proposal_suggestion?.lecturer_id);

  const getEvaluation = useCallback(async () => {
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

  const getProposalSuggestions = useCallback(async () => {
    if (!evaluation?.proposal_suggestion?.lecturer_id) return;

    const response = await proposalSuggestionAction.getProposalSuggestion(
      user_type,
      setLoading,
      {
        get_lecturer: false,
        lecturer_id,
      }
    );

    if (response.success) {
      setProposalSuggestion(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [evaluation, user_type]);

  useEffect(() => {
    getEvaluation();
  }, [getEvaluation]);

  useEffect(() => {
    if (evaluation?.proposal_suggestion?.lecturer_id) {
      getProposalSuggestions();
    }
  }, [evaluation]);

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <Skeleton visible={loading}>
          <h2 className="text-xl font-semibold">Riwayat Usulan Pengusul</h2>
        </Skeleton>

        <div className="mt-6">
          <Skeleton visible={loading}>
            <Stack gap="md">
              {proposalSuggestion
                ?.filter(
                  (item) =>
                    item.status === "selesai" || item.status === "ditolak"
                )
                .map((item) => (
                  <HistoryCard
                    key={item.id}
                    proposal_suggestion={item}
                    user_type={user_type}
                  />
                ))}
            </Stack>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default RiwayatPengusulAdmin;
