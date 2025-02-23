"use client";

import React from "react";
import { Anchor, Breadcrumbs, Skeleton, Tabs } from "@mantine/core";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useSession } from "src/components/session/session";
import ModalComponent from "src/components/modal/modal";
import ProposalSuggestionModal from "src/components/modal/proposal_suggestion/proposal_suggesion";
import {
  ProposalSuggestionProvider,
  useProposalSuggestion,
} from "src/context/proposalSuggestion";

const TabMenus = [
  { value: "usulan_saya", path: "usulan_saya", tabName: "Usulan Saya" },
  { value: "semua_usulan", path: "semua_usulan", tabName: "Semua Usulan" },
];

// Buat komponen terpisah untuk konten utama
const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { session, loading: sessionLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { addProposalSuggestion } = useProposalSuggestion();

  const activeTab =
    TabMenus.find((tab) => pathname.includes(tab.value))?.value ||
    "usulan_saya";

  const handleTabChange = (value: string | null) => {
    router.push(`/penelitian/${value}`);
  };

  const handleSuccess = (newProposal: any) => {
    addProposalSuggestion(newProposal);
  };

  return (
    <>
      <Skeleton visible={sessionLoading}>
        <div className="flex justify-between shadow-md rounded-lg">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onChange={(value) => handleTabChange(value)}
            className="mt-0"
          >
            <Tabs.List className="flex border-b border-gray-200">
              {TabMenus.map((tab) => (
                <Tabs.Tab
                  key={tab.value}
                  value={tab.value}
                  className={`${
                    tab.value === activeTab ? "bg-gray-100" : ""
                  }`}
                >
                  {tab.tabName}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs>
          {(session?.user_type === "ketua_rg" ||
            session?.user_type === "lecturer") && (
            <ModalComponent title="Buat Usulan">
              {(close) => (
                <ProposalSuggestionModal
                  user_type={session?.user_type!}
                  lecturer_id={session?.lecturer_id!}
                  onClose={close}
                  showResearchGroup={true}
                  type="penelitian"
                  onSuccess={handleSuccess}
                />
              )}
            </ModalComponent>
          )}
        </div>
      </Skeleton>

      <div className="">{children}</div>
    </>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <ProposalSuggestionProvider>
        <LayoutContent>{children}</LayoutContent>
      </ProposalSuggestionProvider>
    </div>
  );
}