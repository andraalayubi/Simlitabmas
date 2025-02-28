import { Badge } from "@mantine/core";
import { proposal_suggestion_status } from "prisma/interfaces";
import React from "react";

interface ProposalSuggestionStatusProps {
  status: proposal_suggestion_status | null | ""; // Menangani nilai null atau string kosong
}

const statusColors: Record<proposal_suggestion_status, string> = {
  // Status dasar
  tersimpan: "gray",
  menunggu: "yellow",
  ditolak: "red",
  diterima: "green",
  selesai: "teal",
  
  // Status spesifik
  menunggu_proposal: "orange",
  menunggu_admin: "pink",
  menunggu_review: "yellow",
  menunggu_revisi: "yellow",
  menunggu_laporan: "lime",
  menunggu_rg : "violet",
};

const statusLabels: Record<proposal_suggestion_status, string> = {
  tersimpan: "Tersimpan",
  menunggu: "Menunggu",
  ditolak: "Ditolak",
  diterima: "Diterima",
  selesai: "Selesai",
  menunggu_proposal: "Menunggu Proposal",
  menunggu_admin: "Menunggu Admin",
  menunggu_review: "Menunggu Review",
  menunggu_revisi: "Menunggu Revisi",
  menunggu_laporan: "Menunggu Laporan",
  menunggu_rg : "Menunggu Research Group"
};

const ProposalSuggestionStatusBadge: React.FC<ProposalSuggestionStatusProps> = ({ status }) => {
  const color = status ? statusColors[status] || "gray" : "gray";
  const label = status ? statusLabels[status] || "Tidak Diketahui" : "Tidak Diketahui";

  return <Badge color={color}>{label}</Badge>;
};

export default ProposalSuggestionStatusBadge;
