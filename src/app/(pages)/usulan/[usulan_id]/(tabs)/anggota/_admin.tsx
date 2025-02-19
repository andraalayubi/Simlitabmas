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
import { proposal_suggestion, student_member } from "prisma/interfaces";
import AnggotaModal from "src/components/modal/anggota/anggota";
import ModalComponent from "src/components/modal/modal";

interface Member {
  id: number;
  name: string;
  role: string;
  activityCount: string;
}

interface AnggotaAdminProps {
  columns: MRT_ColumnDef<lecturer>[];
}

const MemberAdmin: React.FC<AnggotaAdminProps> = ({ columns }) => {
  const user_type = "admin";
  const [lecturers, setLecturers] = useState<lecturer[]>([]);
  const [students, setStudents] = useState<student_member[]>([]);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = Number(params.usulan_id[0]);

  const getLecturers = useCallback(async () => {
    const response = await memberAction.getLecturerMember(
      user_type,
      usulan_id,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      const transformedData: lecturer[] = response.data.lecturers.map(
        (item: any) => ({
          id: item.lecturer_id.toString(),
          name: item.name,
          nip: item.nip,
          jabatan: item.jabatan,
          department_name: item.department_name,
        })
      );

      setProposalSuggestion(response.data.proposal);
      setLecturers(transformedData);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  useEffect(() => {
    getLecturers();
  }, [getLecturers]);

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
          <Tabs variant="pills" defaultValue="dosen">
            <div className="flex justify-between items-center">
              <div>
                <Tabs.List>
                  <Tabs.Tab value="dosen">Dosen</Tabs.Tab>
                  <Tabs.Tab value="mahasiswa">Mahasiswa</Tabs.Tab>
                  <Tabs.Tab value="vendor">Vendor</Tabs.Tab>
                </Tabs.List>
              </div>
              <div className="mb-2">
                <ModalComponent title="Tambah Anggota">
                  {(close) => (
                    <AnggotaModal
                      onClose={close}
                      usulanId={usulan_id}
                      user_type={user_type}
                    />
                  )}
                </ModalComponent>
              </div>
            </div>

            <Tabs.Panel value="dosen">
              <TableLayout
                columns={columns}
                data={lecturers}
                isLoading={loading}
              />
            </Tabs.Panel>
            <Tabs.Panel value="mahasiswa">
              <TableLayout
                columns={columns}
                data={lecturers}
                isLoading={loading}
              />
              <></>
            </Tabs.Panel>
            <Tabs.Panel value="vendor">
              <TableLayout
                columns={columns}
                data={lecturers}
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
