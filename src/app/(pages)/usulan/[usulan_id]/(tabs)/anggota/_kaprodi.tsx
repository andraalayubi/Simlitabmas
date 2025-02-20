"use client";

import React, { useCallback, useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useParams } from "next/navigation";
import { Skeleton, Tabs } from "@mantine/core";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import { MRT_ColumnDef } from "mantine-react-table";
import TableLayout from "src/components/table/tableLayout";
import {
  lecturer,
  proposal_suggestion,
  student_member,
  vendor_member,
  schema,
} from "prisma/interfaces";
import lecturerAction from "src/action/lecturerAction";
import studentAction from "src/action/member/studentAction";
import vendorAction from "src/action/member/vendorAction";
import memberAction from "src/action/member/memberAction";

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
  const user_type = "kaprodi";
  const [lecturers, setLecturers] = useState<lecturer[]>([]);
  const [students, setStudents] = useState<student_member[]>([]);
  const [vendors, setVendors] = useState<vendor_member[]>([]);
  const [schema, setSchema] = useState<schema | null>(null);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  
  const [tabActive, setTabActive] = useState<string | null>("lecturer");
  const [loading, setLoading] = useState(true);
  const [loadProposal, setLoadProposal] = useState(true);
  const params = useParams();
  const usulan_id = Number(params.usulan_id[0]);
  
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
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulan_id]);

  const getLecturers = useCallback(async () => {
    const response = await lecturerAction.getLecturerMember(
      user_type,
      usulan_id,
      setLoading
    );
    
    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setLecturers(response.data);
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

    if (response.success) {
      showNotification({ status: "success", message: response.message });
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
  }, [schema, tabActive, getStudents, getVendors]);

  return (
    <>
      <div className="container mx-auto px-4 py-6">
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
            <div className="flex items-center">
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
            </div>
            <Tabs.Panel value="lecturer">
              <TableLayout
                columns={columnsLecturer}
                data={lecturers}
                isLoading={loading}
              />
            </Tabs.Panel>
            <Tabs.Panel value="student">
              <TableLayout
                columns={columnsStudent}
                data={students}
                isLoading={loading}
              />
            </Tabs.Panel>
            <Tabs.Panel value="vendor">
              <TableLayout
                columns={columnsVendor}
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

export default MemberAdmin;
