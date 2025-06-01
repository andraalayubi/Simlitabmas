import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Text } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import { review } from "prisma/interfaces";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import reviewAction from "src/action/reviewAction";
import EvaluationPhaseBadge from "src/components/badge/evaluation/EvaluationPhaseBadge";
import { SessionPayload } from "src/lib/encrypt";

interface OverviewLecturerProps {
  session: SessionPayload;
}

const OverviewLecturer: React.FC<OverviewLecturerProps> = ({ session }) => {
  const user_type = "lecturer";
  const [loading, setLoading] = useState(true);
  const [review, setReviews] = useState<review | null>(null);
  const { showNotification } = useNotification();
  const params = useParams();
  const review_id = params.id as string;

  const getReview = useCallback(async () => {
    const response = await reviewAction.getById(
      user_type,
      setLoading,
      Number(review_id),
      {get_evaluation: true, get_proposal_suggestion: true }
    );

    if (response.success) {
      setReviews(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getReview();
  }, [getReview]);

  return (
    <>
      <Skeleton visible={loading}>
        <Card shadow="sm" padding="lg" mb="lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Ringkasan Usulan</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Text>Status Review:</Text>{" "}
            <ProposalSuggestionStatusBadge
              status={review?.status!}
            />
            <Text>Tahap Usulan:</Text>{" "}
            <EvaluationPhaseBadge
              phase={review?.evaluation?.evaluation_phase!}
            />
            <Text>Judul Usulan:</Text>
            <Text>{review?.evaluation?.proposal_suggestion?.name}</Text>
            <Text>Skema Penelitian:</Text>{" "}
            <Text>{review?.evaluation?.proposal_suggestion?.schema?.name}</Text>
            <Text>Tahun:</Text>{" "}
            <Text>
              {review?.evaluation?.proposal_suggestion?.year_research?.year}
            </Text>
            <Text>Studi Program:</Text>{" "}
            <Text>
              {review?.evaluation?.proposal_suggestion?.department?.name}
            </Text>
          </div>
          {/* <TableOverview /> */}
        </Card>
      </Skeleton>
    </>
  );
};

export default OverviewLecturer;
