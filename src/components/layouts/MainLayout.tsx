"use client";

import React, { useEffect } from "react";
import {
  MantineProvider,
  MantineThemeOverride,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SessionPayload } from "src/lib/encrypt";

const theme: MantineThemeOverride = {};

interface MainLayoutProps {
  session?: any; 
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ session, children }) => {
  const [opened, { toggle, close }] = useDisclosure(true);
  const mantineTheme = useMantineTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= parseFloat(mantineTheme.breakpoints.sm) * 16) {
        close();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [close, toggle, mantineTheme.breakpoints.sm]);

  return (
    <div className="w-full min-h-screen bg-white">
      <Sidebar session={session} opened={opened} toggle={toggle} />
      <div
        className={`transition-all duration-500 ${
          opened ? "ml-64" : "ml-16"
        } flex-1`}
      >
        <Header session={session} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
