"use client";

import { Button, Skeleton, Card, Text, FileButton } from "@mantine/core";
import { useParams } from "next/navigation";
import { proposal, proposal_suggestion } from "prisma/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import PdfViewer from "src/components/pdf/pdfViewer";
import proposalAction from "src/action/proposalAction";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import useNotification from "src/components/notification/notification";

const ProposalAdmin = () => {
  const user_type = "admin";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = params.usulan_id;
  const { showNotification } = useNotification();
  const [proposal, setProposal] = useState<proposal | null>(null);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [proposalFile, setProposalFile] = useState<File | null>();

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
            <div className="grid grid-cols-1 gap-4">
              <Card shadow="sm" padding="lg">
                <Text size="lg" fw={600}>
                  Hasil Reviewer 1
                </Text>
                <Text>
                  Permasalahan cukup jelas dan aktual. Namun perlu ditambahkan
                  data statistik lokal.
                </Text>
              </Card>
              <Card shadow="sm" padding="lg">
                <Text size="lg" fw={600}>
                  Hasil Reviewer 2
                </Text>
                <Text>
                  Potensi dampak baik, namun keberlanjutan belum tergambarkan
                  jelas.
                </Text>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalAdmin;
