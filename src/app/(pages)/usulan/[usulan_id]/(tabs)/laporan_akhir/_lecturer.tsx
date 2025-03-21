"use client";

import React, { useCallback, useEffect, useState } from "react";
import useNotification from "src/components/notification/notification";
import { useParams } from "next/navigation";
import { final_report, proposal_suggestion } from "prisma/interfaces";
import { Stack } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import finalReportAction from "src/action/finalReportAction";
import FinalReportCard from "src/components/card/proposal_suggestion/FinalReportCard";
import { useSession } from "src/components/session/session";

const FinalReportLecturer = () => {
  const user_type = "lecturer";
  const params = useParams();
  const usulan_id = params.usulan_id;
  const { showNotification } = useNotification();

  const { session, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [finalReports, setFinalReports] = useState<final_report[]>([]);
  const [editable, setEditable] = useState<boolean>(false);

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
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  useEffect(() => {
    const isEditable = proposalSuggestion?.lecturer_id === session?.lecturer_id;
    setEditable(isEditable);
    console.log(
      proposalSuggestion?.lecturer_id,
      session?.lecturer_id,
      isEditable
    );
  }, [proposalSuggestion?.lecturer_id, session?.lecturer_id]);

  useEffect(() => {
    getFinalReports();
  }, [getFinalReports]);

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <Skeleton visible={loading && sessionLoading}>
          <ProposalSuggestionSummaryCard
            proposal_suggestion_name={proposalSuggestion?.name!}
            status={proposalSuggestion?.status!}
            phase={proposalSuggestion?.phase!}
          />
        </Skeleton>

        <div className="mt-6">
          <Skeleton visible={loading && sessionLoading}>
            <Stack gap="md">
              {finalReports.map((final_report) => (
                <FinalReportCard
                  key={final_report.id}
                  final_report={final_report}
                  onSuccess={getFinalReports}
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

export default FinalReportLecturer;