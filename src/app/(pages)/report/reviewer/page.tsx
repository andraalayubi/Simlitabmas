"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Group,
  Text,
  Paper,
  Container,
  Title,
  Select,
  Grid,
  Card,
  Skeleton,
} from "@mantine/core";
import { DonutChart, PieChart } from "@mantine/charts";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { reviewer } from "prisma/interfaces";
import useNotification from "src/components/notification/notification";
import reviewerAction from "src/action/reviewerAction";
import TableLayout from "src/components/table/tableLayout";
import React from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import PieChartComponent from "src/components/chart/PieChartComponent";

export default function ReviewerRekapPage() {
  const user_type = "admin";
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [reviewers, setReviewers] = useState<reviewer[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const columns = React.useMemo<MRT_ColumnDef<reviewer>[]>(
    () => [
      {
        header: "No",
        Cell: ({ row, table }) => {
          const rows = table.getRowModel().rows;
          const index = rows.findIndex((r) => r.id === row.id);
          return index + 1;
        },
        size: 50,
      },
      {
        accessorKey: "lecturer.name",
        header: "Nama Dosen",
        size: 150,
      },
      {
        accessorKey: "lecturer.nidn",
        header: "NIDN",
        size: 150,
      },
      {
        header: "Review Penelitian",
        accessorFn: (row) =>
          row.review?.filter(
            (r) =>
              (r.status === "ditolak" || r.status === "diterima") &&
              r.evaluation?.category === "penelitian"
          ).length ?? 0,
        Cell: ({ cell }) => <span>{cell.getValue<number>()}</span>,
        sortingFn: "basic", // opsional, karena sudah angka
        size: 100,
      },
      {
        header: "Review Pengmas",
        accessorFn: (row) =>
          row.review?.filter(
            (r) =>
              (r.status === "ditolak" || r.status === "diterima") &&
              r.evaluation?.category === "pengmas"
          ).length ?? 0,
        Cell: ({ cell }) => <span>{cell.getValue<number>()}</span>,
        sortingFn: "basic",
        size: 100,
      },
      {
        id: "total_review",
        header: "Total Review",
        accessorFn: (row) =>
          row.review?.filter(
            (r) => r.status === "ditolak" || r.status === "diterima"
          ).length ?? 0,
        Cell: ({ cell }) => <span>{cell.getValue<number>()}</span>,
        sortingFn: "basic",
        size: 100,
      },
    ],
    []
  );

  const getReviewer = useCallback(async () => {
    const response = await reviewerAction.getReviewers(user_type, setLoading, {
      get_lecturer: true,
      get_review: true,
    });

    if (response.success) {
      console.log(response.data);
      setReviewers(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  const years = useMemo(() => {
    const allYears = reviewers
      .flatMap((r) =>
        r.review?.map((rev) => new Date(rev.createdAt).getFullYear())
      )
      .filter((y) => y !== undefined) as number[];

    const uniqueYears = Array.from(new Set(allYears));
    return uniqueYears.sort((a, b) => b - a); // terbaru ke lama
  }, [reviewers]);

  const filteredReviewers = useMemo(() => {
    if (!selectedYear) return reviewers;

    return reviewers.map((r) => ({
      ...r,
      review: r.review?.filter(
        (rev) =>
          new Date(rev.createdAt).getFullYear().toString() === selectedYear
      ),
    }));
  }, [reviewers, selectedYear]);

  useEffect(() => {
    getReviewer();
  }, [getReviewer]);

  return (
    <Container size="xl" py="xl">
      <Skeleton visible={loading}>
        <Title order={1} mb="lg">
          Rekapitulasi Reviewer
        </Title>
      </Skeleton>

      {/* Top Performers */}
      <Paper withBorder p="md" mb="xl">
        <Skeleton visible={loading}>
          <Title order={3} mb="md">
            Performa Reviewer Terbaik
          </Title>
        </Skeleton>
        <Skeleton visible={loading}>
          <Grid>
            {[...filteredReviewers]
              .sort((a, b) => {
                const aTotal =
                  a.review?.filter(
                    (r) => r.status === "diterima" || r.status === "ditolak"
                  ).length ?? 0;
                const bTotal =
                  b.review?.filter(
                    (r) => r.status === "diterima" || r.status === "ditolak"
                  ).length ?? 0;
                return bTotal - aTotal;
              })
              .slice(0, 3)
              .map((reviewer, index) => {
                const penelitianCount =
                  reviewer.review?.filter(
                    (r) =>
                      (r.status === "ditolak" || r.status === "diterima") &&
                      r.evaluation?.category === "penelitian"
                  ).length ?? 0;

                const pengmasCount =
                  reviewer.review?.filter(
                    (r) =>
                      (r.status === "ditolak" || r.status === "diterima") &&
                      r.evaluation?.category === "pengmas"
                  ).length ?? 0;

                const total = penelitianCount + pengmasCount;

                return (
                  <Grid.Col key={reviewer.id} span={{ base: 12, md: 4 }}>
                    <Card withBorder padding="lg" radius="md">
                      <Group justify="center" mb="md"></Group>

                      <PieChartComponent
                        data={
                          total > 0
                            ? [
                                { name: "Penelitian", value: penelitianCount },
                                { name: "Pengmas", value: pengmasCount },
                              ]
                            : [{ name: "Kosong", value: 1 }]
                        }
                      />

                      <Text ta="center" fw={500} size="lg">
                        {reviewer?.lecturer?.name}
                      </Text>
                      <Text ta="center" c="dimmed" size="sm">
                        {reviewer?.lecturer?.department?.name}
                      </Text>
                      <Group mt="md" justify="center">
                        <Badge size="lg">Peringkat #{index + 1}</Badge>
                      </Group>
                    </Card>
                  </Grid.Col>
                );
              })}
          </Grid>
        </Skeleton>
      </Paper>

      {/* Filters */}
      <Skeleton visible={loading}>
        <Group mb="md">
          <Select
            placeholder="Filter Tahun"
            data={years.map((year) => ({
              value: String(year),
              label: String(year),
            }))}
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            style={{ width: 200 }}
          />
        </Group>
      </Skeleton>

      {/* Main Table */}
      <Paper withBorder p="md">
        <Skeleton visible={loading}>
          <TableLayout
            columns={columns}
            data={filteredReviewers}
            isLoading={loading}
            initialState={{
              sorting: [{ id: "total_review", desc: true }],
            }}
          />
        </Skeleton>
      </Paper>
    </Container>
  );
}
