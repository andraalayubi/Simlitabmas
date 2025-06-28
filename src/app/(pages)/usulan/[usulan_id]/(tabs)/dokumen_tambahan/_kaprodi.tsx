"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import additionalDocumentAction from "src/action/additionalDocumentAction";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import { additional_document, proposal_suggestion } from "prisma/interfaces";
import { SessionPayload } from "src/lib/encrypt";
import AdditionalDocumentCard from "src/components/card/proposal_suggestion/AdditionalDocumentCard";
import AdditionalDocumentAddModal from "src/components/modal/proposal_suggestion/CreateAdditionalDocumentModal";

interface AdditionalDocumentKaprodiProps {
  session: SessionPayload;
  handleView: (fileUrl: string) => void;
}

const AdditionalDocumentKaprodi: React.FC<AdditionalDocumentKaprodiProps> = ({
  session,
  handleView,
}) => {
  const user_type = "kaprodi";
  const params = useParams();
  const proposal_suggestion_id = params.usulan_id;
  const { showNotification } = useNotification();

  const [dokumens, setDokumens] = useState<additional_document[]>([]);
  const [loading, setLoading] = useState(true);
  const [proposalSuggestion, setProposalSuggestion] = useState<proposal_suggestion | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  const fetchDokumens = useCallback(async () => {
    const response = await additionalDocumentAction.getAdditionalDocuments(
      user_type,
      proposal_suggestion_id as string,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setDokumens(response.data.additional_document);
      setProposalSuggestion(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, proposal_suggestion_id]);

  useEffect(() => {
    fetchDokumens();
  }, [fetchDokumens]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Skeleton visible={loading}>
        <ProposalSuggestionSummaryCard
          proposal_suggestion_name={proposalSuggestion?.name!}
          status={proposalSuggestion?.status!}
          phase={proposalSuggestion?.phase!}
        />
      </Skeleton>

      <div className="mt-6">
        <Skeleton visible={loading}>
          <Group justify="space-between" mb="md">
            <Text size="xl" fw={500}>
              Daftar Dokumen Tambahan
            </Text>
          </Group>
          <Stack gap="md">
            {dokumens.length > 0 ? (
              dokumens.map((doc) => (
                <AdditionalDocumentCard
                  key={doc.id}
                  document={doc}
                  onSuccess={fetchDokumens}
                  user_type={user_type}
                  editable={isEditable}
                  showNotification={showNotification}
                  setLoading={setLoading}
                  handleView={handleView}
                />
              ))
            ) : (
              <div className="border rounded-md p-4 text-center text-gray-500">
                <p>Tidak ada dokumen tambahan</p>
              </div>
            )}
          </Stack>
        </Skeleton>
      </div>
    </div>
  );
};

export default AdditionalDocumentKaprodi;
