"use client";

import { ProposalSuggestionForm } from "./_form";

export default function ProposalSuggestionModal({ onClose, showResearchGroup, type }: { onClose: () => void; showResearchGroup?: boolean | undefined; type: string; }) {
  return <ProposalSuggestionForm onClose={onClose} showResearchGroup={showResearchGroup} type={type} />;
}
