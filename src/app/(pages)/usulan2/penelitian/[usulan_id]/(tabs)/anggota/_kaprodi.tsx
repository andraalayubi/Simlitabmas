"use client";

import DaftarAnggota from "@/app/components/usulan/anggota/ListAnggota";
import React, { useEffect, useState } from "react";

interface Member {
  id: number;
  name: string;
  role: string;
  activityCount: string;
}

const MemberKaprodi: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

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

  return <DaftarAnggota members={members} onAddMember={handleAddMember} />;
};


export default MemberKaprodi;