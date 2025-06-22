"use client";

import { useSession } from "src/components/session/session";
import { useMemo, useState } from "react";
import AnggotaAdmin from "./_admin";
import AnggotaKaprodi from "./_kaprodi";
import AnggotaKetuaRG from "./_ketua_rg";
import AnggotaLecturer from "./_lecturer";
import { MRT_ColumnDef } from "mantine-react-table";
import { Button, Skeleton, Modal, Text, Group } from "@mantine/core";
import { lecturer, student_member, vendor_member } from "prisma/interfaces";
import studentAction from "src/action/member/studentAction";
import vendorAction from "src/action/member/vendorAction";
import memberAction from "src/action/member/memberAction";
import { showNotification } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export default function AnggotaPage() {
  const { session, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<lecturer | student_member | vendor_member | null>(null);

  const commonActionsColumn =
    session?.user_type === "lecturer"
      ? [
          {
            id: "actions",
            header: "Aksi",
            Cell: ({ row }: { row: any }) => (
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setItemToDelete(row.original);
                  setDeleteModal(true);
                }}
              >
                Delete
              </Button>
            ),
            size: 100,
          },
        ]
      : [];

  const columnsLecturer = useMemo<MRT_ColumnDef<lecturer>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nama Anggota",
        size: 200,
      },
      {
        accessorKey: "nip",
        header: "NRP / NIP",
        size: 150,
      },
      {
        header: "Jabatan",
        Cell: ({ row }) => (row.index === 0 ? "Ketua" : "Anggota"),
        size: 150,
      },
      {
        accessorFn: (row) => row.department?.name,
        header: "Program Studi",
        size: 300,
      },
      ...commonActionsColumn,
    ],
    [session?.user_type]
  );

  const columnsStudent = useMemo<MRT_ColumnDef<student_member>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nama Anggota",
        size: 350,
      },
      {
        accessorKey: "nrp",
        header: "NRP / NIP",
        size: 300,
      },
      {
        accessorFn: (row) => row.department?.name,
        header: "Program Studi",
        size: 400,
      },
      ...commonActionsColumn,
    ],
    [session?.user_type]
  );

  const columnsVendor = useMemo<MRT_ColumnDef<vendor_member>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nama Anggota",
        size: 525,
      },
      {
        accessorKey: "description",
        header: "Deskripsi",
        size: 525,
      },
      ...commonActionsColumn,
    ],
    [session?.user_type]
  );

  // Fungsi handleDelete yang bisa menangani semua tipe data
  const handleDelete = async (item: lecturer | student_member | vendor_member) => {
    try {
      setLoading(true);
      let response;
      
      if ("nip" in item) {
        response = await memberAction.deleteLecturerMember(session?.user_type!, item.id, setLoading);
      } else if ("nrp" in item) {
        response = await studentAction.deleteStudentMember(session?.user_type!, item.id, setLoading);
      } else {
        response = await vendorAction.deleteVendorMember(session?.user_type!, item.id, setLoading);
      }

      if (response.success) {
        showNotification({ status: "success", message: response.message });
        // Trigger refresh after successful deletion
        setRefreshTrigger(prev => prev + 1);
      } else {
        showNotification({ status: "error", message: response.message });
      }
    } catch (error: any) {
      console.error('Error in handleDelete:', error);
      showNotification({ 
        status: "error", 
        message: error.response?.data?.message || 'Terjadi kesalahan saat menghapus data' 
      });
    } finally {
      setLoading(false);
      setDeleteModal(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <>
      {/* Modal Konfirmasi Hapus */}
      <Modal
        opened={deleteModal}
        onClose={closeDeleteModal}
        title="Konfirmasi Hapus"
        size="sm"
        centered
      >
        <Text size="sm" mb="md">
          Apakah Anda yakin ingin menghapus {itemToDelete && ("nip" in itemToDelete ? 'dosen' : 
                                      "nrp" in itemToDelete ? 'mahasiswa' : 'vendor')} ini?
        </Text>
        <Group justify="right">
          <Button variant="default" onClick={closeDeleteModal} size="xs">
            Batal
          </Button>
          <Button 
            color="red" 
            onClick={() => handleDelete(itemToDelete!)} 
            loading={loading}
            size="xs"
          >
            Ya, Hapus
          </Button>
        </Group>
      </Modal>

      {session?.user_type == "admin" ? (
        <Skeleton visible={sessionLoading}>
          <AnggotaAdmin 
            columnsLecturer={columnsLecturer} 
            columnsStudent={columnsStudent} 
            columnsVendor={columnsVendor}
          />
        </Skeleton>
      ) : session?.user_type == "lecturer" ? (
        <Skeleton visible={sessionLoading}>
          <AnggotaLecturer 
            session={session} 
            columnsLecturer={columnsLecturer} 
            columnsStudent={columnsStudent} 
            columnsVendor={columnsVendor}
            refreshTriggers={refreshTrigger}
          />
        </Skeleton>
      ) : session?.user_type == "ketua_rg" ? (
        <Skeleton visible={sessionLoading}>
          <AnggotaKetuaRG 
            columnsLecturer={columnsLecturer} 
            columnsStudent={columnsStudent} 
            columnsVendor={columnsVendor}
          />
        </Skeleton>
      ) : session?.user_type == "kaprodi" ? (
        <Skeleton visible={sessionLoading}>
          <AnggotaKaprodi 
            columnsLecturer={columnsLecturer} 
            columnsStudent={columnsStudent} 
            columnsVendor={columnsVendor}
          />
        </Skeleton>
      ) : null}
    </>
  );
}
