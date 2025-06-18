"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import {
  external_document,
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import externalDocumentAction from "src/action/externalDocumentAction";
import { Button, Skeleton, Stack, Text } from "@mantine/core";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import ExternalDocumentCard from "src/components/card/proposal_suggestion/ExternalDocumentCard";
import ModalComponent from "src/components/modal/modal";
import CreateExternalDocumentModal from "src/components/modal/proposal_suggestion/CreateExternalDocumentModal";
import { SessionPayload } from "src/lib/encrypt";
import { IconEye } from "@tabler/icons-react";

const ExternalDocumentLecturer = ({ session }: { session: SessionPayload }) => {
  const user_type = "lecturer";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = params.usulan_id;
  const { showNotification } = useNotification();
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [external_documents, setExternalDocuments] = useState<
    external_document[]
  >([]);
  const [editable, setEditable] = useState<boolean>(false);
  const [templateExternalDocument, setTemplateExternalDocument] = useState<
    string | null
  >(null);

  const getExternalDocuments = useCallback(async () => {
    const response = await externalDocumentAction.getExternalDocuments(
      user_type,
      usulan_id as string,
      setLoading
    );
    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data);
      setExternalDocuments(response.data.external_document);
      setTemplateExternalDocument(response.data.template_external_document);

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
        penetapan: [],
        monev: [],
        evaluasi_akhir: [],
        penetapan_akhir: [],
      };

      const isEditableByConditions =
        editableRules[
          response.data.phase as proposal_suggestion_phase
        ]?.includes(response.data.status as proposal_suggestion_status) ||
        false;

      // check by year research
      const isEditableByYear = response.data.open;

      setEditable(
        isEditableByLecturer && isEditableByYear && isEditableByConditions
      );
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id, session]);

  useEffect(() => {
    getExternalDocuments();
  }, [getExternalDocuments]);

  const handleView = (url: string | null) => {
    if (url) {
      const pdfUrl = `/api/file?name=${url}`;

      // Membuka tab baru dengan PDF viewer
      const viewerWindow = window.open("", "_blank");

      if (viewerWindow) {
        viewerWindow.document.write(`
        <html>
          <head>
            <title>PDF Viewer</title>
            <style>
              body { margin: 0; }
              iframe { width: 100%; height: 100vh; border: none; }
            </style>
          </head>
          <body>
            <iframe src="${pdfUrl}#toolbar=0"></iframe>
          </body>
        </html>
      `);
      }
    }
  };

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
              {external_documents.length > 0 ? (
                <>Daftar Luaran Usulan :</>
              ) : (
                <></>
              )}
            </Text>
            {/* Template Luaran Section */}
            <div className="flex gap-y-2 gap-x-4">
              {templateExternalDocument && (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleView(templateExternalDocument);
                  }}
                  leftSection={<IconEye size={18} />}
                >
                  Lihat Template Luaran
                </Button>
              )}
              <ModalComponent title="Tambah Luaran" disabled={!editable}>
                {(close) => (
                  <CreateExternalDocumentModal
                    user_type={user_type}
                    onClose={close}
                    proposal_suggestion={proposalSuggestion!}
                    onSuccess={getExternalDocuments}
                    disabled={!editable}
                  />
                )}
              </ModalComponent>
            </div>
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
