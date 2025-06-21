"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Table,
  Badge,
  TextInput,
  Group,
  Text,
  Paper,
  Container,
  Title,
  Select,
  Grid,
  RingProgress,
  Card,
  Skeleton,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { research_group } from "prisma/interfaces";
import useNotification from "src/components/notification/notification";
import reportAction from "src/action/reportAction";
import yearResearchAction from "src/action/yearResearchAction";
import { BarChart } from "@mantine/charts";

// Function to get badge color based on dynamic top scores
const getBadgeColor = (index: number) => {
  if (index === 0) return "green";
  if (index === 1) return "blue";
  if (index === 2) return "yellow";
  return "red";
};

const transformData = <
  T extends {
    [x: string]: any;
    id: number;
  }
>(
  data: T[],
  labelExtractor: (item: T) => string = (item: any) => item.name || item.year
): { value: string; label: string }[] => {
  return data.map((item) => ({
    value: item.id.toString(),
    label: labelExtractor(item),
  }));
};

export default function ResearchGroupRankingPage() {
  const user_type = "admin";
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "chart">("list");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<any>("totalScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [researchGroups, setResearchGroups] = useState<any[]>([]);
  const [yearResearches, setYearResearches] = useState<
    { value: string; label: string }[]
  >([]);

  // State untuk filter
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const getYearResearches = useCallback(async () => {
    const response = await yearResearchAction.getYearResearches(
      user_type,
      setLoading,
      null
    );

    if (response.success) {
      const transformedYearResearches = transformData(
        response.data,
        (yearResearch) => yearResearch.year.toString()
      );
      setYearResearches(transformedYearResearches);
    }
  }, []);

  const getResearchGroup = useCallback(async () => {
    const filter: any = {};

    if (selectedYear) {
      filter.year_research_id = selectedYear;
    }

    const response = await reportAction.getResearchGroup(
      user_type,
      setLoading,
      filter
    );

    if (response.success) {
      setResearchGroups(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, selectedYear]);

  useEffect(() => {
    getYearResearches();
    getResearchGroup();
  }, [getYearResearches, getResearchGroup]);

  // Hitung peringkat tetap berdasarkan proposal_suggestion (descending)
  const rankingByProposal = [...researchGroups]
    .sort((a, b) => b.proposal_suggestion_count - a.proposal_suggestion_count)
    .map((group, idx) => ({ id: group.id, rank: idx + 1 }));

  const rankMap = Object.fromEntries(
    rankingByProposal.map((item) => [item.id, item.rank])
  );

  // Filter and sort research groups
  const filteredGroups = researchGroups
    .filter((group) => group.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let aValue, bValue;
      if (sortBy === "ranking") {
        aValue = rankMap[a.id];
        bValue = rankMap[b.id];
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (sortBy === "totalScore" || sortBy === "proposalCount") {
        aValue = a.proposal_suggestion_count;
        bValue = b.proposal_suggestion_count;
      } else {
        aValue = a[sortBy as keyof research_group];
        bValue = b[sortBy as keyof research_group];
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

  const topResearchGroup = [...researchGroups]
    .sort((a, b) => b.proposal_suggestion_count - a.proposal_suggestion_count)
    .slice(0, 3);

  const handleSortChange = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };

  return (
    <Container size="xl" py="xl">
      <Skeleton visible={loading}>
        <Title order={1} mb="lg">
          Laporan Performa Penelitian Research Group
        </Title>
      </Skeleton>

      {/* Top Performers */}
      <Paper withBorder p="md" mb="xl">
        <Skeleton visible={loading}>
          <Title order={3} mb="md">
            Research Group Terbaik
          </Title>
        </Skeleton>
        <Skeleton visible={loading}>
          <Grid>
            {topResearchGroup.map((group, index) => (
              <Grid.Col key={group.id} span={{ base: 12, md: 4 }}>
                <Card withBorder padding="lg" radius="md">
                  <Group justify="center" mb="md">
                    <RingProgress
                      size={120}
                      thickness={12}
                      sections={[
                        {
                          value: 100,
                          color: getBadgeColor(index),
                        },
                      ]}
                      label={
                        <Text ta="center" fw={700} size="xl">
                          {group.proposal_suggestion_count}
                        </Text>
                      }
                    />
                  </Group>
                  <Text ta="center" fw={500} size="lg">
                    {group.name}
                  </Text>
                  <Group mt="md" justify="center">
                    <Badge color={getBadgeColor(index)} size="lg">
                      Peringkat #{index + 1}
                    </Badge>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Skeleton>
      </Paper>

      {/* Filters */}
      <Skeleton visible={loading}>
        <Group mb="md">
          <Text ta="center" fw={500} size="lg">
            Tipe Tampilan :
          </Text>
          <Select
            placeholder="Tipe Tampilan"
            data={[
              { value: "list", label: "Daftar" },
              { value: "chart", label: "Grafik Batang" },
            ]}
            value={viewMode}
            onChange={(value) => {
              if (value === "list" || value === "chart") {
                setViewMode(value);
              }
            }}
            style={{ width: 200 }}
          />
        </Group>
        <Group mb="md">
          <TextInput
            placeholder="Cari research group..."
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />

          <Select
            placeholder="Filter Tahun"
            data={yearResearches}
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            clearable
            style={{ width: 250 }}
          />
        </Group>
      </Skeleton>

      {/* Main Table */}

      {/* check view mode */}
      {viewMode === "list" ? (
        <Paper withBorder p="md">
          <Skeleton visible={loading}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>No </Table.Th>
                  <Table.Th
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSortChange("name")}
                  >
                    Nama Research Group{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </Table.Th>
                  <Table.Th
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSortChange("proposalCount")}
                  >
                    Jumlah Penelitian{" "}
                    {sortBy === "proposalCount" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredGroups.map((group) => (
                  <Table.Tr key={group.id}>
                    <Table.Td>{rankMap[group.id]}</Table.Td>
                    <Table.Td>{group.name}</Table.Td>
                    <Table.Td>{group.proposal_suggestion_count}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            {filteredGroups.length === 0 && (
              <Text ta="center" py="xl" c="dimmed">
                Tidak ada data research group yang sesuai dengan filter
              </Text>
            )}
          </Skeleton>
        </Paper>
      ) : (
        <>
          <Paper withBorder p="lg">
            <Skeleton visible={loading}>
              <Title order={3} mb="lg">
                Grafik Jumlah Penelitian per Research Group
              </Title>
              {filteredGroups.length > 0 ? (
                <BarChart
                  h={300}
                  data={filteredGroups.map((group) => ({
                    penelitian: group.proposal_suggestion_count,
                    name: group.name,
                  }))}
                  dataKey="name"
                  type="default"
                  series={[{ name: "penelitian", color: "blue" }]}
                  withTooltip
                  tickLine="x"
                  gridAxis="xy"
                  yAxisProps={{ domain: [0, 2] }}
                  withBarValueLabel
                  xAxisProps={{
                    tickFormatter: (value) =>
                      value.length > 7
                        ? `${value.substring(0, 12)}...`
                        : value,
                  }}
                />
              ) : (
                <Text ta="center" py="xl" c="dimmed">
                  Tidak ada data research group yang sesuai dengan filter
                </Text>
              )}
            </Skeleton>
          </Paper>
        </>
      )}
    </Container>
  );
}
