import { SessionPayload } from "src/lib/encrypt";
import { useState } from "react";
import {
  IconActivity,
  IconLogout,
  IconHeart,
  IconSettings,
  IconChevronDown,
  IconUserCog,
  IconUsersGroup,
  IconSettingsExclamation,
  IconClockHour2,
} from "@tabler/icons-react";
import {
  Avatar,
  Group,
  Text,
  Menu,
  rem,
  useMantineTheme,
  MenuDropdown,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import useNotification from "../notification/notification";

interface HeaderProps {
  session?: SessionPayload;
}

const menuProfiles = {
  admin: [
    {
      label: "Profile",
      icon: <IconUserCog />,
      color: "blue",
      route: "/profile",
    },
    {
      label: "Admin Settings",
      icon: <IconSettingsExclamation />,
      color: "blue",
      route: "/admin",
    },
  ],
  lecturer: [
    {
      label: "Profile",
      icon: <IconUserCog />,
      color: "blue",
      route: "/profile",
    },
  ],
  ketua_rg: [
    {
      label: "Profile",
      icon: <IconUserCog />,
      color: "blue",
      route: "/profile",
    },
  ],
  kaprodi: [
    {
      label: "Profile",
      icon: <IconUserCog />,
      color: "blue",
      route: "/profile",
    },
  ],
  default: [
    {
      label: "General Info",
      icon: <IconHeart />,
      color: "red",
      route: "/not-found",
    },
  ],
};

const menuSettings = {
  admin: [
    { label: "Config Settings", icon: <IconSettings />, color: "yellow" },
    { label: "Scheduler Settings", icon: <IconClockHour2 />, color: "blue" },
    { label: "Manage Users", icon: <IconUsersGroup />, color: "yellow" },
    { label: "Logs", icon: <IconActivity />, color: "yellow" },
  ],
  lecturer: [],
  ketua_rg: [
    {
      label: "Manage Research Groups",
      icon: <IconUsersGroup />,
      color: "yellow",
    },
  ],
  kaprodi: [
    { label: "Manage Departments", icon: <IconUsersGroup />, color: "yellow" },
  ],
  default: [{ label: "General Info", icon: <IconHeart />, color: "red" }],
};

const Header: React.FC<HeaderProps> = ({ session }) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const { showNotification } = useNotification();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const handleLogout = async () => {
    const response = await axios.post("/api/logout", {});
    if (response.status == 200) {
      showNotification({
        status: response.data.success ? "success" : "error",
        message: response.data.message,
      });
      router.push("/login");
    }
  };

  const greeting = session?.user_type
    ? `Selamat Datang, ${session.name}`
    : "Selamat Datang, Tamu";

  const title = (() => {
    console.log(session?.user_type);

    switch (session?.user_type) {
      case "admin":
        return "Administrator";
      case "lecturer":
        return "Gelar Dosen";
      case "ketua_rg":
        return "Ketua RG";
      case "kaprodi":
        return "Kepala Program Studi";
      default:
        return "Role Tidak Dikenal";
    }
  })();

  const itemsProfiles =
    menuProfiles[session?.user_type!] || menuProfiles.default;
  const itemsSettings =
    menuSettings[session?.user_type!] || menuSettings.default;

  return (
    <header className="bg-gray-50 p-5 flex justify-between items-center shadow-md max-h-24">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-800">{greeting}</h1>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
      <div>
        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-bottom-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal={false}
        >
          <Menu.Target>
            <Group
              variant="light"
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-all"
            >
              <Avatar
                src="/path-to-profile-image.jpg"
                alt="Profile"
                radius="xl"
                size={30}
              />
              <Text size="xl">{session?.name || "Pengguna"}</Text>
              <IconChevronDown
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            </Group>
          </Menu.Target>
          <MenuDropdown>
            <Menu.Label>Profiles</Menu.Label>
            {itemsProfiles.map((item, index) => (
              <Link href={item.route!}>
                <Menu.Item
                  key={index}
                  leftSection={React.cloneElement(item.icon, {
                    style: { width: rem(16), height: rem(16) },
                    color: theme.colors[item.color][6],
                    stroke: 1.5,
                  })}
                >
                  {item.label}
                </Menu.Item>
              </Link>
            ))}
            <Menu.Item
              onClick={handleLogout}
              leftSection={
                <IconLogout
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              }
            >
              Log Out
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Settings</Menu.Label>
            {itemsSettings.map((item, index) => (
              <Menu.Item
                key={index}
                leftSection={React.cloneElement(item.icon, {
                  style: { width: rem(16), height: rem(16) },
                  color: theme.colors[item.color][6],
                  stroke: 1.5,
                })}
              >
                {item.label}
              </Menu.Item>
            ))}
          </MenuDropdown>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
