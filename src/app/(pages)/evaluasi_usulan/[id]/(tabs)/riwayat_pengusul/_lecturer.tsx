"use client";

import React, { useCallback, useEffect, useState } from "react";
import useNotification from "src/components/notification/notification";
import { useParams } from "next/navigation";
import { final_report, proposal_suggestion, review } from "prisma/interfaces";
import { Stack, Text, Divider, Button, Card } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import { IconFileDownload, IconEye } from "@tabler/icons-react";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import finalReportAction from "src/action/finalReportAction";
import FinalReportCard from "src/components/card/proposal_suggestion/FinalReportCard";
import { SessionPayload } from "src/lib/encrypt";
import reviewAction from "src/action/reviewAction";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import HistoryCard from "src/components/card/proposal_suggestion/HistoryCard";

const RiwayatPengusulLecturer = ({ session }: { session: SessionPayload }) => {
  const user_type = "lecturer";
  const params = useParams();
  const review_id = params.id;
  const { showNotification } = useNotification();

  const [loading, setLoading] = useState(true);
  const [proposalSuggestion, setProposalSuggestion] = useState<
    proposal_suggestion[]
  >([]);
  useState<proposal_suggestion | null>(null);
  const [review, setReview] = useState<review | null>(null);
  const lecturer_id = Number(
    review?.evaluation?.proposal_suggestion?.lecturer_id
  );

  const getReview = useCallback(async () => {
    const response = await reviewAction.getById(
      user_type,
      setLoading,
      Number(review_id),
      { get_evaluation: true, get_proposal_suggestion: true }
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setReview(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [review_id, user_type]);

  const getProposalSuggestions = useCallback(async () => {
    if (!review?.evaluation?.proposal_suggestion?.lecturer_id) return;

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
  }, [review, user_type]);

  useEffect(() => {
    getReview();
  }, [getReview]);

  useEffect(() => {
    if (review?.evaluation?.proposal_suggestion?.lecturer_id) {
      getProposalSuggestions();
    }
  }, [review]);

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

export default RiwayatPengusulLecturer;
