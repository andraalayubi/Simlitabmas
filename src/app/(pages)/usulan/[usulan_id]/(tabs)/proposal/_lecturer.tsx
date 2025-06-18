"use client";

import {
  Button,
  Skeleton,
  Card,
  FileButton,
  Text,
  Divider,
} from "@mantine/core";
import { useParams } from "next/navigation";
import { proposal, proposal_suggestion, proposal_suggestion_phase, proposal_suggestion_status } from "prisma/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import useNotification from "src/components/notification/notification";
import proposalAction from "src/action/proposalAction";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import PdfViewer from "src/components/pdf/pdfViewer";
import { SessionPayload } from "src/lib/encrypt";
import { IconEye } from "@tabler/icons-react";

const ProposalLecturer = ({ session }: { session: SessionPayload }) => {
  const user_type = "lecturer";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = params.usulan_id;
  const { showNotification } = useNotification();
  const [proposal, setProposal] = useState<proposal | null>(null);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [proposalFile, setProposalFile] = useState<File | null>();
  const [isEditable, setIsEditable] = useState(false);
  const [templateProposal, setTemplateProposal] = useState<string | null>(null);

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
      setTemplateProposal(response.data.template_proposal);

      // check editable
      const isEditableByLecturer =
        response.data.lecturer_id === session.lecturer_id;

      // check by workflow
      type PartialEditableRules = Partial<Record<proposal_suggestion_phase, proposal_suggestion_status[]>>;
      const editableRules: PartialEditableRules = {
        pengajuan: ["menunggu_proposal", "tersimpan"],
        evaluasi_proposal: [],
        penetapan: ["menunggu_revisi", "tersimpan"],
        monev: [],
        evaluasi_akhir: [],
        penetapan_akhir: [],
      };

      const isEditableByConditions =
        editableRules[
          response.data.phase as proposal_suggestion_phase
        ]?.includes(response.data.status as proposal_suggestion_status) || false;
      
      // check by year research
      const isEditableByYear = response.data.open;

      setIsEditable(
        isEditableByLecturer && isEditableByConditions && isEditableByYear
      );
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id, session]); // use cache if user_type and usulan_id are same

  // update proposal
  const updateProposal = async () => {
    const response = await proposalAction.updateProposal(
      proposal,
      proposalSuggestion!.id,
      user_type,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      getProposal();
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  const handleFileUpload = async (file: File | null) => {
    if (!file) {
      showNotification({
        status: "error",
        message: "Pilih file terlebih dahulu!",
      });
      return;
    }

    const response = await proposalAction.uploadProposalFile(file!, setLoading);
    if (response.success) {
      setProposal((prev) =>
        prev ? { ...prev, file_url: response.data.filename } : null
      );
      showNotification({
        status: "success",
        message: response.message,
      });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  const clearProposalFile = () => {
    setProposalFile(null);
  };

  useEffect(() => {
    getProposal();
  }, [getProposal]);

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
            {/* Tombol Upload dan Simpan */}
            {isEditable && (
              <div className="flex flex-col gap-x-2 gap-y-3">
                <div className="text-sm text-gray-500">
                  Format file yang diizinkan: .pdf, .doc, .docx (Maksimal 10MB)
                </div>
                <div className="flex gap-2">
                  <FileButton
                    onChange={(file) => {
                      // Langsung gunakan file dari parameter onChange
                      setProposalFile(file);
                      handleFileUpload(file);
                    }}
                    accept="application/pdf"
                  >
                    {(props) => <Button {...props}>Upload Proposal</Button>}
                  </FileButton>
                  {/* <Button disabled={!proposalFile} color="red" onClick={clearProposalFile}>
                Hapus File
              </Button> */}
                  <Button
                    variant="outline"
                    onClick={updateProposal}
                    // disabled={!proposalFile}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            )}

            {/* Template Proposal Section */}
            <div className="">
              {templateProposal && (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleView(templateProposal);
                  }}
                  leftSection={<IconEye size={18} />}
                >
                  Lihat Template Proposal
                </Button>
              )}
            </div>

            {/* Hasil Reviewer */}
            <Skeleton visible={loading}>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-center">
                  <Text size="lg" fw={600}>
                    Komentar Reviewer
                  </Text>
                </div>
                <Divider size="md"></Divider>
                {proposalSuggestion?.evaluation
                  ?.filter((ev) => ev.evaluation_phase === "evaluasi_proposal")
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
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProposalLecturer;
