"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "src/components/session/session";
import { Tabs } from "@mantine/core";

const TabMenus = [
  { value: "tahun_usulan", path: "tahun_usulan", tabName: "Tahun Usulan" },
  { value: "rekap_progres", path: "rekap_progres", tabName: "Rekap Progres" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // comment because audit only acces by admin and have protected in middleware
  //   useEffect(() => {
  //     if (!sessionLoading) {
  //       setLoading(false);
  //     }
  //   }, [sessionLoading]);

  const activeTab =
    TabMenus.find((tab) => pathname.includes(tab.value))?.value;

  const handleTabChange = (value: string | null) => {
    console.log(value, activeTab);
    router.push(`/master/tahun/${value}`);

  };

  return (
    <>
      <div className="px-4 py-6">
        <div className="flex justify-between bg-white shadow-md rounded-lg">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onChange={(value) => handleTabChange(value)}
            className="mt-2"
          >
            <Tabs.List className="flex border-b border-gray-200">
              {TabMenus.map((tab) => (
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

        {/* Child component */}
        <div className="bg-white shadow rounded-lg">{children}</div>
      </div>
    </>
  );
}
