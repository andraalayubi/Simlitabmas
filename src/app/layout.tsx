import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Notifications } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.SCHOOL_NAME,
  icons: {
    icon: "/favicon.png",
  },
};

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-react-table/styles.css';
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
