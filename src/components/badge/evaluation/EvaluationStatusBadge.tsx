import { Badge } from "@mantine/core";
import { evaluation_status } from "prisma/interfaces";
import React from "react";

interface EvaluationStatusProps {
  status: evaluation_status | null | ""; // Menangani nilai null atau string kosong
}

const statusColors: Record<evaluation_status, string> = {
  // Status dasar
  ditolak: "red",
  diterima: "green",
  selesai: "teal",
  // Status spesifik
  selesai_dengan_revisi: "cyan",
  menunggu_admin: "pink",
  menunggu_review: "yellow",
};

const statusLabels: Record<evaluation_status, string> = {
  ditolak: "Ditolak",
  diterima: "Diterima",
  selesai: "Selesai",
  selesai_dengan_revisi: "Selesai dengan Revisi",
  menunggu_admin: "Menunggu Admin",
  menunggu_review: "Menunggu Review",
};

const EvaluationStatusBadge: React.FC<EvaluationStatusProps> = ({ status }) => {
  const color = status ? statusColors[status] || "gray" : "gray";
  const label = status ? statusLabels[status] || "Tidak Diketahui" : "Tidak Diketahui";

  return <Badge color={color}>{label}</Badge>;
};

export default EvaluationStatusBadge;
