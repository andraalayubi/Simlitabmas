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
import { lecturer } from "prisma/interfaces";
import useNotification from "src/components/notification/notification";
import reportAction from "src/action/reportAction";

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

type LecturerWithCount = lecturer & {
  _count: {
    lecturer_member: number;
    proposal_suggestion: number;
  };
};

type LecturerWithCountKey = keyof LecturerWithCount;

export default function LecturerRankingPage() {
  const user_type = "admin";
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<
    | LecturerWithCountKey
    | "totalScore"
    | "proposalCount"
    | "participationCount"
    | "ranking"
  >("totalScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [lecturers, setLecturers] = useState<LecturerWithCount[]>([]);

  const getLecturer = useCallback(async () => {
    const response = await reportAction.getLecturer(user_type, setLoading);

    if (response.success) {
      setLecturers(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getLecturer();
  }, [getLecturer]);

  // Get unique departments for filter
  const departments = Array.from(
    new Set(lecturers.map((lecturer) => lecturer.department?.name!))
  );

  // Calculate sorted scores for dynamic badge/label assignment
  const sortedScores = [
    ...lecturers.map((g) => g._count.proposal_suggestion),
  ].sort((a, b) => b - a);

  // Hitung peringkat tetap berdasarkan proposal_suggestion (descending)
  const rankingByProposal = [...lecturers]
    .sort((a, b) => b._count.proposal_suggestion - a._count.proposal_suggestion)
    .map((lecturer, idx) => ({ id: lecturer.id, rank: idx + 1 }));

  const rankMap = Object.fromEntries(
    rankingByProposal.map((item) => [item.id, item.rank])
  );

  // Filter and sort lecturers
  const filteredLecturers = lecturers
    .filter(
      (lecturer) =>
        lecturer.name.toLowerCase().includes(search.toLowerCase()) &&
        (!departmentFilter || lecturer.department?.name === departmentFilter)
    )
    .sort((a, b) => {
      let aValue, bValue;
      if (sortBy === "ranking") {
        aValue = rankMap[a.id];
        bValue = rankMap[b.id];
      } else if (sortBy === "proposalCount") {
        aValue = a._count.proposal_suggestion;
        bValue = b._count.proposal_suggestion;
      } else if (sortBy === "participationCount") {
        aValue = a._count.lecturer_member - a._count.proposal_suggestion;
        bValue = b._count.lecturer_member - b._count.proposal_suggestion;
      } else if (sortBy === "totalScore") {
        aValue = a._count.lecturer_member;
        bValue = b._count.lecturer_member;
      } else if (sortBy === "department") {
        aValue = a.department?.name;
        bValue = b.department?.name;
      } else {
        aValue = a[sortBy as keyof LecturerWithCount];
        bValue = b[sortBy as keyof LecturerWithCount];
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
      setSortBy(
        key as
          | LecturerWithCountKey
          | "totalScore"
          | "proposalCount"
          | "participationCount"
          | "ranking"
      );
      setSortOrder("desc");
    }
  };

  return (
    <Container size="xl" py="xl">
      <Skeleton visible={loading}>
        <Title order={1} mb="lg">
          Peringkat Performa Dosen Penelitian
        </Title>
      </Skeleton>

      {/* Top Performers */}
      <Paper withBorder p="md" mb="xl">
        <Skeleton visible={loading}>
          <Title order={3} mb="md">
            Performa Dosen Terbaik
          </Title>
        </Skeleton>
        <Skeleton visible={loading}>
          <Grid>
            {lecturers
              .sort(
                (a, b) => b._count.lecturer_member - a._count.lecturer_member
              )
              .slice(0, 3)
              .map((lecturer, index) => (
                <Grid.Col key={lecturer.id} span={{ base: 12, md: 4 }}>
                  <Card withBorder padding="lg" radius="md">
                    <Group justify="center" mb="md">
                      <RingProgress
                        size={120}
                        thickness={12}
                        sections={[
                          {
                            value: (lecturer._count.lecturer_member / 30) * 100,
                            color: getBadgeColor(
                              lecturer._count.proposal_suggestion,
                              sortedScores
                            ),
                          },
                        ]}
                        label={
                          <Text ta="center" fw={700} size="xl">
                            {lecturer._count.lecturer_member}
                          </Text>
                        }
                      />
                    </Group>
                    <Text ta="center" fw={500} size="lg">
                      {lecturer.name}
                    </Text>
                    <Text ta="center" c="dimmed" size="sm">
                      {lecturer.department?.name}
                    </Text>
                    <Group mt="md" justify="center">
                      <Badge
                        color={getBadgeColor(
                          lecturer._count.proposal_suggestion,
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
            placeholder="Cari dosen..."
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />

          <Select
            placeholder="Filter Departemen"
            data={departments.map((dept) => ({ value: dept, label: dept }))}
            value={departmentFilter}
            onChange={setDepartmentFilter}
            clearable
            style={{ width: 200 }}
          />

          <Select
            placeholder="Urutkan berdasarkan"
            data={[
              { value: "ranking", label: "Peringkat" },
              { value: "totalScore", label: "Skor Total" },
              { value: "proposalCount", label: "Jumlah Usulan" },
              { value: "participationCount", label: "Jumlah Partisipasi" },
            ]}
            value={sortBy}
            onChange={(value) => setSortBy(value as LecturerWithCountKey)}
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
                  Nama Dosen{" "}
                  {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </Table.Th>
                <Table.Th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("department")}
                >
                  Departemen{" "}
                  {sortBy === "department" && (sortOrder === "asc" ? "↑" : "↓")}
                </Table.Th>
                <Table.Th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("proposalCount")}
                >
                  Usulan Penelitian{" "}
                  {sortBy === "proposalCount" &&
                    (sortOrder === "asc" ? "↑" : "↓")}
                </Table.Th>
                <Table.Th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("participationCount")}
                >
                  Partisipasi Penelitian{" "}
                  {sortBy === "participationCount" &&
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
              {filteredLecturers.map((lecturer) => (
                <Table.Tr key={lecturer.id}>
                  <Table.Td>{rankMap[lecturer.id]}</Table.Td>
                  <Table.Td>{lecturer.name}</Table.Td>
                  <Table.Td>{lecturer.department?.name}</Table.Td>
                  <Table.Td>{lecturer._count.proposal_suggestion}</Table.Td>
                  <Table.Td>
                    {lecturer._count.lecturer_member -
                      lecturer._count.proposal_suggestion}
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Text fw={700}>{lecturer._count.lecturer_member}</Text>
                      <Progress
                        value={(lecturer._count.lecturer_member / 30) * 100}
                        color={getBadgeColor(
                          lecturer._count.proposal_suggestion,
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
                        lecturer._count.proposal_suggestion,
                        sortedScores
                      )}
                    >
                      {getPerformanceLabel(
                        lecturer._count.proposal_suggestion,
                        sortedScores
                      )}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {filteredLecturers.length === 0 && (
            <Text ta="center" py="xl" c="dimmed">
              Tidak ada data dosen yang sesuai dengan filter
            </Text>
          )}
        </Skeleton>
      </Paper>
    </Container>
  );
}
