"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useParams } from "next/navigation";
import { Skeleton, Tabs, Button, Text, Group, Modal } from "@mantine/core";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import { MRT_ColumnDef } from "mantine-react-table";
import TableLayout from "src/components/table/tableLayout";
import {
  lecturer,
  proposal_suggestion,
  student_member,
  vendor_member,
  schema,
  proposal_suggestion_phase,
  proposal_suggestion_status,
} from "prisma/interfaces";
import AnggotaModal from "src/components/modal/anggota/anggota";
import ModalComponent from "src/components/modal/modal";
import lecturerAction from "src/action/lecturerAction";
import studentAction from "src/action/member/studentAction";
import vendorAction from "src/action/member/vendorAction";
import memberAction from "src/action/member/memberAction";
import { SessionPayload } from "src/lib/encrypt";

interface AnggotaAdminProps {
  session: SessionPayload;
  columnsLecturer: MRT_ColumnDef<lecturer>[];
  columnsStudent: MRT_ColumnDef<student_member>[];
  columnsVendor: MRT_ColumnDef<vendor_member>[];
}

const MemberLecturer: React.FC<AnggotaAdminProps> = ({
  session,
  columnsLecturer,
  columnsStudent,
  columnsVendor,
}) => {
  const user_type = "lecturer";
  const [lecturers, setLecturers] = useState<lecturer[]>([]);
  const [students, setStudents] = useState<student_member[]>([]);
  const [vendors, setVendors] = useState<vendor_member[]>([]);
  const [schema, setSchema] = useState<schema | null>(null);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);

  const [tabActive, setTabActive] = useState<string | null>("lecturer");
  const [loading, setLoading] = useState(true);
  const [loadProposal, setLoadProposal] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<lecturer | student_member | vendor_member | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const params = useParams();
  const usulan_id = Number(params.usulan_id);

  const getProposalSchema = useCallback(async () => {
    const response = await memberAction.getProposalSchema(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data);
      setSchema(response.data.schema);
      setLoadProposal(false);

      if (!response.data.schema.is_lecturer) {
        setLecturers([response.data.lecturer]);
      } else {
        getLecturers();
      }

      //check editable
      const isEditableByLecturer =
        response.data.lecturer_id === session.lecturer_id;

      // check by workflow
      type PartialEditableRules = Partial<
        Record<proposal_suggestion_phase, proposal_suggestion_status[]>
      >;
      const editableRules: PartialEditableRules = {
        pengajuan: ["menunggu_proposal", "tersimpan"],
        evaluasi_proposal: [],
        penetapan: [],
        monev: [],
        evaluasi_akhir: [],
        penetapan_akhir: [],
      };

      const isEditableByConditions =
        editableRules[
          response.data.phase as proposal_suggestion_phase
        ]?.includes(response.data.status as proposal_suggestion_status) ||
        false;

      const isEditableByYear = response.data.open;

      setIsEditable(
        isEditableByLecturer && isEditableByYear && isEditableByConditions
      );
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id, refreshTrigger, session]);

  const getLecturers = useCallback(async () => {
    const response = await lecturerAction.getLecturerMember(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      setLecturers(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id, refreshTrigger]);

  const getStudents = useCallback(async () => {
    const response = await studentAction.getStudentMember(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      setStudents(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  const getVendors = useCallback(async () => {
    const response = await vendorAction.getVendorMember(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      setVendors(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  useEffect(() => {
    getProposalSchema();
  }, [getProposalSchema]);

  useEffect(() => {
    switch (tabActive) {
      case "student":
        getStudents();
        break;
      case "vendor":
        getVendors();
        break;
    }
  }, [usulan_id, tabActive, getStudents, getVendors, refreshTrigger]);

  // Fungsi handleDelete yang bisa menangani semua tipe data
  const handleDelete = async (item: lecturer | student_member | vendor_member) => {
    if (!item) return;
    
    try {
      setDeleteLoading(true);
      let response;
      
      if ("nip" in item) {
        response = await memberAction.deleteLecturerMember(user_type, item.id, setDeleteLoading);
      } else if ("nrp" in item) {
        response = await studentAction.deleteStudentMember(user_type, item.id, setDeleteLoading);
      } else {
        response = await vendorAction.deleteVendorMember(user_type, item.id, setDeleteLoading);
      }

      if (response.success) {
        showNotification({ status: "success", message: response.message });
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
      setDeleteLoading(false);
      setDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setItemToDelete(null);
  };

  // Generate columns with delete action
  const commonActionsColumn = useMemo(() => 
    isEditable
      ? [
          {
            id: "actions",
            header: "Aksi",
            Cell: ({ row }: { row: any }) => (
              <Button
                variant="outlined"
                color="error"
                size="xs"
                onClick={() => {
                  setItemToDelete(row.original);
                  setDeleteModal(true);
                }}
              >
                Hapus
              </Button>
            ),
            size: 100,
          },
        ]
      : [],
    [isEditable]
  );

  const columnsLecturerWithAction = useMemo(() => [
    ...columnsLecturer,
    ...commonActionsColumn
  ], [columnsLecturer, commonActionsColumn]);

  const columnsStudentWithAction = useMemo(() => [
    ...columnsStudent,
    ...commonActionsColumn
  ], [columnsStudent, commonActionsColumn]);

  const columnsVendorWithAction = useMemo(() => [
    ...columnsVendor,
    ...commonActionsColumn
  ], [columnsVendor, commonActionsColumn]);

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
            loading={deleteLoading}
            size="xs"
          >
            Ya, Hapus
          </Button>
        </Group>
      </Modal>
      <div className="px-4 py-6">
        {/* Baris Judul, Status, dan Tahap Usulan */}
        <Skeleton visible={loadProposal}>
          <ProposalSuggestionSummaryCard
            proposal_suggestion_name={proposalSuggestion?.name!}
            status={proposalSuggestion?.status!}
            phase={proposalSuggestion?.phase!}
          />
        </Skeleton>
        {/* Grid utama dengan perbandingan 5:3 pada layar besar, 1 kolom pada layar kecil */}
        <div className="">
          <Tabs
            variant="pills"
            defaultValue={tabActive}
            value={tabActive}
            onChange={(value) => setTabActive(value)}
          >
            <div className="flex justify-between items-center">
              <div>
                <Tabs.List>
                  <Tabs.Tab value="lecturer">Dosen</Tabs.Tab>
                  {schema?.is_student && (
                    <Tabs.Tab value="student">Mahasiswa</Tabs.Tab>
                  )}
                  {schema?.is_partner && (
                    <Tabs.Tab value="vendor">Vendor</Tabs.Tab>
                  )}
                </Tabs.List>
              </div>
              <div>
                <ModalComponent title="Tambah Anggota" disabled={!isEditable}>
                  {(close) => (
                    <AnggotaModal
                      user_type={user_type}
                      onClose={close}
                      usulan_id={usulan_id}
                      tabActive={tabActive}
                      refreshData={() => setRefreshTrigger((prev) => prev + 1)}
                    />
                  )}
                </ModalComponent>
              </div>
            </div>
            <Tabs.Panel value="lecturer">
              <TableLayout
                columns={columnsLecturerWithAction}
                data={lecturers}
                isLoading={loading}
              />
            </Tabs.Panel>
            <Tabs.Panel value="student">
              <TableLayout
                columns={columnsStudentWithAction}
                data={students}
                isLoading={loading}
              />
            </Tabs.Panel>
            <Tabs.Panel value="vendor">
              <TableLayout
                columns={columnsVendorWithAction}
                data={vendors}
                isLoading={loading}
              />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default MemberLecturer;
