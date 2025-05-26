import { useCallback, useEffect, useState } from "react";
import { Center, Text, Divider, Group, Skeleton } from "@mantine/core";
import { ReviewerCommentCard } from "src/components/card/ReviewerCommentCard";
import {
  evaluation_phase,
  proposal_suggestion,
} from "prisma/interfaces";
import evaluationAction from "src/action/evaluationAction";
import useNotification from "src/components/notification/notification";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import { useParams } from "next/navigation";

const getPhaseTitle = (phase: evaluation_phase | null) => {
  switch (phase) {
    case "evaluasi_proposal":
      return "Evaluasi Proposal";
    case "evaluasi_monev":
      return "Evaluasi Laporan Monev";
    case "evaluasi_akhir":
      return "Evaluasi Laporan Akhir";
    default:
      return "Evaluasi";
  }
};

const EvaluationPage = () => {
  const user_type = "kaprodi";
  const { showNotification } = useNotification();
  const params = useParams();
  const usulan_id = Number(params.usulan_id);

  const [proposalData, setProposalData] = useState<proposal_suggestion | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const fetchProposalData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await evaluationAction.getEvaluation(
        user_type,
        usulan_id,
        setLoading
      );

      if (response.success) {
        showNotification({ status: "success", message: response.message });
        setProposalData(response.data);
      } else {
        showNotification({ status: "error", message: response.message });
      }
    } catch (error) {
      console.error("Error fetching proposal data:", error);
      showNotification({
        status: "error",
        message: "Terjadi kesalahan saat mengambil data",
      });
    } finally {
      setLoading(false);
    }
  }, [user_type, usulan_id]);

  useEffect(() => {
    fetchProposalData();
  }, [fetchProposalData]);

  const uniqueEvaluations = proposalData?.review
    ? proposalData.review.filter((_, index) => index % 2 === 0)
    : [];

  return (
    <div className="px-4 py-6">
      <Skeleton visible={loading}>
        <ProposalSuggestionSummaryCard
          proposal_suggestion_name={proposalData?.name!}
          status={proposalData?.status!}
          phase={proposalData?.phase!}
        />
      </Skeleton>

      {/* Jika tidak ada evaluasi */}
      {proposalData?.review?.length === 0 ? (
        <Skeleton visible={loading}>
          <Center h={200}>
            <Text>Belum ada evaluasi untuk proposal ini</Text>
          </Center>
        </Skeleton>
      ) : (
        uniqueEvaluations.map((uniqueReview) => {
          const evaluationPhase =
            uniqueReview.evaluation?.evaluation_phase ?? null;

          return (
            <div key={uniqueReview.evaluation_id} className="px-3">
              <Skeleton visible={loading}>
                <Text fw={700} size="xl" my="sm">
                  {getPhaseTitle(evaluationPhase)}
                </Text>
              </Skeleton>

              <Group grow align="flex-start">
                {proposalData?.review?.map((review, index) => (
                  <div key={review.id} style={{ height: "100%" }}>
                    <Skeleton visible={loading}>
                      <ReviewerCommentCard
                        reviewerNumber={index + 1}
                        review={review}
                      />
                    </Skeleton>
                  </div>
                ))}
              </Group>

              <Divider my="sm" />
            </div>
          );
        })
      )}
    </div>
  );
};

export default EvaluationPage;
