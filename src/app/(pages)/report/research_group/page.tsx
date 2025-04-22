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
  Progress,
  Grid,
  RingProgress,
  Card,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { research_group } from "prisma/interfaces";
import reportAction from "src/action/reportAction";
import useNotification from "src/components/notification/notification";

// Function to get badge color based on dynamic top scores
const getBadgeColor = (score: number, topScores: number[]) => {
  if (topScores.slice(0, 3).includes(score)) return "green";
  if (topScores.slice(3, 6).includes(score)) return "blue";
  if (topScores.slice(6, 9).includes(score)) return "yellow";
  return "red";
};

// Function to get performance label based on dynamic top scores
const getPerformanceLabel = (score: number, topScores: number[]) => {
  if (topScores.slice(0, 3).includes(score)) return "Excellent";
  if (topScores.slice(3, 6).includes(score)) return "Good";
  if (topScores.slice(6, 9).includes(score)) return "Average";
  return "Needs Improvement";
};

type ResearchGroupWithCount = research_group & {
  _count: {
    proposal_suggestion: number;
  };
};

export default function ResearchGroupRankingPage() {
  const user_type = "admin";
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | null>("totalScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(false);
  const [researchGroups, setResearchGroups] = useState<
    ResearchGroupWithCount[]
  >([]);
  const { showNotification } = useNotification();
  console.log(sortBy, sortOrder);
  

  const getResearchGroup = useCallback(async () => {
    const response = await reportAction.getResearchGroup(user_type, setLoading);

    if (response.success) {
      setResearchGroups(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getResearchGroup();
  }, [getResearchGroup]);

  // Calculate sorted scores for dynamic badge/label assignment
  const sortedScores = [...researchGroups.map((g) => g._count.proposal_suggestion)].sort((a, b) => b - a);

  // Filter and sort research groups
  const filteredGroups = researchGroups
    .filter((group) =>
      group.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortBy) return 0;

      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];

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

  // Handle sort change
  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="lg">
        Peringkat Performa Research Group
      </Title>

      {/* Top Performers */}
      <Paper withBorder p="md" mb="xl">
        <Title order={3} mb="md">
          Research Group Terbaik
        </Title>
        <Grid>
          {researchGroups
            .sort((a, b) => b._count.proposal_suggestion - a._count.proposal_suggestion)
            .slice(0, 3)
            .map((group, index) => (
              <Grid.Col key={group.id} span={{ base: 12, md: 4 }}>
                <Card withBorder padding="lg" radius="md">
                  <Group justify="center" mb="md">
                    <RingProgress
                      size={120}
                      thickness={12}
                      sections={[
                        {
                          value: (group._count.proposal_suggestion / 40) * 100,
                          color: getBadgeColor(group._count.proposal_suggestion, sortedScores),
                        },
                      ]}
                      label={
                        <Text ta="center" fw={700} size="xl">
                          {group._count.proposal_suggestion}
                        </Text>
                      }
                    />
                  </Group>
                  <Text ta="center" fw={500} size="lg">
                    {group.name}
                  </Text>
                  <Group mt="md" justify="center">
                    <Badge color={getBadgeColor(group._count.proposal_suggestion, sortedScores)} size="lg">
                      Peringkat #{index + 1}
                    </Badge>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
        </Grid>
      </Paper>

      {/* Filters */}
      <Group mb="md">
        <TextInput
          placeholder="Cari research group..."
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          style={{ flex: 1 }}
        />

        <Select
          placeholder="Urutkan berdasarkan"
          data={[
            { value: "totalScore", label: "Skor Total" },
          ]}
          value={sortBy}
          onChange={setSortBy}
          style={{ width: 200 }}
        />

        <Select
          placeholder="Urutan"
          data={[
            { value: "desc", label: "Tertinggi ke Terendah" },
            { value: "asc", label: "Terendah ke Tertinggi" },
          ]}
          value={sortOrder}
          onChange={(value) => setSortOrder(value as "asc" | "desc")}
          style={{ width: 200 }}
        />
      </Group>

      {/* Main Table */}
      <Paper withBorder p="md">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Peringkat</Table.Th>
              <Table.Th
                style={{ cursor: "pointer" }}
                onClick={() => handleSortChange("name")}
              >
                Nama Research Group{" "}
                {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </Table.Th>
              <Table.Th
                style={{ cursor: "pointer" }}
                onClick={() => handleSortChange("totalScore")}
              >
                Skor Total{" "}
                {sortBy === "totalScore" && (sortOrder === "asc" ? "↑" : "↓")}
              </Table.Th>
              <Table.Th>Performa</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredGroups.map((group, index) => (
              <Table.Tr key={group.id}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{group.name}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Text fw={700}>{group._count.proposal_suggestion}</Text>
                    <Progress
                      value={(group._count.proposal_suggestion / 40) * 100}
                      color={getBadgeColor(group._count.proposal_suggestion, sortedScores)}
                      size="sm"
                      w={60}
                    />
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge color={getBadgeColor(group._count.proposal_suggestion, sortedScores)}>
                    {getPerformanceLabel(group._count.proposal_suggestion, sortedScores)}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {filteredGroups.length === 0 && (
          <Text ta="center" py="xl" c="dimmed">
            Tidak ada data research group yang sesuai dengan filter
          </Text>
        )}
      </Paper>
    </Container>
  );
}
