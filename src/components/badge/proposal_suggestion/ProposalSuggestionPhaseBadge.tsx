import { Badge } from "@mantine/core";
import { proposal_suggestion_phase } from "prisma/interfaces";
import React from "react";

interface ProposalSuggestionPhaseProps {
  phase: proposal_suggestion_phase | null | ""; // Menangani nilai null atau string kosong
}

const phaseColors: Record<proposal_suggestion_phase, string> = {
  pengajuan: "gray",
  evaluasi_proposal: "blue",
  penetapan: "indigo",
  monev: "green",
  evaluasi_akhir: "teal",
  penetapan_akhir: "cyan",
};

const phaseLabels: Record<proposal_suggestion_phase, string> = {
  pengajuan: "Pengajuan",
  evaluasi_proposal: "Evaluasi Proposal",
  penetapan: "Penetapan",
  monev: "Monev",
  evaluasi_akhir: "Evaluasi Akhir",
  penetapan_akhir: "Penetapan Akhir",
};

const ProposalSuggestionPhaseBadge: React.FC<ProposalSuggestionPhaseProps> = ({ phase }) => {
  const color = phase ? phaseColors[phase] || "gray" : "gray";
  const label = phase ? phaseLabels[phase] || "Tidak Diketahui" : "Tidak Diketahui";

  return <Badge color={color}>{label}</Badge>;
};

export default ProposalSuggestionPhaseBadge;
