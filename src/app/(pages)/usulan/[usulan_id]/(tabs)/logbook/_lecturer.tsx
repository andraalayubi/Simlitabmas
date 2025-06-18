"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import { logbook } from "prisma/interfaces";
import logbookAction from "src/action/logbookAction";
import { Button, Skeleton, Stack } from "@mantine/core";
import LogbookCard from "src/components/card/proposal_suggestion/LogbookCard";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import { SessionPayload } from "src/lib/encrypt";
import { IconEye } from "@tabler/icons-react";

const LogBookLecturer = ({ session }: { session: SessionPayload }) => {
  const user_type = "lecturer";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = params.usulan_id;
  const { showNotification } = useNotification();
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [logbooks, setLogbooks] = useState<logbook[]>([]);
  const [editableEarly, setEditableEarly] = useState<boolean>(false);
  const [editableLate, setEditableLate] = useState<boolean>(false);
  const [templateLogbook, setTemplateLogbook] = useState<string | null>(null);

  const getLogbooks = useCallback(async () => {
    const response = await logbookAction.getLogbooks(
      user_type,
      usulan_id as string,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data);
      setLogbooks(response.data.logbook);
      setTemplateLogbook(response.data.template_logbook);

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

      setEditableEarly(isEditableByLecturer && isEditableByYear && isEditableEarlyByConditions) ;
      setEditableLate(isEditableByLecturer && isEditableByYear && isEditableLateByConditions);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id, session]);

  useEffect(() => {
    getLogbooks();
  }, [getLogbooks]);

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
              {logbooks.slice(0,2).map((logbook, index) => (
                <LogbookCard
                  key={logbook.id}
                  logbook={logbook}
                  onSuccess={getLogbooks}
                  user_type={user_type}
                  editable={index === 0 ? editableEarly : editableLate}
                />
              ))}
           
            </Stack>
          </Skeleton>
        </div>

        {/* Template Logbook Section */}
        <div className="mt-4">
          {templateLogbook && (
            <Button
              variant="outline"
              onClick={() => {
                handleView(templateLogbook);
              }}
              leftSection={<IconEye size={18} />}
            >
              Lihat Template Logbook
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default LogBookLecturer;
