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
  Skeleton,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { department } from "prisma/interfaces";
import useNotification from "src/components/notification/notification";
import departmentAction from "src/action/departmentAction";

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

export default function DepartmentRankingPage() {
  const user_type = "admin";
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<any>("totalScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [departments, setDepartments] = useState<any[]>([]);

  const getDepartment = useCallback(async () => {
    const response = await departmentAction.getDepartment(
      user_type,
      setLoading
    );

    if (response.success) {
      setDepartments(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getDepartment();
  }, [getDepartment]);

  // Calculate sorted scores for dynamic badge/label assignment
  const sortedScores = [
    ...departments.map((d) => d.proposal_suggestion_count),
  ].sort((a, b) => b - a);

  // Hitung peringkat tetap berdasarkan proposal_suggestion (descending)
  const rankingByProposal = [...departments]
    .sort((a, b) => b.proposal_suggestion_count - a.proposal_suggestion_count)
    .map((group, idx) => ({ id: group.id, rank: idx + 1 }));

  const rankMap = Object.fromEntries(
    rankingByProposal.map((item) => [item.id, item.rank])
  );

  // Filter and sort departments
  const filteredGroups = departments
    .filter((department) =>
      department.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue;
      if (sortBy === "ranking") {
        aValue = rankMap[a.id];
        bValue = rankMap[b.id];
      } else if (sortBy === "totalScore" || sortBy === "proposalCount") {
        aValue = a.proposal_suggestion_count;
        bValue = b.proposal_suggestion_count;
      } else {
        aValue = a[sortBy as keyof department];
        bValue = b[sortBy as keyof department];
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
          Peringkat Performa Program Studi
        </Title>
      </Skeleton>

      {/* Top Performers */}
      <Paper withBorder p="md" mb="xl">
        <Skeleton visible={loading}>
          <Title order={3} mb="md">
            Program Studi Terbaik
          </Title>
        </Skeleton>
        <Skeleton visible={loading}>
          <Grid>
            {departments
              .sort(
                (a, b) =>
                  b.proposal_suggestion_count - a.proposal_suggestion_count
              )
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
                            value:
                              (group.proposal_suggestion_count / 40) * 100,
                            color: getBadgeColor(
                              group.proposal_suggestion_count,
                              sortedScores
                            ),
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
                      <Badge
                        color={getBadgeColor(
                          group.proposal_suggestion_count,
                          sortedScores
                        )}
                        size="lg"
                      >
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
          <TextInput
            placeholder="Cari program studi..."
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />

          <Select
            placeholder="Urutkan berdasarkan"
            data={[
              { value: "ranking", label: "Peringkat" },
              { value: "proposalCount", label: "Jumlah Usulan" },
              { value: "totalScore", label: "Skor Total" },
            ]}
            value={sortBy}
            onChange={(value) => {
              if (value)
                setSortBy(value);
            }}
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
      </Skeleton>

      {/* Main Table */}
      <Paper withBorder p="md">
        <Skeleton visible={loading}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("ranking")}
                >
                  Peringkat{" "}
                  {sortBy === "ranking" && (sortOrder === "asc" ? "↑" : "↓")}
                </Table.Th>
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
                  Jumlah Usulan{" "}
                  {sortBy === "proposalCount" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
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
              {filteredGroups.map((group) => (
                <Table.Tr key={group.id}>
                  <Table.Td>{rankMap[group.id]}</Table.Td>
                  <Table.Td>{group.name}</Table.Td>
                  <Table.Td>{group.proposal_suggestion_count}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Text fw={700}>{group.proposal_suggestion_count}</Text>
                      <Progress
                        value={(group.proposal_suggestion_count / 40) * 100}
                        color={getBadgeColor(
                          group.proposal_suggestion_count,
                          sortedScores
                        )}
                        size="sm"
                        w={60}
                      />
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={getBadgeColor(
                        group.proposal_suggestion_count,
                        sortedScores
                      )}
                    >
                      {getPerformanceLabel(
                        group.proposal_suggestion_count,
                        sortedScores
                      )}
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
        </Skeleton>
      </Paper>
    </Container>
  );
}
