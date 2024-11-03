"use client";

import React from "react";
import { Card, SimpleGrid, Text } from "@mantine/core";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";

type Usulan = {
  id: number;
  title: string;
  date: string;
  schema: string;
  dosenPengusul: string;
  prodi: string;
  status: string;
  statusClass: string;
};

const DashboardKetuaRG: React.FC<{ usulan: Usulan[] }> = ({ usulan }) => {
  const columns = React.useMemo<MRT_ColumnDef<Usulan>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Judul Penelitian",
      },
      {
        accessorKey: "schema",
        header: "Skema",
      },
      {
        accessorKey: "dosenPengusul",
        header: "Dosen Pengusul",
      },
      {
        accessorKey: "prodi",
        header: "Prodi",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const proposal = cell.row.original as Usulan;
          return (
            <span className={proposal.statusClass}>{proposal.status}</span>
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <SimpleGrid cols={3} spacing="lg" mb="lg">
        <Card shadow="sm" padding="lg">
          <Text size="xl" fw={700} ta="center">
            10
          </Text>
          <Text ta="center">Usulan Research Group</Text>
        </Card>
        <Card shadow="sm" padding="lg">
          <Text size="xl" fw={700} ta="center">
            2
          </Text>
          <Text ta="center">Usulan Penelitian Research Group</Text>
        </Card>
        <Card shadow="sm" padding="lg">
          <Text size="xl" fw={700} ta="center">
            1
          </Text>
          <Text ta="center">Usulan Pengabdia Research Groupn</Text>
        </Card>
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

export default DashboardKetuaRG;
