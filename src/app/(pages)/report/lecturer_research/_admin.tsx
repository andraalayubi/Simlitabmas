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
import { lecturer } from "prisma/interfaces";
import useNotification from "src/components/notification/notification";
import reportAction from "src/action/reportAction";
import yearResearchAction from "src/action/yearResearchAction";
import researchGroupAction from "src/action/researchGroupAction";

// Function to get badge color based on dynamic top scores
const getBadgeColor = (index: number) => {
  if (index === 0) return "green";
  if (index === 1) return "blue";
  if (index === 2) return "yellow";
  return "red";
};

type LecturerWithCount = lecturer & {
  _count: {
    lecturer_member: number;
    proposal_suggestion: number;
  };
};

type LecturerWithCountKey = keyof LecturerWithCount;

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

export default function LecturerResearchRankingAdminPage() {
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
  >("participationCount"); // Default sort by participation
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default descending
  const [yearResearches, setYearResearches] = useState<
    { value: string; label: string }[]
  >([]);
  const [researchGroups, setResearchGroups] = useState<
    { value: string; label: string }[]
  >([]);
  const [lecturers, setLecturers] = useState<LecturerWithCount[]>([]);

  // State untuk filter
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedResearchGroup, setSelectedResearchGroup] = useState<
    string | null
  >(null);

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
    const response = await researchGroupAction.getResearchGroup(
      user_type,
      setLoading
    );

    if (response.success) {
      const transformedResearchGroups = transformData(response.data);
      setResearchGroups(transformedResearchGroups);
    }
  }, []);

  const getLecturers = useCallback(async () => {
    // Bangun objek filter berdasarkan state yang dipilih
    const filter: any = {};

    if (selectedYear) {
      filter.year_research_id = selectedYear;
    }

    if (selectedResearchGroup) {
      filter.research_group_id = selectedResearchGroup;
    }

    filter.type = "penelitian";

    const response = await reportAction.getLecturerResearch(
      user_type,
      setLoading,
      filter
    );

    if (response.success) {
      setLecturers(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, selectedYear, selectedResearchGroup]); // Tambahkan dependency

  useEffect(() => {
    getYearResearches();
    getResearchGroup();
    getLecturers();
  }, [getYearResearches, getResearchGroup, getLecturers]);

  // Filter dan sort lecturers (local filtering hanya untuk search)
  const filteredLecturers = lecturers
    .filter((lecturer) =>
      lecturer.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue;
      if (sortBy === "proposalCount") {
        aValue = a._count.proposal_suggestion;
        bValue = b._count.proposal_suggestion;
      } else if (sortBy === "participationCount") {
        aValue = a._count.lecturer_member;
        bValue = b._count.lecturer_member;
      } else if (sortBy === "research_group") {
        aValue = a.research_group?.name;
        bValue = b.research_group?.name;
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

  // Top 3 lecturers sorted by participation (lecturer_member)
  const topLecturers = [...lecturers]
    .sort((a, b) => b._count.lecturer_member - a._count.lecturer_member)
    .slice(0, 3);

  const handleSortChange = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key as "proposalCount" | "participationCount");
      setSortOrder("desc");
    }
  };

  return (
    <Container size="xl" py="xl">
      <Skeleton visible={loading}>
        <Title order={1} mb="lg">
          Laporan Partisipasi Dosen pada Penelitian
        </Title>
      </Skeleton>

      {/* Top Performers */}
      <Paper withBorder p="md" mb="xl">
        <Skeleton visible={loading}>
          <Title order={3} mb="md">
            Partisipasi Dosen Terbaik
          </Title>
        </Skeleton>
        <Skeleton visible={loading}>
          <Grid>
            {topLecturers.map((lecturer, index) => (
              <Grid.Col key={lecturer.id} span={{ base: 12, md: 4 }}>
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
                          {lecturer._count.lecturer_member}
                        </Text>
                      }
                    />
                  </Group>
                  <Text ta="center" fw={500} size="lg">
                    {lecturer.name}
                  </Text>
                  <Text ta="center" c="dimmed" size="sm">
                    {lecturer.research_group?.name}
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
          <TextInput
            placeholder="Cari dosen..."
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
            style={{ width: 150 }}
          />

          <Select
            placeholder="Filter Research Group"
            data={researchGroups}
            value={selectedResearchGroup}
            onChange={(value) => setSelectedResearchGroup(value)}
            clearable
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
                <Table.Th>No </Table.Th>
                <Table.Th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("name")}
                >
                  Nama Dosen{" "}
                  {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </Table.Th>
                <Table.Th>Jabatan </Table.Th>
                <Table.Th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("department")}
                >
                  Research Group{" "}
                  {sortBy === "department" && (sortOrder === "asc" ? "↑" : "↓")}
                </Table.Th>
                <Table.Th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSortChange("proposalCount")}
                >
                  Penelitian Diajukan{" "}
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
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredLecturers.map((lecturer, index) => (
                <Table.Tr key={lecturer.id}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{lecturer.name}</Table.Td>
                  <Table.Td>{lecturer.position?.name}</Table.Td>
                  <Table.Td>{lecturer.research_group?.name}</Table.Td>
                  <Table.Td>{lecturer._count.proposal_suggestion}</Table.Td>
                  <Table.Td>
                    <Text fw={700}>{lecturer._count.lecturer_member}</Text>
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
