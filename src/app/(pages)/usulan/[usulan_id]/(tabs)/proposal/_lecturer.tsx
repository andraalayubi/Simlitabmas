"use client";

import AbstractTextEditor from "@/app/components/usulan/proposal/Abstract";
import BackgroundTextEditor from "@/app/components/usulan/proposal/Background";
import BibliographyTextEditor from "@/app/components/usulan/proposal/Bibliography";
import LiteratureReviewTextEditor from "@/app/components/usulan/proposal/LiteratureReview";
import MethodTextEditor from "@/app/components/usulan/proposal/Method";
import NameTextEditor from "@/app/components/usulan/proposal/Name";
import PurposeTextEditor from "@/app/components/usulan/proposal/Purpose";
import { Group, Button, Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import { proposal, proposal_suggestion } from "prisma/interfaces";
import React, { useEffect, useState } from "react";

const ProposalLecturer = () => {
  const user_type = "dosen";
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = params.usulan_id;
  const [proposal, setProposal] = useState<proposal | null>(null);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);

  const getProposal = async () => {
    try {
      const response = await fetch(`/api/${user_type}/proposal/${usulan_id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const data: proposal_suggestion = result.data;

      setProposalSuggestion(data);
      setProposal(data.proposal || null);
      console.log("proposal", data);
    } catch (error) {
      console.error("Error fetching proposal data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProposal();
  }, []);

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Buat Proposal</h2>
        <form onSubmit={() => {}}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="abstrak"
            >
              Judul Proposal
            </label>
            <Skeleton visible={loading}>
              <NameTextEditor
                content={proposal?.name}
                proposal_id={proposal?.id ?? 0}
                disabled={false}
                user_type={user_type}
              />
            </Skeleton>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="abstrak"
            >
              Abstrak
            </label>
            <Skeleton visible={loading}>
              <AbstractTextEditor
                content={proposal?.abstract}
                proposal_id={proposal?.id ?? 0}
                disabled={false}
                user_type={user_type}
              />
            </Skeleton>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="latar-belakang"
            >
              Latar Belakang
            </label>
            <Skeleton visible={loading}>
              <BackgroundTextEditor
                content={proposal?.abstract}
                proposal_id={proposal?.id ?? 0}
                disabled={false}
                user_type={user_type}
              />
            </Skeleton>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tujuan"
            >
              Tujuan
            </label>
            <Skeleton visible={loading}>
              <PurposeTextEditor
                content={proposal?.purpose}
                proposal_id={proposal?.id ?? 0}
                disabled={false}
                user_type={user_type}
              />
            </Skeleton>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tujuan"
            >
              Metode
            </label>
            <Skeleton visible={loading}>
              <MethodTextEditor
                content={proposal?.method}
                proposal_id={proposal?.id ?? 0}
                disabled={false}
                user_type={user_type}
              />
            </Skeleton>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tujuan"
            >
              Tinjauan Literatur
            </label>
            <Skeleton visible={loading}>
              <LiteratureReviewTextEditor
                content={proposal?.literature_review}
                proposal_id={proposal?.id ?? 0}
                disabled={false}
                user_type={user_type}
              />
            </Skeleton>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tujuan"
            >
              Daftar Pustaka
            </label>
            <Skeleton visible={loading}>
              <BibliographyTextEditor
                content={proposal?.bibliography}
                proposal_id={proposal?.id ?? 0}
                disabled={false}
                user_type={user_type}
              />
            </Skeleton>
          </div>
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default ProposalLecturer;
