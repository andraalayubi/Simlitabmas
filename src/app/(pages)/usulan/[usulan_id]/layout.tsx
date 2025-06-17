"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Skeleton, Tabs } from "@mantine/core";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "src/components/session/session";
import {
  lecturer,
  user_type,
} from "prisma/interfaces";
import lecturerAction from "src/action/lecturerAction";
import useNotification from "src/components/notification/notification";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";

// Data tab menu
const TabMenus = [
  { value: "overview", path: "overview", tabName: "Overview" },
  { value: "proposal", path: "proposal", tabName: "Proposal" },
  { value: "anggota", path: "anggota", tabName: "Anggota" },
  { value: "luaran", path: "luaran", tabName: "Luaran" },
  { value: "logbook", path: "logbook", tabName: "Logbook" },
  {
    value: "dokumen_tambahan",
    path: "dokumen_tambahan",
    tabName: "Dokumen Tambahan",
  },
  { value: "laporan_akhir", path: "laporan_akhir", tabName: "Laporan Akhir" },
  // { value: "evaluasi", path: "evaluasi", tabName: "Evaluasi" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [lecturer, setLecturer] = useState<lecturer | null>();
  const router = useRouter();
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const params = useParams();
  const usulan_id = parseInt(params.usulan_id as string);

  const checkProposalSuggestionPermission = useCallback(
    async (user_type: user_type, proposal_suggestion_id: number) => {
      // lecturer user type
      if (user_type == "lecturer") {
        const response = await lecturerAction.getLecturerMember(
          user_type,
          proposal_suggestion_id,
          setLoading
        );

        // check if user included in proposal suggestion
        if (response.success) {
          const allowed = response.data.some(
            (lecturer: any) => lecturer.lecturer_id === session?.lecturer_id
          );

          if (!allowed) {
            showNotification({
              status: "warning",
              message:
                "Anda bukan anggota usulan ini, mengalihkan ke halaman dashboard",
            });
            router.push("/dashboard");
            return;
          }

          setIsAllowed(true);
        }

        // kaprodi user type
      } else if (user_type == "kaprodi") {
        const response = await proposalSuggestionAction.getById(
          user_type,
          proposal_suggestion_id.toString(),
          setLoading
        );

        if (response.success) {
          if (response.data.department_id == session?.department_id!) {
            setIsAllowed(true);
          } else {
            showNotification({
              status: "warning",
              message:
                "Anda bukan kaprodi terkait usulan ini, mengalihkan ke halaman dashboard",
            });
            router.push("/dashboard");
            return;
          }
        }

        // ketua user type
      } else if (user_type == "ketua_rg") {
        const response = await proposalSuggestionAction.getById(
          user_type,
          proposal_suggestion_id.toString(),
          setLoading
        );

        if (response.success) {
          if (response.data.research_group_id == session?.research_group_id!) {
            setIsAllowed(true);
          } else {
            showNotification({
              status: "warning",
              message:
                "Anda bukan ketua research group terkait usulan ini, mengalihkan ke halaman dashboard",
            });
            router.push("/dashboard");
            return;
          }
        }
      } else if (user_type == "admin") {
        setIsAllowed(true);
        setLoading(false);
      }
    },
    [usulan_id, session]
  );

  // Menentukan tab aktif berdasarkan URL 
  const activeTab =
    TabMenus.find((tab) => pathname.includes(tab.value))?.value || "overview";

  const handleTabChange = (value: string | null) => {
    router.push(`/usulan/${usulan_id}/${value}`);
  };

  useEffect(() => {
    if (!sessionLoading && session?.user_type && usulan_id) {
      checkProposalSuggestionPermission(session.user_type, usulan_id);
    }
  }, [
    sessionLoading,
    checkProposalSuggestionPermission,
    session?.user_type,
    usulan_id,
  ]);

  return (
    <div className="px-4 py-6">
      <Skeleton visible={sessionLoading || loading}>
        {isAllowed && !loading && !sessionLoading && (
          <>
            {/* Tabs Navigation */}
            <div className="bg-white shadow-md rounded-lg">
              <Tabs
                defaultValue="overview"
                value={activeTab}
                onChange={(value) => handleTabChange(value)}
              >
                <Tabs.List className="flex border-b border-gray-200">
                  {TabMenus.map((tab: any) => (
                    <Tabs.Tab
                      key={tab.value}
                      value={tab.value}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none"
                    >
                      {tab.tabName}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>
            </div>

            {/* Tab Content */}
            <div className="bg-white shadow rounded-lg mt-4">{children}</div>
          </>
        )}
      </Skeleton>
    </div>
  );
}
