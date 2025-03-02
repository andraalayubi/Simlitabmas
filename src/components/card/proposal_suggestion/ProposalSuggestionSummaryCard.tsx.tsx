import { Progress, Text, Tooltip } from "@mantine/core";
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

const schema = [
  {
    phase: "pengajuan",
    details: [
      {
        status: "menunggu proposal",
        info: "Menunggu pengusul mengunggah proposal",
      },
      {
        status: "tersimpan",
        info: "Proposal terunggah, menunggu pengusul mengajukan usulan",
      },
      { status: "menunggu rg", info: "Menunggu persetujuan ketua research group" },
      { status: "ditolak", info: "Usulan ditolak ketua research group" },
      {
        status: "diterima",
        info: "Usulan diterima ketua research group, menunggu konfirmasi admin ke tahap evaluasi proposal",
      },
    ],
  },
  {
    phase: "evaluasi proposal",
    details: [
      { status: "menunggu admin", info: "Menunggu pengusul mengajukan usulan" },
      {
        status: "menunggu review",
        info: "Reviewer telah dipilih, menunggu reviewer memberikan evaluasi",
      },
      { status: "ditolak", info: "Usulan ditolak reviewer" },
      {
        status: "diterima",
        info: "Usulan diterima reviewer, menunggu konfirmasi admin ke tahap penetapan",
      },
    ],
  },
  {
    phase: "penetapan",
    details: [
      {
        status: "menunggu admin",
        info: "Menunggu admin menetapkan usulan penelitian",
      },
      { status: "menunggu revisi", info: "Menunggu pengusul melakukan revisi" },
      {
        status: "tersimpan",
        info: "Menunggu pengusul mengajukan revisi usulan, menunggu konfirmasi admin ke tahap",
      },
    ],
  },
  {
    phase: "monev",
    details: [
      {
        status: "menunggu laporan",
        info: "Menunggu pengusul mengunggah laporan",
      },
      {
        status: "tersimpan",
        info: "Laporan terunggah, menunggu pengusul mengajukan laporan",
      },
      { status: "menunggu admin", info: "Menunggu admin memilih reviewer" },
      {
        status: "menunggu review",
        info: "Reviewer telah dipilih, menunggu reviewer memberikan evaluasi ",
      },
      { status: "ditolak", info: "Usulan ditolak reviewer" },
      {
        status: "diterima",
        info: "Usulan diterima reviewer, menunggu konfirmasi admin ke tahap penetapan",
      },
    ],
  },
  {
    phase: "evaluasi akhir",
    details: [
      {
        status: "menunggu laporan",
        info: "Menunggu pengusul mengunggah laporan",
      },
      {
        status: "tersimpan",
        info: "Laporan terunggah, menunggu pengusul mengajukan laporan",
      },
      { status: "menunggu admin", info: "Menunggu admin memilih reviewer" },
      {
        status: "menunggu review",
        info: "Reviewer telah dipilih, menunggu reviewer memberikan evaluasi ",
      },
      { status: "ditolak", info: "Usulan ditolak reviewer" },
      {
        status: "diterima",
        info: "Usulan diterima reviewer, menunggu konfirmasi admin ke tahap penetapan",
      },
    ],
  },
  {
    phase: "penetapan akhir",
    details: [
      {
        status: "menunggu admin",
        info: "Menunggu konfirmasi admin untuk pengesahan",
      },
      {
        status: "selesai",
        info: "Usulan penelitian telah selesai",
      },
    ],
  },
];

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
            // bar: { transition: "width 200ms ease" },
          }}
        />
      </Tooltip>
    </>
  );
};

export default ProposalSuggestionSummaryCard;
