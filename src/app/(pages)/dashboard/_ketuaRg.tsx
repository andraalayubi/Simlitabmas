"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, SimpleGrid, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import {
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import TableLayout from "src/components/table/tableLayout";
import useNotification from "src/components/notification/notification";
import ProposalSuggestionPhaseBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionPhaseBadge";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";

function DashboardKetuaRG() {
  const user_type = "ketua_rg";
  const { showNotification } = useNotification();
  const [usulan, setUsulan] = useState<proposal_suggestion[]>([]);
  const [usulanRgCount, setUsulanRgCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo<MRT_ColumnDef<proposal_suggestion>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Judul Penelitian",
        size: 250,
      },
      {
        accessorFn: (row) => row.schema?.name,
        header: "Skema",
        size: 100,
      },
      {
        accessorKey: "lecturer.name",
        header: "Pengusul",
        size: 150,
      },
      {
        accessorKey: "phase",
        header: "Tahap Usulan",
        Cell: ({ cell }) => (
          <ProposalSuggestionPhaseBadge
            phase={cell.getValue<proposal_suggestion_phase>()}
          />
        ),
      },
      {
        accessorKey: "status",
        header: "Status Usulan",
        Cell: ({ cell }) => (
          <ProposalSuggestionStatusBadge
            status={cell.getValue<proposal_suggestion_status>()}
          />
        ),
      },
    ],
    []
  );

  const getProposalSuggestion = useCallback(async () => {
    const response = await proposalSuggestionAction.getDashboard(
      user_type,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });

      setUsulan(response.data.list);
      setUsulanRgCount(response.data.count_in_research_group);
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
            {usulanRgCount}
          </Text>
          <Text ta="center">Usulan di Research Group</Text>
        </Card>
      </SimpleGrid>
      <Card shadow="sm" padding="lg">
        <Text size="lg" fw={500} mb="md">
          Usulan yang Perlu Ditindaklanjuti
        </Text>
        <TableLayout
          columns={columns}
          data={usulan}
          isLoading={loading}
          enableRowClick={true}
          getRowClickUrl={(row) => `/usulan/${row.id}`}
        />
      </Card>
    </div>
  );
}

export default DashboardKetuaRG;
