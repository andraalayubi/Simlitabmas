import { Badge } from "@mantine/core";
import { proposal_suggestion_phase } from "prisma/interfaces";
import React from "react";

interface ProposalSuggestionPhaseProps {
  phase: proposal_suggestion_phase | null | ""; // Menangani nilai null atau string kosong
}

const phaseColors: Record<proposal_suggestion_phase, string> = {
  pengajuan: "gray",
  penetapan: "blue",
  pelaksanaan: "green",
  publikasi: "teal",
};

const phaseLabels: Record<proposal_suggestion_phase, string> = {
  pengajuan: "Pengajuan",
  penetapan: "Penetapan",
  pelaksanaan: "Pelaksanaan",
  publikasi: "Publikasi",
};

const ProposalSuggestionPhaseBadge: React.FC<ProposalSuggestionPhaseProps> = ({ phase }) => {
  const color = phase ? phaseColors[phase] || "gray" : "gray";
  const label = phase ? phaseLabels[phase] || "Tidak Diketahui" : "Tidak Diketahui";

  return <Badge color={color}>{label}</Badge>;
};

export default ProposalSuggestionPhaseBadge;
