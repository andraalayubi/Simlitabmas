import { Badge } from "@mantine/core";
import { proposal_suggestion_status } from "prisma/interfaces";
import React from "react";

interface ProposalSuggestionStatusProps {
  status: proposal_suggestion_status | null | ""; // Menangani nilai null atau string kosong
}

const statusColors: Record<proposal_suggestion_status, string> = {
  tersimpan: "gray",
  menunggu: "yellow",
  ditolak: "red",
  diterima: "green",
  aktif: "blue",
  selesai: "teal",
};

const statusLabels: Record<proposal_suggestion_status, string> = {
  tersimpan: "Tersimpan",
  menunggu: "Menunggu",
  ditolak: "Ditolak",
  diterima: "Diterima",
  aktif: "Aktif",
  selesai: "Selesai",
};

const ProposalSuggestionStatusBadge: React.FC<ProposalSuggestionStatusProps> = ({ status }) => {
  const color = status ? statusColors[status] || "gray" : "gray";
  const label = status ? statusLabels[status] || "Tidak Diketahui" : "Tidak Diketahui";

  return <Badge color={color}>{label}</Badge>;
};

export default ProposalSuggestionStatusBadge;
