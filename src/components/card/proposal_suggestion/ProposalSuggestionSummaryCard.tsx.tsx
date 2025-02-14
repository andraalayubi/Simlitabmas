import {Progress, Text } from "@mantine/core";
import {
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import React from "react";
import ProposalSuggestionPhaseBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionPhaseBadge";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";

interface ProposalSuggestionSummaryProps {
  proposal_suggestion_name: string;
  status: proposal_suggestion_status;
  phase: proposal_suggestion_phase;
}

const ProposalSuggestionSummaryCard: React.FC<
  ProposalSuggestionSummaryProps
> = ({ proposal_suggestion_name, status, phase }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div>
          <Text size="md" fw={700}>
            Judul Usulan
          </Text>
          <Text>{proposal_suggestion_name || ""}</Text>
        </div>

        <div className="flex gap-4">
          <div>
            <Text size="md" fw={700}>
              Status Usulan
            </Text>
            <ProposalSuggestionStatusBadge status={status} />
          </div>
          <div>
            <Text size="md" fw={700}>
              Tahap Usulan
            </Text>
            <ProposalSuggestionPhaseBadge phase={phase} />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={40} size="sm" className="my-4" />
    </>
  );
};

export default ProposalSuggestionSummaryCard;
