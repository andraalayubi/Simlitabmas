"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text } from "@mantine/core";
import DaftarSkema from "src/components/audit/Skema";
import LoadingPage from "src/components/Loading/LoadingPage";
import { position, schema } from "prisma/interfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import useNotification from "src/components/notification/notification";
import TableLayout from "src/components/table/tableLayout";
import schemaAction from "src/action/schemaAction";
import ModalComponent from "src/components/modal/modal";
import AddSchema from "src/components/modal/master/addSchema";
import positionAction from "src/action/positionAction";

export default function AuditSchemaPage() {
  const user_type = "admin";
  const [schema, setSchema] = useState<schema[]>([]);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<position[]>([]);
  const { showNotification } = useNotification();

  const columns = React.useMemo<MRT_ColumnDef<schema>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Tipe",
        size: 100,
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
        Cell: ({ cell }) => (
          <div style={{ 
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '300px'
          }}>
            {cell.getValue<string>()}
          </div>
        )
      },
      {
        id: "positions",
        header: "Jabatan",
        size: 200,
        Cell: ({ row }) => {
          const positions = row.original.position_schema || [];
          return positions.length > 0 
          ? positions.map(p => p.position?.name || '').filter(Boolean).join(", ")
          : "-";
        },
      },
      {
        accessorKey: "min_degree",
        header: "Min. Gelar",
        size: 80,
        Cell: ({ cell }) => (
          <div style={{ textAlign: 'center' }}>
            {cell.getValue<string>()}
          </div>
        ),
      },
      {
        accessorKey: "is_lecturer",
        header: "Dosen",
        size: 80,
        Cell: ({ cell }) => (
          <div style={{ textAlign: 'center' }}>
            {cell.getValue<boolean>() ? "✓" : "✗"}
          </div>
        ),
      },
      {
        accessorKey: "is_student",
        header: "Mahasiswa",
        size: 80,
        Cell: ({ cell }) => (
          <div style={{ textAlign: 'center' }}>
            {cell.getValue<boolean>() ? "✓" : "✗"}
          </div>
        ),
      },
      {
        accessorKey: "is_partner",
        header: "Partner",
        size: 80,
        Cell: ({ cell }) => (
          <div style={{ textAlign: 'center' }}>
            {cell.getValue<boolean>() ? "✓" : "✗"}
          </div>
        ),
      },
      // {
      //   accessorKey: "proposal_suggestion_count",
      //   header: "Jumlah Usulan",
      //   size: 100,
      // },
    ],
    []
  );

  // Fetch schema and position data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch Schema
      const schemaResponse = await schemaAction.getSchemasSummary(
        user_type,
        setLoading
      );

      // Fetch Positions
      const positionResponse = await positionAction.getPositions(
        user_type,
        setLoading
      );

      // Check if both requests were successful
      if (schemaResponse.success && positionResponse.success) {
        setSchema(schemaResponse.data);
        setPositions(positionResponse.data);
        showNotification({ 
          status: "success", 
          message: "Data berhasil dimuat" 
        });
      } else {
        // Collect error messages
        const errorMessages = [
          !schemaResponse.success ? schemaResponse.message : null,
          !positionResponse.success ? positionResponse.message : null
        ].filter(msg => msg !== null);

        showNotification({ 
          status: "error", 
          message: errorMessages.join('; ') || "Gagal memuat data"
        });
      }
    } catch (error) {
      showNotification({ 
        status: "error", 
        message: "Terjadi kesalahan saat memuat data" 
      });
    }
  }, [user_type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="px-4 py-6">
        <div className="bg-white shadow rounded-lg mt-4">
          <div className="bg-white shadow sm:rounded-lg">
            {/* Judul */}
            <div className="flex justify-between items-center pt-5 pb-2 px-6">
              <Text size="lg" fw={700}>
                Daftar Skema Usulan
              </Text>
              <ModalComponent title="Buat Skema">
                {(close) => (
                  <AddSchema
                    user_type={user_type}
                    onClose={() => close()}
                    onSuccess={() => fetchData()}
                    positions={positions}
                  />
                )}
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
