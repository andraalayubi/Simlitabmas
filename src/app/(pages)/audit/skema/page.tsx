"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text } from "@mantine/core";
import DaftarSkema from "src/components/audit/Skema";
import LoadingPage from "src/components/usulan/LoadingPage";
import { schema } from "prisma/interfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import useNotification from "src/components/notification/notification";
import TableLayout from "src/components/table/tableLayout";
import schemaAction from "src/action/schemaAction";
import ModalComponent from "src/components/modal/modal";

export default function AuditSchemaPage() {
  const user_type = "admin";
  const [schema, setSchema] = useState<schema[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  const columns = React.useMemo<MRT_ColumnDef<schema>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Nama Skema",
        size: 150,
      },
      {
        accessorKey: "description",
        header: "Deskripsi Skema",
        size: 300,
      },
      {
        accessorKey: "proposal_suggestion_count",
        header: "Jumlah Usulan",
        size: 100,
      },
    ],
    []
  );

  // get schema list
  const getSchema = useCallback(async () => {
    const response = await schemaAction.getSchemas(user_type, setLoading);

    console.log(response.data);
    if (response.success) {
      setSchema(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getSchema();
  }, [getSchema]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow rounded-lg mt-4">
          <div className="bg-white shadow sm:rounded-lg">
            {/* Judul */}
            <div className="flex justify-between items-center pt-5 pb-2 px-6">
              <Text size="lg" fw={700}>
                Daftar Skema Usulan
              </Text>
              <ModalComponent title="Buat Skema">
                {(close) => <> </>}
              </ModalComponent>
            </div>

            <TableLayout
              columns={columns}
              data={schema}
              isLoading={loading}
              enableRowClick={true}
              getRowClickUrl={(row) => `/schema/${row.id}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
