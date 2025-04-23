import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Burger, ScrollArea } from "@mantine/core";
import Link from "next/link";
import { SessionPayload } from "src/lib/encrypt";
import {
  IconLayoutDashboard,
  IconMicroscope,
  IconUsers,
  IconBook,
  IconSchool,
  IconCalendar,
  IconUser,
  IconBuildingCommunity,
  IconUserHeart,
  IconUserStar,
  IconTopologyStar,
  IconBooks,
} from "@tabler/icons-react";

// Tipe data untuk konfigurasi menu
type MenuSection = {
  title?: string;
  items: MenuItem[];
};

type MenuItem = {
  name: string;
  icon: JSX.Element;
  path: string;
  exact?: boolean;
};

// Konfigurasi menu untuk semua role
const MENU_CONFIG: Record<string, MenuSection[]> = {
  admin: [
    {
      items: [
        {
          name: "Dashboard",
          icon: <IconLayoutDashboard />,
          path: "/dashboard",
          exact: true,
        },
      ],
    },
    {
      title: "USULAN",
      items: [
        {
          name: "Penelitian",
          icon: <IconMicroscope />,
          path: "/penelitian",
        },
        {
          name: "Pengmas",
          icon: <IconUsers />,
          path: "/pengmas",
        },
      ],
    },
    {
      title: "MASTER",
      items: [
        {
          name: "Skema",
          icon: <IconBook />,
          path: "/master/skema",
        },
        {
          name: "Research Group",
          icon: <IconBuildingCommunity />,
          path: "/master/research_group",
        },
        {
          name: "Program Studi",
          icon: <IconSchool />,
          path: "/master/department",
        },
        {
          name: "Tahun",
          icon: <IconCalendar />,
          path: "/master/tahun",
        },
      ],
    },
    {
      title: "LAPORAN",
      items: [
        {
          name: "Dosen",
          icon: <IconUserStar />,
          path: "/report/lecturer",
        },
        {
          name: "Research Group",
          icon: <IconTopologyStar />,
          path: "/report/research_group",
        },
        {
          name: "Program Studi",
          icon: <IconBooks />,
          path: "/report/department",
        },
      ],
    },
    {
      title: "KONFIGURASI",
      items: [
        {
          name: "User",
          icon: <IconUser />,
          path: "/konfigurasi/user",
        },
      ],
    },
  ],
  kaprodi: [
    {
      items: [
        {
          name: "Dashboard",
          icon: <IconLayoutDashboard />,
          path: "/dashboard",
          exact: true,
        },
      ],
    },
    {
      title: "USULAN",
      items: [
        {
          name: "Pengmas",
          icon: <IconUsers />,
          path: "/pengmas",
        },
      ],
    },
    {
      title: "PRODI",
      items: [
        {
          name: "Prodi",
          icon: <IconSchool />,
          path: "/prodi",
        },
      ],
    },
  ],
  ketua_rg: [
    {
      items: [
        {
          name: "Dashboard",
          icon: <IconLayoutDashboard />,
          path: "/dashboard",
          exact: true,
        },
      ],
    },
    {
      title: "USULAN",
      items: [
        {
          name: "Penelitian",
          icon: <IconMicroscope />,
          path: "/penelitian",
        },
        {
          name: "Pengmas",
          icon: <IconUsers />,
          path: "/pengmas",
        },
      ],
    },
    {
      title: "RESEARCH GROUP",
      items: [
        {
          name: "Research Group",
          icon: <IconBuildingCommunity />,
          path: "/rg",
        },
      ],
    },
  ],
  lecturer: [
    {
      items: [
        {
          name: "Dashboard",
          icon: <IconLayoutDashboard />,
          path: "/dashboard",
          exact: true,
        },
      ],
    },
    {
      title: "USULAN",
      items: [
        {
          name: "Penelitian",
          icon: <IconMicroscope />,
          path: "/penelitian",
        },
        {
          name: "Pengmas",
          icon: <IconUsers />,
          path: "/pengmas",
        },
      ],
    },
  ],
};

interface SidebarProps {
  session?: SessionPayload;
  opened: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ session, opened, toggle }) => {
  const pathname = usePathname();
  const role = session?.user_type!;
  const menuSections = MENU_CONFIG[role] || MENU_CONFIG.dosen;

  const isActive = (item: MenuItem) => {
    return item.exact ? pathname === item.path : pathname.startsWith(item.path);
  };

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
        <div className="overflow-y-auto h-[calc(100vh-100px)]">
          {menuSections.map((section, index) => (
            <div key={index} className="mb-4">
              {/* Section Title */}
              {section.title && (
                <>
                  <h2 className="text-md font-semibold mb-1">
                    {section.title}
                  </h2>
                  <hr className="border-t-2 border-black mb-2" />
                </>
              )}

              {/* Menu Items */}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <div
                      className={`flex items-center p-2 cursor-pointer rounded ${
                        isActive(item)
                          ? "bg-blue-800 text-white"
                          : "text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {opened && item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
