"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Skeleton, Tabs } from "@mantine/core";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "src/components/session/session";
import { evaluation, lecturer, user_type } from "prisma/interfaces";
import useNotification from "src/components/notification/notification";

// Data tab menu
const TabMenus = [
  { value: "overview", path: "overview", tabName: "Overview" },
  { value: "proposal", path: "proposal", tabName: "Proposal" },
  // { value: "anggota", path: "anggota", tabName: "Anggota" },
  { value: "luaran", path: "luaran", tabName: "Luaran" },
  { value: "logbook", path: "logbook", tabName: "Logbook" },
  {
    value: "dokumen_tambahan",
    path: "dokumen_tambahan",
    tabName: "Dokumen Tambahan",
  },
  { value: "monev", path: "monev", tabName: "Monev" },
  { value: "laporan_akhir", path: "laporan_akhir", tabName: "Laporan Akhir" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);
  const [lecturer, setLecturer] = useState<evaluation | null>();
  const router = useRouter();
  const pathname = usePathname();
  const { showNotification } = useNotification();
  const params = useParams();
  const id = parseInt(params.id as string);

  // Menentukan tab aktif berdasarkan URL
  const activeTab =
    TabMenus.find((tab) => pathname.includes(tab.value))?.value || "overview";

  const handleTabChange = (value: string | null) => {
    router.push(`/evaluasi_usulan/${id}/${value}`);
  };

  useEffect(() => {}, []);

  return (
    <div className="px-4 py-6">
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
    </div>
  );
}
