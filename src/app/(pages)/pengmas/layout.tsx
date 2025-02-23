"use client";

import React, { useEffect, useState } from "react";
import { Anchor, Breadcrumbs, Skeleton, Tabs } from "@mantine/core";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/usulan/LoadingPage";
import ModalComponent from "src/components/modal/modal";
import ProposalSuggestionModal from "src/components/modal/proposal_suggestion/proposal_suggesion";

const TabMenus = [
  { value: "usulan_saya", path: "usulan_saya", tabName: "Usulan Saya" },
  { value: "semua_usulan", path: "semua_usulan", tabName: "Semua Usulan" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // Menentukan tab aktif berdasarkan URL
  const activeTab =
    TabMenus.find((tab) => pathname.includes(tab.value))?.value || "usulan_saya";

  const handleTabChange = (value: string | null) => {
    router.push(`/pengmas/${value}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tabs navigation */}
      <Skeleton visible={sessionLoading}>
        <div className="flex justify-between bg-white shadow-md rounded-lg">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onChange={(value) => handleTabChange(value)}
            className="mt-2"
          >
            <Tabs.List className="flex">
              {TabMenus.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  {tab.tabName}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
          {session?.user_type === "lecturer" && (
            <ModalComponent title="Buat Usulan">
              {(close) => (
                <ProposalSuggestionModal
                  onClose={close}
                  user_type={session?.user_type!}
                  lecturer_id={session?.lecturer_id!}
                  showResearchGroup={false}
                  type="pengmas"
                />
              )}
            </ModalComponent>
          )}
        </div>
      </Skeleton>

      {/* Child component */}
      <div className="">{children}</div>
    </div>
  );
}
