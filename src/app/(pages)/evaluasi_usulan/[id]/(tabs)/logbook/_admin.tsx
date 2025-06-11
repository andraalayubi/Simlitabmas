"use client";

import React, { useCallback, useEffect, useState } from "react";
import useNotification from "src/components/notification/notification";
import { useParams } from "next/navigation";
import { evaluation, logbook, proposal_suggestion } from "prisma/interfaces";
import logbookAction from "src/action/logbookAction";
import { Stack } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import LogbookCard from "src/components/card/proposal_suggestion/LogbookCard";
import evaluationAction from "src/action/evaluationAction";

const LogBookAdmin = () => {
  const user_type = "admin";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const evaluation_id = params.id;
  const { showNotification } = useNotification();
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [logbooks, setLogbooks] = useState<logbook[]>([]);
  const [evaluation, setEvaluation] = useState<evaluation | null>(null);
  const usulan_id = String(evaluation?.proposal_suggestion_id);

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
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  useEffect(() => {
    getEvaluation();
  }, [getEvaluation]);

  useEffect(() => {
    if (evaluation?.proposal_suggestion_id) {
      getLogbooks();
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

        <div className="mt-6">
          <Skeleton visible={loading}>
            <Stack gap="md">
              {logbooks.map((logbook) => (
                <LogbookCard
                  key={logbook.id}
                  logbook={logbook}
                  onSuccess={getLogbooks}
                  user_type={user_type}
                  editable={false}
                />
              ))}
            </Stack>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default LogBookAdmin;
