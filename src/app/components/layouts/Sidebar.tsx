"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Burger } from "@mantine/core";
import Link from "next/link";
import { SessionPayload } from "src/lib/encrypt";

interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  session?: SessionPayload;
  opened: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ session, opened, toggle }) => {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(session?.user_type || "");


  const adminMenu: MenuItem[] = [
    { name: "Dashboard", icon: "", path: "/dashboard" },
    { name: "Penelitian", icon: "", path: "/penelitian" },
    { name: "Pengmas", icon: "", path: "/pengmas" },
    { name: "Skema", icon: "", path: "/audit/skema" },
    { name: "Akun", icon: "", path: "/audit/akun" },
    { name: "Tahun", icon: "", path: "/audit/tahun" },
  ];

  const kaprodiMenu: MenuItem[] = [
    { name: "Dashboard", icon: "", path: "/dashboard" },
    { name: "Penelitian", icon: "", path: "/penelitian" },
    { name: "Pengmas", icon: "", path: "/pengmas" },
    { name: "Prodi", icon: "", path: "/prodi" },
  ];

  const rgMenu: MenuItem[] = [
    { name: "Dashboard", icon: "", path: "/dashboard" },
    { name: "Penelitian", icon: "", path: "/penelitian" },
    { name: "Pengmas", icon: "", path: "/pengmas" },
    { name: "Research Group", icon: "", path: "/rg" },
  ];

  const dosenMenu: MenuItem[] = [
    { name: "Dashboard", icon: "", path: "/dashboard" },
    { name: "Penelitian", icon: "", path: "/penelitian" },
    { name: "Pengmas", icon: "", path: "/pengmas" },
  ];

  const getMenuItems = (role: string): MenuItem[] => {
    switch (role) {
      case "admin":
        return adminMenu;
      case "kaprodi":
        return kaprodiMenu;
      case "ketua_rg":
        return rgMenu;
      default:
        return dosenMenu;
    }
  };

  const menuItems = getMenuItems(role ?? "");

  const getSectionTitle = (): string => {
    switch (role) {
      case "admin":
        return "AUDIT";
      case "kaprodi":
        return "PRODI";
      case "ketua_rg":
        return "RESEARCH GROUP";
      default:
        return "";
    }
  };

  const sectionTitle = getSectionTitle();

  return (
    <div
      className={`fixed h-full bg-white shadow-md p-2 transition-width duration-500 ${
        opened ? "w-64" : "w-16"
      }`}
    >
      <div className="flex justify-between items-center gap-6 m-3">
        <Burger opened={opened} onClick={toggle} size="md" />
        {opened && <h1 className="text-xl font-bold">PERGURUAN TINGGI</h1>}
      </div>
      {opened && (
        <>
          <div className="mb-4">
            <Link key={menuItems[0].name} href={menuItems[0].path}>
              <div
                className={`flex items-center p-2 mb-2 cursor-pointer rounded ${
                  pathname === menuItems[0].path
                    ? "bg-blue-800 text-white"
                    : "text-gray-400 hover:bg-gray-200"
                }`}
              >
                <span className="material-icons mr-2">{menuItems[0].icon}</span>
                {opened && menuItems[0].name}
              </div>
            </Link>
          </div>
          <h3 className={`text-md font-semibold mb-1 ${!opened && "hidden"}`}>
            KATEGORI
          </h3>
          <hr
            className={`border-t-2 border-black mb-1 ${!opened && "hidden"}`}
          />
          <div className="mb-4">
            {menuItems.slice(1, 3).map((item) => (
              <Link key={item.name} href={item.path}>
                <div
                  className={`flex items-center p-1 mb-1 cursor-pointer rounded ${
                    pathname.startsWith(item.path)
                      ? "bg-blue-800 text-white"
                      : "text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  <span className="material-icons mr-2">{item.icon}</span>
                  {opened && item.name}
                </div>
              </Link>
            ))}
          </div>
          {role !== "dosen" && (
            <>
              <h2
                className={`text-md font-semibold mb-1 ${!opened && "hidden"}`}
              >
                {sectionTitle}
              </h2>
              <hr
                className={`border-t-2 border-black mb-1 ${
                  !opened && "hidden"
                }`}
              />
              {menuItems.slice(3).map((item) => (
                <Link key={item.name} href={item.path}>
                  <div
                    className={`flex items-center p-1 mb-1 cursor-pointer rounded ${
                      pathname === item.path
                        ? "bg-blue-800 text-white"
                        : "text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    <span className="material-icons mr-2">{item.icon}</span>
                    {opened && item.name}
                  </div>
                </Link>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
