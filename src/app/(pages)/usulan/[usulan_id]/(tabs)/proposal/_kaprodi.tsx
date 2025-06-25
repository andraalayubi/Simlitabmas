"use client";

import { Skeleton, Card, Text, Divider } from "@mantine/core";
import { useParams } from "next/navigation";
import { proposal, proposal_suggestion } from "prisma/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import useNotification from "src/components/notification/notification";
import proposalAction from "src/action/proposalAction";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import PdfViewer from "src/components/pdf/pdfViewer";

const ProposalKaprodi = () => {
  const user_type = "kaprodi";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = params.usulan_id;
  const { showNotification } = useNotification();
  const [proposal, setProposal] = useState<proposal | null>(null);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);

  const getProposal = useCallback(async () => {
    const response = await proposalAction.getProposal(
      user_type,
      usulan_id as string,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data);
      setProposal(response.data.proposal);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]); // use cache if user_type and usulan_id are same

  useEffect(() => {
    getProposal();
  }, [getProposal]);

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg p-6">
        {/* Baris Judul, Status, dan Tahap Usulan */}
        <Skeleton visible={loading}>
          <ProposalSuggestionSummaryCard
            proposal_suggestion_name={proposalSuggestion?.name!}
            status={proposalSuggestion?.status!}
            phase={proposalSuggestion?.phase!}
          />
        </Skeleton>
        {/* Grid utama dengan perbandingan 5:3 pada layar besar, 1 kolom pada layar kecil */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[5fr_3fr] gap-6">
          {/* Kolom PDF Viewer (Lebih besar) */}
          <div>
            <Skeleton visible={loading}>
              <PdfViewer
                pdfUrl={
                  proposal?.file_url
                    ? `/api/file?name=${proposal.file_url}`
                    : null
                }
              />
            </Skeleton>
          </div>

          {/* Kolom Tombol + Hasil Reviewer */}
          <div className="flex flex-col gap-4">
            {/* Hasil Reviewer */}
            <Skeleton visible={loading}>
              {proposalSuggestion?.evaluation?.flatMap((ev) => ev.review)
                ?.length ? (
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-center">
                    <Text size="lg" fw={600}>
                      Komentar Reviewer
                    </Text>
                  </div>
                  <Divider size="md"></Divider>
                  {proposalSuggestion?.evaluation
                    ?.filter(
                      (ev) => ev.evaluation_phase === "evaluasi_proposal"
                    )
                    ?.flatMap(
                      (ev) =>
                        ev.review?.map((review) => (
                          <Card shadow="sm" padding="lg" key={review.id}>
                            <Text size="md" fw={600}>
                              {review.reviewer?.lecturer?.name}
                            </Text>
                            <Text size="sm">{review.note ?? "-"}</Text>
                          </Card>
                        )) ?? []
                    )}
                </div>
              ) : null}
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalKaprodi;
