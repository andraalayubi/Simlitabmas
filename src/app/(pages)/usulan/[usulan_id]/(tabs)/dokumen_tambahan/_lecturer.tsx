"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Modal,
  TextInput,
  Text,
  FileButton,
  Group,
  Skeleton,
  Stack,
  Card,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import {
  additional_document,
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import { SessionPayload } from "src/lib/encrypt";
import AdditionalDocumentAddModal from "src/components/modal/proposal_suggestion/CreateAdditionalDocumentModal";
import AdditionalDocumentCard from "src/components/card/proposal_suggestion/AdditionalDocumentCard";
import { IconPlus, IconFile } from "@tabler/icons-react";
import additionalDocumentAction from "src/action/additionalDocumentAction";

interface AdditionalDocumentLecturerProps {
  session: SessionPayload;
  handleView: (fileUrl: string) => void;
}

const AdditionalDocumentLecturer: React.FC<AdditionalDocumentLecturerProps> = ({
  session,
  handleView,
}) => {
  const user_type = "lecturer";
  const params = useParams();
  const proposal_suggestion_id = params.usulan_id;
  const { showNotification } = useNotification();

  // State for modals
  const [opened, { open, close }] = useDisclosure(false);

  // General state
  const [isEditable, setIsEditable] = useState(false);
  const [dokumens, setDokumens] = useState<additional_document[]>([]);
  const [loading, setLoading] = useState(true);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);

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

      //check editable
      const isEditableByLecturer =
        response.data.lecturer_id === session.lecturer_id;

      // check by workflow
      type PartialEditableRules = Partial<
        Record<proposal_suggestion_phase, proposal_suggestion_status[]>
      >;
      const editableRules: PartialEditableRules = {
        pengajuan: ["menunggu_proposal", "tersimpan"],
        evaluasi_proposal: [],
        penetapan: ["menunggu_revisi", "tersimpan"],
        monev: ["menunggu_laporan", "tersimpan"],
        evaluasi_akhir: ["menunggu_laporan", "tersimpan"],
        penetapan_akhir: [],
      };

      const isEditableByConditions =
        editableRules[
          response.data.phase as proposal_suggestion_phase
        ]?.includes(response.data.status as proposal_suggestion_status) ||
        false;

      const isEditableByYear = response.data.open;

      setIsEditable(
        isEditableByLecturer && isEditableByYear && isEditableByConditions
      );
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, proposal_suggestion_id, session]);
  console.log(user_type);
  console.log(proposal_suggestion_id);
  console.log(session);
  

  useEffect(() => {
    fetchDokumens();
  }, [fetchDokumens]);

  return (
    <>
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
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={open}
                disabled={!isEditable}
                className={
                  isEditable
                    ? "bg-blue-800 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600"
                }
              >
                Tambah Dokumen
              </Button>
            </Group>
            <Stack gap="md">
              {dokumens.length > 0 ? (
                dokumens.map((doc) => (
                  <AdditionalDocumentCard
                    key={doc.id}
                    document={doc}
                    onSuccess={fetchDokumens}
                    user_type="lecturer"
                    editable={isEditable}
                    showNotification={showNotification}
                    setLoading={setLoading}
                  />
                ))
              ) : (
                <Card withBorder shadow="sm" radius="md">
                  <Group justify="center" gap="xs" c="dimmed">
                    <IconFile size={20} />
                    <Text>Tidak ada dokumen tambahan</Text>
                  </Group>
                </Card>
              )}
            </Stack>
          </Skeleton>
        </div>
      </div>

      <AdditionalDocumentAddModal
        opened={opened}
        onClose={close}
        user_type={user_type}
        proposal_suggestion_id={proposal_suggestion_id as string}
        fetchDokumens={fetchDokumens}
        loading={loading}
      />
    </>
  );
};

export default AdditionalDocumentLecturer;
