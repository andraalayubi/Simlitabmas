"use client";

import React, { useCallback, useEffect, useState } from "react";
import { proposal_suggestion, logbook } from "@prisma/client";
import { useParams } from "next/navigation";
import logbookAction from "src/action/logbookAction";
import useNotification from "src/components/notification/notification";
import { Skeleton, Stack } from "@mantine/core";
import LogbookCard from "src/components/card/proposal_suggestion/LogbookCard";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";

const LogBookKaprodi = () => {
  const user_type = "kaprodi";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = params.usulan_id;
  const { showNotification } = useNotification();
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [logbooks, setLogbooks] = useState<logbook[]>([]);

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
    getLogbooks();
  }, [getLogbooks]);

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

export default LogBookKaprodi;
