"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, SimpleGrid, Text } from "@mantine/core";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { proposal_suggestion } from "prisma/interfaces";
import { Skeleton } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";

const DashboardLecturer: React.FC<{ columns: MRT_ColumnDef<proposal_suggestion>[] }> = ({ columns }) => {
  const user_type = "lecturer";

  const [usulan, setUsulan] = useState<proposal_suggestion[]>([]);
  const [usulanPenelitianCount, setUsulanPenelitianCount] = useState(0);
  const [usulanPengabdianCount, setUsulanPengabdianCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getProposalSuggestion = useCallback(async () => {
    const response = await proposalSuggestionAction.getDashboard(
      user_type,
      setLoading
    );
    
    if (response.success) {
      showNotification({ status: "success", message: response.message });
      console.log(response.data);
      
      setUsulan(response.data);
      setUsulanPenelitianCount(response.data.filter((p: proposal_suggestion) => p.research_group_id !== null).length);
      setUsulanPengabdianCount(response.data.filter((p: proposal_suggestion) => p.research_group_id === null).length);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getProposalSuggestion();
  }, [getProposalSuggestion]);

  return (
    <Skeleton visible={loading}>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mb="lg">
        <Card shadow="sm" padding="lg">
          <Text size="xl" fw={700} ta="center">
            {usulan.length}
          </Text>
          <Text ta="center">Usulan Saya</Text>
        </Card>
        <Card shadow="sm" padding="lg">
          <Text size="xl" fw={700} ta="center">
            {usulanPenelitianCount}
          </Text>
          <Text ta="center">Usulan Penelitian Saya</Text>
        </Card>
        <Card shadow="sm" padding="lg">
          <Text size="xl" fw={700} ta="center">
            {usulanPengabdianCount}
          </Text>
          <Text ta="center">Usulan Pengabdian Saya</Text>
        </Card>
      </SimpleGrid>
      <Card shadow="sm" padding="lg">
        <Text size="lg" fw={500} mb="md">
          Usulan Terbaru
        </Text>
        <MantineReactTable columns={columns} data={usulan} />
      </Card>
    </Skeleton>
  );
};

export default DashboardLecturer;
