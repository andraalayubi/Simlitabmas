"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { lecturer } from "prisma/interfaces";
import useNotification from "src/components/notification/notification";
import { MRT_ColumnDef } from "mantine-react-table";
import lecturerAction from "src/action/lecturerAction";
import { Text } from "@mantine/core";
import TableLayout from "src/components/table/tableLayout";

export default function AuditLecturerPage() {
  const user_type = "admin";
  const [lecturers, SetLecturers] = useState<lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  const columns = useMemo<MRT_ColumnDef<lecturer>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Nama Dosen",
        size: 200,
      },
      {
        accessorKey: "position.name",
        header: "Jabatan Fungsional",
        size: 100,
        Cell: ({ cell }) => {
          const value = cell.getValue();
          if (value === "Lecturer") {
            return <span>Tanpa Jabatan</span>;
          } else {
            return <>{value}</>;
          }
        },
      },
      {
        accessorKey: "highest_degree",
        header: "Gelar",
        size: 50,
      },
      {
        accessorKey: "department.name",
        header: "Program Studi",
        size: 100,
      },
      {
        accessorKey: "research_group.name",
        header: "Research Group",
        size: 100,
      },
    ],
    []
  );

  const getLecturers = useCallback(async () => {
    const response = await lecturerAction.getLecturers(user_type, setLoading, {
      get_position: true,
      get_department: true,
      get_research_group: true,
    });

    if (response.success) {
      SetLecturers(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getLecturers();
  }, [getLecturers]);

  return (
    <>
      <div className="px-4 py-6">
        <div className="bg-white shadow rounded-lg mt-4">
          <div className="bg-white shadow sm:rounded-lg">
            {/* Judul */}
            <div className="flex justify-between items-center pt-5 pb-2 px-6">
              <Text size="lg" fw={700}>
                Daftar Dosen
              </Text>
            </div>

            <TableLayout
              columns={columns}
              data={lecturers}
              isLoading={loading}
              enableRowClick={true}
              getRowClickUrl={(row) => `/master/dosen/${row.id}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
