"use client";

import { Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { department } from "prisma/interfaces";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import departmentAction from "src/action/departmentAction";
import ModalComponent from "src/components/modal/modal";
import useNotification from "src/components/notification/notification";
import TableLayout from "src/components/table/tableLayout";

export default function AuditDepartementPage() {
  const user_type = "admin";
  const [department, setDepartement] = useState<department[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  // map columns
  const columns = useMemo<MRT_ColumnDef<department>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Nama Program Studi",
        size: 300,
      },
      {
        accessorKey: "kaprodi_name",
        header: "Kaprodi",
        size: 100,
      },
      {
        accessorKey: "proposal_suggestion_count",
        header: "Jumlah Usulan",
        size: 50,
      },
      {
        accessorKey: "lecturer_count",
        header: "Jumlah Anggota",
        size: 50,
      },
    ],
    []
  );

  const getDepartments = useCallback(async () => {
    const response = await departmentAction.getDepartment(
      user_type,
      setLoading
    );

    if (response.success) {
      setDepartement(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow rounded-lg mt-4">
          <div className="bg-white shadow sm:rounded-lg">
            {/* Judul */}
            <div className="flex justify-between items-center pt-5 pb-2 px-6">
              <Text size="lg" fw={700}>
                Daftar Program Studi
              </Text>
              <ModalComponent title="Buat Program Studi">
                {(close) =><> </>}
              </ModalComponent>
            </div>

            <TableLayout
              columns={columns}
              data={department}
              isLoading={loading}
              enableRowClick={true}
              getRowClickUrl={(row) => `/master/department/${row.id}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
