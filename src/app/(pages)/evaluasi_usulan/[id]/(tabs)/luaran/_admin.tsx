"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import {
  evaluation,
  external_document,
  proposal_suggestion,
} from "prisma/interfaces";
import externalDocumentAction from "src/action/externalDocumentAction";
import { Skeleton, Stack, Text } from "@mantine/core";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import ExternalDocumentCard from "src/components/card/proposal_suggestion/ExternalDocumentCard";
import ModalComponent from "src/components/modal/modal";
import CreateExternalModal from "src/components/modal/proposal_suggestion/CreateExternalDocumentModal";
import CreateExternalDocumentModal from "src/components/modal/proposal_suggestion/CreateExternalDocumentModal";
import evaluationAction from "src/action/evaluationAction";

const ExternalDocumentAdmin = () => {
  const user_type = "admin";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const evaluation_id = params.id;
  const { showNotification } = useNotification();
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [external_documents, setExternalDocuments] = useState<
    external_document[]
  >([]);
  const [evaluation, setEvaluation] = useState<evaluation | null>(null);
  const usulan_id = Number(evaluation?.proposal_suggestion_id);

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
  }, [user_type, evaluation_id]);

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
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  useEffect(() => {
    getEvaluation();
  }, [getEvaluation]);

  useEffect(() => {
    if (evaluation?.proposal_suggestion_id) {
      getExternalDocuments();
    }
  }, [evaluation]);

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
                  editable={true}
                />
              ))}
            </Stack>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default ExternalDocumentAdmin;
