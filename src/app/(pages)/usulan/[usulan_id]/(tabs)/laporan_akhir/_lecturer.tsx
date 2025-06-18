"use client";

import React, { useCallback, useEffect, useState } from "react";
import useNotification from "src/components/notification/notification";
import { useParams } from "next/navigation";
import {
  final_report,
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import { Stack, Text, Divider, Button, Card } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import { IconFileDownload, IconEye } from "@tabler/icons-react";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import finalReportAction from "src/action/finalReportAction";
import FinalReportCard from "src/components/card/proposal_suggestion/FinalReportCard";
import { SessionPayload } from "src/lib/encrypt";

const FinalReportLecturer = ({ session }: { session: SessionPayload }) => {
  const user_type = "lecturer";
  const params = useParams();
  const usulan_id = params.usulan_id;
  const { showNotification } = useNotification();

  const [loading, setLoading] = useState(true);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [finalReports, setFinalReports] = useState<final_report[]>([]);
  const [editableEarly, setEditableEarly] = useState<boolean>(false);
  const [editableLate, setEditableLate] = useState<boolean>(false);
  const [templateFinalReport, setTemplateFinalReport] = useState<string | null>(
    null
  );

  const getFinalReports = useCallback(async () => {
    const response = await finalReportAction.getFinalReports(
      user_type,
      usulan_id as string,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data);
      setFinalReports(response.data.final_report);
      setTemplateFinalReport(response.data.template_final_report);

      //check editable
      const isEditableByLecturer =
        response.data.lecturer_id === session.lecturer_id;
      type PartialEditableRules = Partial<
        Record<proposal_suggestion_phase, proposal_suggestion_status[]>
      >;
      const editableEarlyRules: PartialEditableRules = {
        pengajuan: [],
        evaluasi_proposal: [],
        penetapan: [],
        monev: ["menunggu_laporan", "tersimpan"],
        evaluasi_akhir: [],
        penetapan_akhir: [],
      };

      const isEditableEarlyByConditions =
        editableEarlyRules[
          response.data.phase as proposal_suggestion_phase
        ]?.includes(response.data.status as proposal_suggestion_status) ||
        false;

      const editableLateRules: PartialEditableRules = {
        pengajuan: [],
        evaluasi_proposal: [],
        penetapan: [],
        monev: [],
        evaluasi_akhir: ["menunggu_laporan", "tersimpan"],
        penetapan_akhir: [],
      };
      const isEditableLateByConditions =
        editableLateRules[
          response.data.phase as proposal_suggestion_phase
        ]?.includes(response.data.status as proposal_suggestion_status) ||
        false;

      // check by year research
      const isEditableByYear = response.data.open;

      setEditableEarly(
        isEditableByLecturer && isEditableByYear && isEditableEarlyByConditions
      );
      setEditableLate(
        isEditableByLecturer && isEditableByYear && isEditableLateByConditions
      );
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id, session]);

  useEffect(() => {
    getFinalReports();
  }, [getFinalReports]);

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

        <div className="mt-6">
          <Skeleton visible={loading}>
            <Stack gap="md">
              {finalReports.slice(0, 2).map((final_report, index) => (
                <FinalReportCard
                  key={final_report.id}
                  final_report={final_report}
                  onSuccess={getFinalReports}
                  user_type={user_type}
                  editable={index === 0 ? editableEarly : editableLate}
                />
              ))}
            </Stack>
          </Skeleton>
        </div>

        {/* Template Laporan Akhir Section */}
        <div className="mt-4">
          {templateFinalReport && (
            <Button
              variant="outline"
              onClick={() => {
                handleView(templateFinalReport);
              }}
              leftSection={<IconEye size={18} />}
            >
              Lihat Template Laporan
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default FinalReportLecturer;
