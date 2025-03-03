import { Progress, Text, Tooltip } from "@mantine/core";
import {
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import React from "react";
import ProposalSuggestionPhaseBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionPhaseBadge";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import { Workflow } from "src/lib/workflow";

interface ProposalSuggestionSummaryProps {
  proposal_suggestion_name: string;
  status: proposal_suggestion_status;
  phase: proposal_suggestion_phase;
}

const plotSchema = new Workflow
const schema = plotSchema.plot

const calculateProgress = (
  phase: proposal_suggestion_phase,
  status: proposal_suggestion_status
): { progress: number; tooltip: string } => {
  const currentPhase = schema.find((s) => s.phase === phase);
  if (!currentPhase) return { progress: 0, tooltip: "" };

  const currentStatus = currentPhase.details.find((d) => d.status === status);
  if (!currentStatus) return { progress: 0, tooltip: "" };

  const phaseIndex = schema.findIndex((s) => s.phase === phase);
  const phaseStep = 100 / schema.length;
  const statusIndex = currentPhase.details.findIndex(
    (d: any) => d.status === status
  );
  const statusesInPhase = currentPhase.details.length;

  const statusContribution = ((statusIndex + 1) / statusesInPhase) * phaseStep;
  const progress = phaseIndex * phaseStep + statusContribution;

  return { progress: Math.min(100, progress), tooltip: currentStatus.info };
};

const ProposalSuggestionSummaryCard: React.FC<
  ProposalSuggestionSummaryProps
> = ({ proposal_suggestion_name, status, phase }) => {
  const { progress, tooltip } = calculateProgress(phase, status);

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

      {/* Progress Bar dengan Tooltip */}
      <Tooltip label={tooltip} withArrow withinPortal>
        <Progress
          value={progress}
          size="sm"
          className="my-4"
          styles={{
            root: { cursor: "pointer" },
          }}
        />
      </Tooltip>
    </>
  );
};

export default ProposalSuggestionSummaryCard;
