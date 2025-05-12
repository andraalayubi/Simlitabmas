"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Group, Text } from "@mantine/core";
import LoadingPage from "src/components/Loading/LoadingPage";
import { lecturer, reviewer } from "prisma/interfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import useNotification from "src/components/notification/notification";
import TableLayout from "src/components/table/tableLayout";
import ModalComponent from "src/components/modal/modal";
import AddReviewer from "src/components/modal/master/addReviewer";
import lecturerAction from "src/action/lecturerAction";
import ActionButton from "src/components/button/actionButton";
import reviewerAction from "src/action/reviewerAction";

export default function MasterReviewerPage() {
  const user_type = "admin";
  const [reviewer, setReviewers] = useState<reviewer[]>([]);
  const [loading, setLoading] = useState(true);
  const [lecturers, setLecturers] = useState<lecturer[]>([]);
  const { showNotification } = useNotification();

  const columns = React.useMemo<MRT_ColumnDef<reviewer>[]>(
    () => [
      {
        header: "No",
        Cell: ({ row }) => row.index + 1,
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
        accessorKey: "category",
        header: "Tipe Usulan",
        size: 100,
        Cell: ({ cell }) => {
          const value = cell.getValue<string>();
          return <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>;
        },
      },
      {
        header: "Action",
        Cell: ({ row }) => (
          <Group>
            <ActionButton
              type="edit"
              label="Ubah Tipe Usulan"
              onClick={() => updateReviewerType(row.original.id, row.original.category)} // trigger modal
            ></ActionButton>
            <ActionButton
              type="delete"
              label="Hapus Akun Dosen"
              onClick={() => {
                deleteReviewer(row.original.id);
              }}
            ></ActionButton>
          </Group>
        ),
      },
    ],
    []
  );

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      // Fetch Lecturer
      const lecturerResponse = await lecturerAction.getLecturers(
        user_type,
        setLoading,
        { get_reviewer: true }
      );

      // Fetch Reviewer
      const reviewerResponse = await reviewerAction.getReviewers(
        user_type,
        setLoading,
        { get_lecturer: true }
      );

      // Check if both requests were successful
      if (lecturerResponse.success && reviewerResponse.success) {
        setLecturers(lecturerResponse.data);
        setReviewers(reviewerResponse.data);
        showNotification({
          status: "success",
          message: "Data berhasil dimuat",
        });
      } else {
        // Collect error messages
        const errorMessages = [
          !lecturerResponse.success ? lecturerResponse.message : null,
          !reviewerResponse.success ? reviewerResponse.message : null,
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteReviewer = async (reviewer_id: number) => {
    if (
      confirm("Apakah Anda yakin ingin menghapus role reviewer dari dosen ini?")
    ) {
      const response = await reviewerAction.deleteReviewer(
        user_type,
        reviewer_id,
        { deleted: true }
      );

      if (response.success) {
        showNotification({ status: "success", message: response.message });
        fetchData();
      } else {
        showNotification({ status: "error", message: response.message });
      }
    }
  };

  const updateReviewerType = async (reviewer_id: number, type: string) => {
    if (
      confirm("Apakah Anda yakin ingin merubah tipe usulan dari reviewer ini?")
    ) {
      const response = await reviewerAction.updateReviewer(
        user_type,
        setLoading,
        reviewer_id,
        { switch: true, category: type }
      );

      if (response.success) {
        showNotification({ status: "success", message: response.message });
        fetchData();
      } else {
        showNotification({ status: "error", message: response.message });
      }
    }
  };

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
                Daftar Reviewer Usulan
              </Text>
              <ModalComponent title="Tambahkan Reviewer">
                {(close) => (
                  <AddReviewer
                    user_type={user_type}
                    onClose={() => close()}
                    onSuccess={() => fetchData()}
                    lecturers={lecturers}
                  />
                )}
              </ModalComponent>
            </div>

            <TableLayout
              columns={columns}
              data={reviewer}
              isLoading={loading}
              //   enableRowClick={true}
              //   getRowClickUrl={(row) => `/lecturer/${row.lecturer?.id}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
