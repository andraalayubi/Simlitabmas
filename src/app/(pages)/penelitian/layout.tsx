"use client";

import React, {  } from "react";
import { Skeleton, Tabs } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "src/components/session/session";

const TabMenus = [
  { value: "usulan_saya", path: "usulan_saya", tabName: "Usulan Saya" },
  { value: "semua_usulan", path: "semua_usulan", tabName: "Semua Usulan" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Menentukan tab aktif berdasarkan URL
  const activeTab =
    TabMenus.find((tab) => pathname.includes(tab.value))?.value || "usulan_saya";

  const handleTabChange = (value: string | null) => {
    router.push(`/penelitian/${value}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
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
