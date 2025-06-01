import { Progress, Text, Tooltip } from "@mantine/core";
import {
    evaluation_phase,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import React from "react";
import EvaluationPhaseBadge from "src/components/badge/evaluation/EvaluationPhaseBadge";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";
import { Workflow } from "src/lib/workflow";

interface ReviewSummaryProps {
  proposal_suggestion_name: string;
  status: proposal_suggestion_status;
  phase: evaluation_phase;
}

const plotSchema = new Workflow
const schema = plotSchema.plot

const calculateProgress = (
  phase: evaluation_phase,
  status: proposal_suggestion_status,
  type: string = 'penelitian'
): { progress: number; tooltip: string } => {
  const currentPhase = schema.find((s) => s.phase === phase);
  if (!currentPhase) return { progress: 0, tooltip: "" };
  
  //melihat apakah ini penelitian atau pengmas
  const details = (currentPhase.details as any)[type] || (currentPhase.details as any)['penelitian'];
  if (!details) return { progress: 0, tooltip: "" };

  const currentStatus = details.find((d: { status: string; }) => d.status === status);
  if (!currentStatus) return { progress: 0, tooltip: "" };

  const phaseIndex = schema.findIndex((s) => s.phase === phase);
  const phaseStep = 100 / schema.length;
  const statusIndex = details.findIndex(
    (d: any) => d.status === status
  );
  const statusesInPhase = details.length;

  const statusContribution = ((statusIndex + 1) / statusesInPhase) * phaseStep;
  const progress = phaseIndex * phaseStep + statusContribution;

  return { progress: Math.min(100, progress), tooltip: currentStatus.info };
};

const ReviewSummaryCard: React.FC<
  ReviewSummaryProps
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
              Status Review
            </Text>
            <ProposalSuggestionStatusBadge status={status} />
          </div>
          <div>
            <Text size="md" fw={700}>
              Tahap Usulan
            </Text>
            <EvaluationPhaseBadge phase={phase} />
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

export default ReviewSummaryCard;
