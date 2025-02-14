"use client";

import DaftarAnggota from "src/components/usulan/anggota/ListAnggota";
import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { useParams } from "next/navigation";
import { AnggotaForm } from "src/components/modal/anggota/_form";
import ModalComponent from "src/components/modal/modal";

interface Member {
  id: number;
  name: string;
  role: string;
  activityCount: string;
}

const MemberLecturer: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const usulan_id = params.usulan_id;

  const handleAddMember = async (
    newMember: Omit<Member, "id" | "activityCount">
  ) => {
    const memberWithId = {
      ...newMember,
      id: members.length + 1,
      activityCount: "0",
    };

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        body: JSON.stringify(memberWithId),
      });
      if (response.status === 201) {
        setMembers((prevMembers) => [...prevMembers, memberWithId]);
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  // Anggota Handler
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            `Error fetching session: ${response.status} - ${response.statusText}`
          );
        }

        setMembers(data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the members!", error);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <Tabs variant="pills" defaultValue="dosen">
          <div className="flex justify-between items-center">
            <Tabs.List>
              <Tabs.Tab value="dosen">Dosen</Tabs.Tab>
              <Tabs.Tab value="mahasiswa">Mahasiswa</Tabs.Tab>
              <Tabs.Tab value="vendor">Vendor</Tabs.Tab>
            </Tabs.List>
            <div className="mb-2">
              <ModalComponent title="Tambah Anggota">
                {(close) => <AnggotaForm onClose={close} usulanId={"1"} />}
              </ModalComponent>
            </div>
          </div>

          <Tabs.Panel value="dosen">
            <DaftarAnggota members={members} onAddMember={handleAddMember} />
          </Tabs.Panel>
          <Tabs.Panel value="mahasiswa">
            <DaftarAnggota members={members} onAddMember={handleAddMember} />
          </Tabs.Panel>
          <Tabs.Panel value="vendor">
            <DaftarAnggota members={members} onAddMember={handleAddMember} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
};

export default MemberLecturer;
