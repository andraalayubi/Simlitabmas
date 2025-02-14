"use client";

import { AnggotaForm } from "./_form";

export default function AnggotaModal({ onClose, usulanId }: { onClose: () => void; usulanId: string; }) {
  return <AnggotaForm onClose={onClose} usulanId={usulanId} />;
}
