"use client";

import React, { useCallback, useEffect, useState } from "react";
import { proposal_suggestion, review } from "prisma/interfaces";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import { logbook } from "prisma/interfaces";
import logbookAction from "src/action/logbookAction";
import { Skeleton, Stack } from "@mantine/core";
import LogbookCard from "src/components/card/proposal_suggestion/LogbookCard";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import { SessionPayload } from "src/lib/encrypt";
import reviewAction from "src/action/reviewAction";

const LogBookLecturer = ({ session }: { session: SessionPayload }) => {
  const user_type = "lecturer";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const review_id = params.id;
  const { showNotification } = useNotification();
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [logbooks, setLogbooks] = useState<logbook[]>([]);
  const [editable, setEditable] = useState<boolean>(false);
  const [review, setReview] = useState<review | null>(null);
  const usulan_id = String(review?.evaluation?.proposal_suggestion_id);

  const getReview = useCallback(async () => {
    const response = await reviewAction.getById(
      user_type,
      setLoading,
      Number(review_id),
      { get_evaluation: true }
    );
    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setReview(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, review_id]);

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

      //check editable
      const isEditableByLecturer =
        response.data.lecturer_id === session.lecturer_id;

      const isEditableByYear = response.data.open;

      setEditable(isEditableByLecturer && isEditableByYear);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id, session]);
  useEffect(() => {
    getReview();
  }, [getReview]);
  useEffect(() => {
    if (review?.evaluation?.proposal_suggestion_id) {
      getLogbooks();
    }
  }, [review]);

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

export default LogBookLecturer;
