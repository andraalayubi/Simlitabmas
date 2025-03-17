"use client";

import { Group, Modal, Table, Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { lecturer, research_group, user } from "prisma/interfaces";
import { useCallback, useEffect, useMemo, useState } from "react";
import lecturerAction from "src/action/lecturerAction";
import userAction from "src/action/userAction";
import ActionButton from "src/components/button/actionButton";
import ModalComponent from "src/components/modal/modal";
import CreateLecturerModal from "src/components/modal/user/createLecturerModal";
import CreateUserModal from "src/components/modal/user/createUserModal";
import useNotification from "src/components/notification/notification";
import TableLayout from "src/components/table/tableLayout";

export default function ConfigurationUserPage() {
  const user_type = "admin";
  const [lecturers, setLecturers] = useState<lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  // handle modal create lectrer user
  const [selectedLecturerId, setSelectedLecturerId] = useState<number | null>(
    null
  );

  const columns = useMemo<MRT_ColumnDef<lecturer>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nama Dosen",
        size: 200,
      },
      {
        accessorKey: "nip",
        header: "NIP",
        size: 100,
      },
      {
        accessorKey: "nidn",
        header: "NIDN",
        size: 100,
      },
      {
        header: "Action",
        Cell: ({ row }) => (
          <Group>
            <ActionButton
              type="add"
              label="Tambah User Dosen"
              onClick={() => setSelectedLecturerId(row.original.id)} // trigger modal
            ></ActionButton>
            <ActionButton
              type="delete"
              label="Hapus Akun Dosen"
              onClick={() => {
                deleteLecturer(row.original.id);
              }}
            ></ActionButton>
          </Group>
        ),
      },
    ],
    []
  );

  const getUserLecturers = useCallback(async () => {
    const response = await userAction.getUserLecturers(
      user_type,
      setLoading,
      true
    );

    if (response.success) {
      setLecturers(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  const deleteLecturer = async (lecturer_id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus dosen ini?")) {
      const response = await lecturerAction.deleteLecturer(
        user_type,
        lecturer_id
      );

      if (response.success) {
        showNotification({ status: "success", message: response.message });
        getUserLecturers();
      } else {
        showNotification({ status: "error", message: response.message });
      }
    }
  };

  const deleteUserLecturer = async (user_id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus user dosen ini?")) {
      const response = await userAction.deleteUserLecturer(user_type, user_id);

      if (response.success) {
        showNotification({ status: "success", message: response.message });
        getUserLecturers();
      } else {
        showNotification({ status: "error", message: response.message });
      }
    }
  };

  useEffect(() => {
    getUserLecturers();
  }, [getUserLecturers]);

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white shadow rounded-lg mt-4">
          <div className="bg-white shadow sm:rounded-lg">
            {/* Judul */}
            <div className="flex justify-between items-center pt-5 pb-2 px-6">
              <Text size="lg" fw={700}>
                Konfigurasi User Dosen
              </Text>
              <ModalComponent title="Buat Akun Dosen">
                {(close) => (
                  <CreateLecturerModal
                    user_type={user_type}
                    onClose={close}
                    onSuccess={getUserLecturers}
                  />
                )}
              </ModalComponent>
            </div>

            <TableLayout
              columns={columns}
              data={lecturers}
              isLoading={loading}
              enableRowClick={false}
              enableExpanding={true}
              enableExpandAll={true}
              renderDetailPanel={({ row }) => (
                <div>
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Username</Table.Th>
                        <Table.Th>Role</Table.Th>
                        <Table.Th>Action</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {row.original.user?.map((user, index) => (
                        <Table.Tr key={index}>
                          <Table.Td>{user.name}</Table.Td>
                          <Table.Td>{user.email}</Table.Td>
                          <Table.Td>{user.username}</Table.Td>
                          <Table.Td>{user.user_type}</Table.Td>
                          <Table.Td>
                            <Group>
                              <ActionButton
                                type="delete"
                                label="Hapus User Dosen"
                                onClick={() => {
                                    deleteUserLecturer(user.id);
                                }}
                              ></ActionButton>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
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
        opened={selectedLecturerId !== null}
        onClose={() => setSelectedLecturerId(null)}
        title="Buat Akun Dosen"
        size="50%"
        centered
      >
        {selectedLecturerId && (
          <CreateUserModal
            user_type={user_type}
            lecturerData={lecturers.find((l) => l.id === selectedLecturerId)!}
            onClose={() => setSelectedLecturerId(null)}
            onSuccess={() => {
              getUserLecturers();
              setSelectedLecturerId(null);
            }}
          />
        )}
      </Modal>
    </>
  );
}
