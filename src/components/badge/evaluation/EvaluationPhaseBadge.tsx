import { Badge } from "@mantine/core";
import { evaluation_phase, proposal_suggestion_phase } from "prisma/interfaces";
import React from "react";

interface EvaluationPhaseProps {
  phase: evaluation_phase | null | ""; // Menangani nilai null atau string kosong
}

const phaseColors: Record<evaluation_phase, string> = {
  evaluasi_proposal: "blue",
  evaluasi_monev: "green",
  evaluasi_akhir: "teal",
};

const phaseLabels: Record<evaluation_phase, string> = {
  evaluasi_proposal: "Evaluasi Proposal",
  evaluasi_monev: "Evaluasi Monev",
  evaluasi_akhir: "Evaluasi Akhir",
};

const EvaluationPhaseBadge: React.FC<EvaluationPhaseProps> = ({ phase }) => {
  const color = phase ? phaseColors[phase] || "gray" : "gray";
  const label = phase ? phaseLabels[phase] || "Tidak Diketahui" : "Tidak Diketahui";

  return <Badge color={color}>{label}</Badge>;
};

export default EvaluationPhaseBadge;
