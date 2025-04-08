"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, SimpleGrid, Text } from "@mantine/core";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { proposal_suggestion } from "prisma/interfaces";
import { showNotification } from "@mantine/notifications";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";

const DashboardKaprodi: React.FC<{ columns: MRT_ColumnDef<proposal_suggestion>[] }> = ({ columns }) => {
  const user_type = "kaprodi";

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
    <div>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg" mb="lg">
        <Card shadow="sm" padding="lg">
          <Text size="xl" fw={700} ta="center">
            {usulan.length}
          </Text>
          <Text ta="center">Usulan</Text>
        </Card>
        <Card shadow="sm" padding="lg">
          <Text size="xl" fw={700} ta="center">
            {usulanPengabdianCount}
          </Text>
          <Text ta="center">Usulan Pengabdian Masyarakat</Text>
        </Card>
        {/* <Card shadow="sm" padding="lg">
          <Text size="xl" fw={700} ta="center">
            1
          </Text>
          <Text ta="center">Total Semua Usulan</Text>
        </Card> */}
      </SimpleGrid>
      <Card shadow="sm" padding="lg">
        <Text size="lg" fw={500} mb="md">
          Usulan Terbaru
        </Text>
        <MantineReactTable columns={columns} data={usulan} />
      </Card>
    </div>
  );
};

export default DashboardKaprodi;
