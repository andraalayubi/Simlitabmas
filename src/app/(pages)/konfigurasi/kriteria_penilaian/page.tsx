"use client";

import { Modal, Table, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { criterion } from "prisma/interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import criterionAction from "src/action/criterionAction";
import userAction from "src/action/userAction";
import ActionButton from "src/components/button/actionButton";
import CreateCriterionModal from "src/components/modal/criterion/createCriterionModal";
import useNotification from "src/components/notification/notification";
import TableLayout from "src/components/table/tableLayout";

interface Condition {
  id: number;
  type: string;
  phase: string;
}

export default function ConfigurationCriterionPage() {
  const user_type = "admin";
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  // handle modal create criterion
  const [selectedConditions, setSelectedConditions] = useState<{
    type: string;
    phase: string;
  } | null>(null);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Tipe Usulan",
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return value.charAt(0).toUpperCase() + value.slice(1); // kapital huruf pertama
        },
      },
      {
        accessorKey: "phase",
        header: "Fase Usulan",
        size: 200,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return value
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "); // kapitalisasi + ubah underscore ke spasi
        },
      },
      {
        header: "Aksi",
        Cell: ({ row }) => (
          <ActionButton
            type="add"
            label="Tambah Kriteria Penilaian"
            onClick={() =>
              setSelectedConditions({
                type: row.original.type,
                phase: row.original.phase,
              })
            }
          ></ActionButton>
        ),
      },
    ],
    []
  );

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const conditionResponse = await criterionAction.getConditions(
        user_type,
        setLoading
      );

      const criteriaResponse = await criterionAction.getCriteria(
        user_type,
        setLoading,
        null
      );

      // Check if both requests were successful
      if (conditionResponse.success && criteriaResponse.success) {
        const mergedConditions = conditionResponse.data.map(
          (condition: Condition) => {
            const matchedCriteria = criteriaResponse.data.filter(
              (c: criterion) =>
                c.category === condition.type && c.phase === condition.phase
            );
            return { ...condition, criteria: matchedCriteria };
          }
        );

        setConditions(mergedConditions);

        showNotification({
          status: "success",
          message: "Data berhasil dimuat",
        });
      } else {
        // Collect error messages
        const errorMessages = [
          !conditionResponse.success ? conditionResponse.message : null,
          !criteriaResponse.success ? criteriaResponse.message : null,
        ].filter((msg) => msg !== null);

        showNotification({
          status: "error",
          message: errorMessages.join("; ") || "Gagal memuat data",
        });
      }
    } catch (error) {
      showNotification({
        status: "error",
        message: "Terjadi kesalahan saat memuat data",
      });
    }
  }, [user_type]);

  const deleteCriterion = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin kriteria penilaian ini?")) {
      const response = await criterionAction.deleteCriterion(user_type, id);

      if (response.success) {
        showNotification({ status: "success", message: response.message });
        fetchData();
      } else {
        showNotification({ status: "error", message: response.message });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="px-4 py-6">
        <div className="bg-white shadow rounded-lg mt-4">
          <div className="bg-white shadow sm:rounded-lg">
            {/* Judul */}
            <div className="flex justify-between items-center pt-5 pb-2 px-6">
              <Text size="lg" fw={700}>
                Konfigurasi Kriteria Penilaian
              </Text>
            </div>

            <TableLayout
              columns={columns}
              data={conditions}
              isLoading={loading}
              enableRowClick={false}
              enableExpanding={true}
              enableExpandAll={true}
              renderDetailPanel={({ row }) => (
                <div>
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Nama Kriteria</Table.Th>
                        <Table.Th>Aksi</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {row.original.criteria?.map(
                        (criteria: criterion, index: number) => (
                          <Table.Tr key={index}>
                            <Table.Td>{criteria.name}</Table.Td>
                            <Table.Td>
                              <ActionButton
                                type="delete"
                                label="Hapus Kriteria"
                                onClick={() => deleteCriterion(criteria.id)}
                              />
                            </Table.Td>
                          </Table.Tr>
                        )
                      )}
                    </Table.Tbody>
                  </Table>
                </div>
              )}
            />
          </div>
        </div>
      </div>

      {/* Modal create lecturer user */}
      <Modal
        opened={selectedConditions !== null}
        onClose={() => setSelectedConditions(null)}
        title="Buat Kriteria Penilaian"
        size="50%"
        centered
      >
        {selectedConditions && (
          <CreateCriterionModal
            user_type={user_type}
            conditionData={
              conditions.find(
                (c) =>
                  c.type === selectedConditions.type &&
                  c.phase === selectedConditions.phase
              )!
            }
            onClose={() => setSelectedConditions(null)}
            onSuccess={() => {
              fetchData();
              setSelectedConditions(null);
            }}
          />
        )}
      </Modal>
    </>
  );
}
