"use client";

import React, { useEffect, useState } from "react";
import { Anchor, Breadcrumbs, Tabs } from "@mantine/core";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "@/app/components/session/session";
import LoadingPage from "@/app/components/usulan/LoadingPage";

// Data breadcrumbs untuk navigasi
const BreadcrumbItems = [
  { title: "Usulan", href: "/usulan2/penelitian" },
  { title: "Penelitian", href: "/usulan2/penelitian" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

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
    router.push(`/usulan2/penelitian/${usulan_id}/${value}`);
  };

  return (
    <div>
      {/* Breadcrumb navigation */}
      <nav className="text-sm text-gray-600 mb-4">
        <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
          {BreadcrumbItems}
        </Breadcrumbs>
      </nav>

      {/* Tabs navigation */}
      <div className="bg-white shadow rounded-lg py-6">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onChange={(value) => handleTabChange(value)}
        >
          <Tabs.List grow>
            {TabMenus.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab.tabName}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </div>

      {/* Child component */}
      <div className="mt-4">{children}</div>
    </div>
  );
}
