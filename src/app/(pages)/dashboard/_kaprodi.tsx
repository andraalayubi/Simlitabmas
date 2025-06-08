"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Card, SimpleGrid, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import {
  proposal_suggestion,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import useNotification from "src/components/notification/notification";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import TableLayout from "src/components/table/tableLayout";
import ProposalSuggestionPhaseBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionPhaseBadge";
import ProposalSuggestionStatusBadge from "src/components/badge/proposal_suggestion/ProposalSuggestionStatusBadge";

function DashboardKaprodi() {
  const user_type = "kaprodi";

  const [usulan, setUsulan] = useState<proposal_suggestion[]>([]);
  const { showNotification } = useNotification();
  const [usulanPengabdianCount, setUsulanPengabdianCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const columns = React.useMemo<MRT_ColumnDef<proposal_suggestion>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Judul Pengmas",
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
      setUsulanPengabdianCount(response.data.count_in_department);
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
          <Text ta="center">Usulan di Program Studi</Text>
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

export default DashboardKaprodi;
