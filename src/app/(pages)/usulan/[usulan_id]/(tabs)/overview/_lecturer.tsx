import React, { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, Text } from "@mantine/core";
import TableOverview from "src/components/usulan/overview/TableOverview";
import { SessionPayload } from "src/lib/encrypt";
import { Skeleton } from "@mantine/core";
import { useParams } from "next/navigation";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import useNotification from "src/components/notification/notification";
import { proposal_suggestion } from "prisma/interfaces";

interface OverviewLecturerProps {
  session: SessionPayload;
}

const OverviewLecturer: React.FC<OverviewLecturerProps> = ({ session }) => {
  const user_type = "lecturer";
  const [loading, setLoading] = useState(true);
  const [proposalSuggestion, setProposalSuggestion] =
  useState<proposal_suggestion | null>(null);

  const { showNotification } = useNotification();
  const params = useParams();
  const usulan_id = params.usulan_id[0];

  const getProposalSuggestion = useCallback(async () => {
    const response = await proposalSuggestionAction.getById(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      console.log(response.data);
      
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
    setLoading(false);
  }, [usulan_id, user_type]);

  useEffect(() => {
    getProposalSuggestion();
  }, [getProposalSuggestion]);

  return (
    <Skeleton visible={loading}>
      <Card shadow="sm" padding="lg" mb="lg">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Ringkasan Usulan</h2>
          <div className="flex space-x-4">
            <Button color="green">Ajukan Usulan</Button>
            <Button color="blue">Simpan Usulan</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Text>Status Usulan:</Text> <Badge color="green">Diisi</Badge>
          <Text>Judul Usulan:</Text>
          <Text>
            {proposalSuggestion?.name}
          </Text>
          <Text>Skema Penelitian:</Text> <Text>{proposalSuggestion?.schema?.name}</Text>
          <Text>Tahun:</Text> <Text>{proposalSuggestion?.year_research?.year}</Text>
          <Text>Studi Program:</Text> <Text>Teknik Informatika</Text>
          <Text>Komentar:</Text> <Text>Proposal kurang lengkap dan jelas</Text>
        </div>
        <TableOverview />
      </Card>
    </Skeleton>
  );
};

export default OverviewLecturer;