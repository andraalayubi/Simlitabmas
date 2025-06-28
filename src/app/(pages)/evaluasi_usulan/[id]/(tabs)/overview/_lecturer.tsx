import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Text } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import { review } from "prisma/interfaces";
import reviewAction from "src/action/reviewAction";
import EvaluationPhaseBadge from "src/components/badge/evaluation/EvaluationPhaseBadge";
import { SessionPayload } from "src/lib/encrypt";
import EvaluationStatusBadge from "src/components/badge/evaluation/EvaluationStatusBadge";

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
            <h2 className="text-xl font-semibold">Ringkasan Review</h2>
          </div>
<div className="grid grid-cols-[auto_auto_1fr] gap-x-8 gap-y-4 my-8 items-baseline">
            {/* Baris Judul Usulan */}
            <Text className="font-medium">Judul Usulan</Text>
            <Text>:</Text>
            <Text className="col-span-1">{review?.evaluation?.proposal_suggestion?.name}</Text>

            {/* Baris Tipe Usulan */}
            <Text className="font-medium">Tipe Usulan</Text>
            <Text>:</Text>
            <Text>
              {review?.evaluation?.proposal_suggestion?.research_group_id != null
                ? "Penelitian"
                : "Pengabdian Masyarakat"}
            </Text>

            {/* Baris Status Usulan */}
            <Text className="font-medium">Status Review</Text>
            <Text>:</Text>
            <div>
              <EvaluationStatusBadge
                status={review?.status!}
              />
            </div>

            {/* Baris Tahap Usulan */}
            <Text className="font-medium">Tahap Evaluasi Usulan</Text>
            <Text>:</Text>
            <div>
              <EvaluationPhaseBadge
                phase={review?.evaluation?.evaluation_phase!}
              />
            </div>

            {/* Baris Skema Penelitian */}
            <Text className="font-medium">Skema Penelitian</Text>
            <Text>:</Text>
            <Text>{review?.evaluation?.proposal_suggestion?.schema?.name}</Text>

            {/* Baris Tahun */}
            <Text className="font-medium">Tahun</Text>
            <Text>:</Text>
            <Text>{review?.evaluation?.proposal_suggestion?.year_research?.year}</Text>

            {/* Baris Research Group / Program Studi */}
            {review?.evaluation?.proposal_suggestion?.research_group_id != null ? (
              <>
                <Text className="font-medium">Research Group</Text>
                <Text>:</Text>
                <Text>{review?.evaluation?.proposal_suggestion?.research_group?.name}</Text>
              </>
            ) : (
              <>
                <Text className="font-medium">Program Studi</Text>
                <Text>:</Text>
                <Text>{review?.evaluation?.proposal_suggestion?.department?.name}</Text>
              </>
            )}
          </div>
          {/* <TableOverview /> */}
        </Card>
      </Skeleton>
    </>
  );
};

export default OverviewLecturer;
