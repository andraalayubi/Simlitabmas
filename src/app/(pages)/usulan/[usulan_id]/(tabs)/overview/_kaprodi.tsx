import React, { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, Text } from "@mantine/core";
import TableOverview from "src/components/usulan/overview/TableOverview";
import { SessionPayload } from "src/lib/encrypt";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import useNotification from "src/components/notification/notification";
import { proposal_suggestion } from "prisma/interfaces";
import DrawerProposalSuggestion from "src/components/drawer/ProposalSuggestionDrawer";
import ProposalSuggestionPhaseBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionPhaseBadge";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";

const OverviewKaprodi = () => {
  const user_type = "kaprodi";
  const [loading, setLoading] = useState(true);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);

  const { showNotification } = useNotification();
  const params = useParams();
  const usulan_id = params.usulan_id as string;

  const getProposalSuggestion = useCallback(async () => {
    const response = await proposalSuggestionAction.getById(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
    setLoading(false);
  }, [usulan_id, user_type]);

  // close drawer and refetch data
  const handleSuccess = useCallback(() => {
    getProposalSuggestion();
    setDrawerOpened(false);
  }, [getProposalSuggestion]);

  useEffect(() => {
    getProposalSuggestion();
  }, [getProposalSuggestion]);
  console.log(proposalSuggestion);

  return (
    <>
      {proposalSuggestion && (
        <DrawerProposalSuggestion
          user_type={user_type}
          proposal_suggestion={proposalSuggestion}
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          editable={false}
          loading={loading}
          onSuccess={handleSuccess}
        />
      )}
      <Skeleton visible={loading}>
        <Card shadow="sm" padding="lg" mb="lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Ringkasan Usulan</h2>
            <div className="flex space-x-4">
              <Button color="blue" onClick={() => setDrawerOpened(true)}>
                Proses Usulan
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Text>Status Usulan:</Text>{" "}
            <ProposalSuggestionStatusBadge
              status={proposalSuggestion?.status!}
            />
            <Text>Tahap Usulan:</Text>{" "}
            <ProposalSuggestionPhaseBadge phase={proposalSuggestion?.phase!} />
            <Text>Judul Usulan:</Text>
            <Text>{proposalSuggestion?.name}</Text>
            <Text>Skema Penelitian:</Text>{" "}
            <Text>{proposalSuggestion?.schema?.name}</Text>
            <Text>Tahun:</Text>{" "}
            <Text>{proposalSuggestion?.year_research?.year}</Text>
            <Text>Studi Program:</Text>{" "}
            <Text>{proposalSuggestion?.department?.name}</Text>
          </div>
          {/* <TableOverview /> */}
        </Card>
      </Skeleton>
    </>
  );
};

export default OverviewKaprodi;
