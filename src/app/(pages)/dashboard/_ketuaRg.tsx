"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Text,
} from "@mantine/core";
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
import { IconChecklist, IconHelp, IconTrendingUp } from "@tabler/icons-react";
import { LineChart } from "@mantine/charts";
import yearResearchAction from "src/action/yearResearchAction";


function DashboardKetuaRG() {
  const user_type = "ketua_rg";
  const { showNotification } = useNotification();
  const [usulan, setUsulan] = useState<proposal_suggestion[]>([]);
  const [suggestionsPerYear, setSuggestionsPerYear] = useState([]);
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

  const getYearResearches = useCallback(async () => {
    const response = await yearResearchAction.getYearResearchesSummary(
      user_type,
      setLoading
    );

    if (response.success) {
      setSuggestionsPerYear(response.data);
    }
  }, [user_type]);

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
    getYearResearches();
    getProposalSuggestion();
  }, [getYearResearches, getProposalSuggestion]);

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

      {/* Chart */}
      <Card padding="lg" shadow="sm">
        <Box mb="sm">
          <Skeleton visible={loading}>
            <Group align="center" mb="xs">
              <IconTrendingUp size={20} />
              <Text fw={600} size="lg">
                Penelitian Tahunan
              </Text>
            </Group>
          </Skeleton>

          <Skeleton visible={loading}>
            <Paper withBorder p="md" radius="md">
              <LineChart
                h={300}
                withLegend
                data={suggestionsPerYear}
                dataKey="year.year"
                curveType="linear"
                series={[{ name: "count", label: "Jumlah penelitian" }]}
                type="default"
              ></LineChart>
            </Paper>
          </Skeleton>
        </Box>
      </Card>

      {/* Table */}
      <Card shadow="sm" padding="lg">
        <Group align="center" mb="xs">
          <IconChecklist size={20} />
          <Text size="lg" fw={500}>
            Usulan yang Perlu Ditindaklanjuti
          </Text>
        </Group>
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
