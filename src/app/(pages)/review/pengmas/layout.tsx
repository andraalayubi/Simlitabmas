"use client";

import React, {  } from "react";
import { Skeleton, Tabs } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "src/components/session/session";
import { evaluation_phase } from "prisma/interfaces";

export const phase_LABEL: Record<evaluation_phase, string> = {
  evaluasi_proposal: "Evaluasi Proposal",
  evaluasi_monev: "Evaluasi Monev",
  evaluasi_akhir: "Evaluasi Akhir"
};

const TabMenus = Object.keys(phase_LABEL).map((key) => ({
  value: key,
  tabName: phase_LABEL[key as evaluation_phase],
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Menentukan tab aktif berdasarkan URL
  const activeTab =
    TabMenus.find((tab) => pathname.includes(tab.value))?.value || "pengmas";

  const handleTabChange = (value: string | null) => {
    router.push(`/review/pengmas/${value}`);
  };

  return (
    <div className="px-4 py-6">
      {/* Tabs navigation */}
      <Skeleton visible={sessionLoading}>
        {/* <div className="flex justify-between shadow-md rounded-lg"> */}
          <Tabs
            defaultValue="usulan_saya"
            value={activeTab}
            onChange={(value) => handleTabChange(value)}
            className="mt-0"
          >
            <Tabs.List className="flex border-b border-gray-200">
              {TabMenus.map((tab) => (
                <Tabs.Tab
                  key={tab.value}
                  value={tab.value}
                  className={`${tab.value === activeTab ? "bg-gray-100" : ""}`}
                >
                  {tab.tabName}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
        {children}
      </Skeleton>
    </div>
  );
}
