"use client";

import React, { useEffect, useState } from "react";
import { Anchor, Breadcrumbs, Tabs } from "@mantine/core";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "@/app/components/session/session";
import LoadingPage from "@/app/components/usulan/LoadingPage";
import ModalComponent from "@/app/components/modal/modal";
import { ProposalSuggestionForm } from "@/app/components/modal/proposal_suggestion/_form";

const TabMenus = [
  { value: "usulan_saya", path: "usulan_saya", tabName: "Usulan Saya" },
  { value: "semua_usulan", path: "semua_usulan", tabName: "Semua Usulan" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

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
    router.push(`/penelitian/${value}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tabs navigation */}
      <div className="flex justify-between bg-white shadow-md rounded-lg">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onChange={(value) => handleTabChange(value)}
          className="mt-2"
        >
          <Tabs.List className="flex border-b border-gray-200">
            {TabMenus.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab.tabName}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
        <ModalComponent title="Buat Usulan">
          <ProposalSuggestionForm />
        </ModalComponent>
      </div>

      {/* Child component */}
      <div className="mt-4">{children}</div>
    </div>
  );
}
