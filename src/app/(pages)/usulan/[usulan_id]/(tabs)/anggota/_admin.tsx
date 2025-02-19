"use client";

import DaftarAnggota from "src/components/usulan/anggota/ListAnggota";
import React, { useCallback, useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { user_type, lecturer } from "@prisma/client";
import memberAction from "src/action/lecturerAction";
import { useParams } from "next/navigation";
import { Card, Skeleton, Tabs, Text } from "@mantine/core";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import { MRT_ColumnDef } from "mantine-react-table";
import TableLayout from "src/components/table/tableLayout";
import {
  proposal_suggestion,
  student_member,
  vendor_member,
} from "prisma/interfaces";
import AnggotaModal from "src/components/modal/anggota/anggota";
import ModalComponent from "src/components/modal/modal";
import lecturerAction from "src/action/lecturerAction";
import studentAction from "src/action/member/studentAction";
import vendorAction from "src/action/member/vendorAction";

interface Member {
  id: number;
  name: string;
  role: string;
  activityCount: string;
}

interface AnggotaAdminProps {
  columnsLecturer: MRT_ColumnDef<lecturer>[];
  columnsStudent: MRT_ColumnDef<student_member>[];
  columnsVendor: MRT_ColumnDef<vendor_member>[];
}

const MemberAdmin: React.FC<AnggotaAdminProps> = ({
  columnsLecturer,
  columnsStudent,
  columnsVendor,
}) => {
  const user_type = "admin";
  const [lecturers, setLecturers] = useState<lecturer[]>([]);
  const [students, setStudents] = useState<student_member[]>([]);
  const [vendors, setVendors] = useState<vendor_member[]>([]);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);

  const [tabActive, setTabActive] = useState<string | null>("dosen");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = Number(params.usulan_id[0]);

  const getLecturers = useCallback(async () => {
    const response = await lecturerAction.getLecturerMember(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setProposalSuggestion(response.data.proposal);
      setLecturers(response.data.lecturers);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  const getStudents = useCallback(async () => {
    const response = await studentAction.getStudentMember(
      user_type,
      usulan_id,
      setLoading
    );
    console.log(response);

    if (response.success) {
      showNotification({ status: "success", message: response.message });
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
    console.log(response);

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setVendors(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  useEffect(() => {
    switch(tabActive) {
      case 'dosen':
        getLecturers();
        break;
      case 'mahasiswa':
        getStudents();
        break;
      case 'vendor':
        getVendors();
        break;
      default:
        getLecturers();
        break;
    }
  }, [tabActive, getLecturers, getStudents, getVendors]);

  return (
    <>
      <div className="bg-white shadow sm:rounded-lg p-6">
        {/* Baris Judul, Status, dan Tahap Usulan */}
        <Skeleton visible={loading}>
          <ProposalSuggestionSummaryCard
            proposal_suggestion_name={proposalSuggestion?.name!}
            status={proposalSuggestion?.status!}
            phase={proposalSuggestion?.phase!}
          />
        </Skeleton>
        {/* Grid utama dengan perbandingan 5:3 pada layar besar, 1 kolom pada layar kecil */}
        <div className="flex mt-6">
          <Tabs variant="pills" defaultValue={tabActive} value={tabActive} onChange={(value) => setTabActive(value)}>
            <div className="flex justify-between items-center">
              <div>
                <Tabs.List>
                  <Tabs.Tab value="dosen">Dosen</Tabs.Tab>
                  <Tabs.Tab value="mahasiswa">Mahasiswa</Tabs.Tab>
                  <Tabs.Tab value="vendor">Vendor</Tabs.Tab>
                </Tabs.List>
              </div>
              <div>
              <ModalComponent title="Buat Usulan">
              {(close) => (
                <AnggotaModal
                  user_type={user_type}
                  onClose={close}
                  usulan_id={usulan_id}
                  tabActive={tabActive}
                />
                )}
              </ModalComponent>
              </div>
            </div>
            <Tabs.Panel value="dosen">
              <TableLayout
                columns={columnsLecturer}
                data={lecturers}
                isLoading={loading}
              />
            </Tabs.Panel>
            <Tabs.Panel value="mahasiswa">
              <TableLayout
                columns={columnsStudent}
                data={students}
                isLoading={loading}
              />
              <></>
            </Tabs.Panel>
            <Tabs.Panel value="vendor">
              <TableLayout
                columns={columnsVendor}
                data={vendors}
                isLoading={loading}
              />
              <></>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default MemberAdmin;
