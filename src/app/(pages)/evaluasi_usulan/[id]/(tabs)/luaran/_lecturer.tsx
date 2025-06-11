"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import {
  external_document,
  proposal_suggestion,
  review,
} from "prisma/interfaces";
import externalDocumentAction from "src/action/externalDocumentAction";
import { Skeleton, Stack, Text } from "@mantine/core";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import ExternalDocumentCard from "src/components/card/proposal_suggestion/ExternalDocumentCard";
import ModalComponent from "src/components/modal/modal";
import CreateExternalDocumentModal from "src/components/modal/proposal_suggestion/CreateExternalDocumentModal";
import { SessionPayload } from "src/lib/encrypt";
import reviewAction from "src/action/reviewAction";

const ExternalDocumentLecturer = ({ session }: { session: SessionPayload }) => {
  const user_type = "lecturer";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const review_id = params.id;
  const { showNotification } = useNotification();
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [external_documents, setExternalDocuments] = useState<
    external_document[]
  >([]);
  const [editable, setEditable] = useState<boolean>(false);
  const [review, setReview] = useState<review | null>(null);
  const usulan_id = Number(review?.evaluation?.proposal_suggestion_id);

  const getReview = useCallback(async () => {
    const response = await reviewAction.getById(
      user_type,
      setLoading,
      Number(review_id),
      {get_evaluation: true}
    );
    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setReview(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, review_id]);

  const getExternalDocuments = useCallback(async () => {
    const response = await externalDocumentAction.getExternalDocuments(
      user_type,
      usulan_id,
      setLoading
    );
    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data);
      setExternalDocuments(response.data.external_document);

      //check editable
      const isEditableByLecturer =
        response.data.lecturer_id === session.lecturer_id;

      const isEditableByYear = response.data.open;

      setEditable(isEditableByLecturer && isEditableByYear);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id, session]);

  useEffect(() => {
    getReview();
  }, [getReview]);

  useEffect(() => {
    if (review?.evaluation?.proposal_suggestion_id) {
      getExternalDocuments();
    }
  }, [review]);

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <Skeleton visible={loading}>
          <ProposalSuggestionSummaryCard
            proposal_suggestion_name={proposalSuggestion?.name!}
            status={proposalSuggestion?.status!}
            phase={proposalSuggestion?.phase!}
          />
        </Skeleton>
        <Skeleton visible={loading}>
          <div className="flex justify-between items-center pt-2 pb-1 px-4">
            <Text size="xl" fw={500}>
              Daftar Luaran Usulan :
            </Text>
          </div>
        </Skeleton>

        <div className="mt-6">
          <Skeleton visible={loading}>
            <Stack gap="md">
              {external_documents.map((external_document) => (
                <ExternalDocumentCard
                  key={external_document.id}
                  external_document={external_document}
                  onSuccess={getExternalDocuments}
                  user_type={user_type}
                  editable={editable}
                />
              ))}
            </Stack>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default ExternalDocumentLecturer;
