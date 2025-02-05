"use client";

import React, { useEffect, useState } from "react";
import { Anchor, Breadcrumbs, Tabs } from "@mantine/core";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "@/app/components/session/session";
import LoadingPage from "@/app/components/usulan/LoadingPage";

// Data tab menu
const TabMenus = [
  { value: "overview", path: "overview", tabName: "Overview" },
  { value: "proposal", path: "proposal", tabName: "Proposal" },
  { value: "anggota", path: "anggota", tabName: "Anggota" },
  { value: "biaya", path: "biaya", tabName: "Biaya" },
  { value: "luaran", path: "luaran", tabName: "Luaran" },
  { value: "logbook", path: "logbook", tabName: "Logbook" },
  {
    value: "dokumen_tambahan",
    path: "dokumen_tambahan",
    tabName: "Dokumen Tambahan",
  },
  { value: "laporan_akhir", path: "laporan_akhir", tabName: "Laporan Akhir" },
  { value: "evaluasi", path: "evaluasi", tabName: "Evaluasi" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const usulan_id = params.usulan_id;

  useEffect(() => {
    if (!sessionLoading) {
      setLoading(false);
    }
  }, [sessionLoading]);

  if (sessionLoading || loading) {
    return <LoadingPage />;
  }

  // Menentukan tab aktif berdasarkan URL
  const activeTab =
    TabMenus.find((tab) => pathname.includes(tab.value))?.value || "overview";

  const handleTabChange = (value: string | null) => {
    router.push(`/usulan/${usulan_id}/${value}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
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
      <div className="bg-white shadow rounded-lg mt-4">
        {children}
      </div>
    </div>
  );
};
