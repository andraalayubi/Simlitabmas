"use client";

import DaftarProposal from "@/app/components/usulan/proposal/CreateProposal";
import React, { useState } from "react";

interface Proposal {
  title: string;
  abstrak: string;
  latarBelakang: string;
  tujuan: string;
}

const ProposalKaprodi = () => {
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<Proposal>({
    title: "",
    abstrak: "",
    latarBelakang: "",
    tujuan: "",
  });

  //Proposal Handler
  const handleChange = (field: keyof Proposal, value: string) => {
    setProposal((prevProposal) => ({
      ...prevProposal,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("api/usulan", {
        method: "POST",
        body: JSON.stringify(proposal),
      });

      const data = await response.json();
    } catch (error) {
      console.error("There was an error submitting the proposal!", error);
    }
  };

  return (
    <>
      <DaftarProposal
        proposal={proposal}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ProposalKaprodi;
