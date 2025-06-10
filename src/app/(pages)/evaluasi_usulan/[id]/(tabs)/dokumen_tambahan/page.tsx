"use client";

import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/Loading/LoadingPage";
import { useEffect } from "react";
import AddtionalDocumentAdmin from "./_admin";
import AddtionalDocumentLecturer from "./_lecturer";
import React from "react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { Button } from "@mantine/core";

interface Dokumen {
  id: number;
  name: string;
  fileUrl: string;
}

export default function DokumenTambahanPage() {
  const { session, loading: sessionLoading } = useSession();

  const handleView = (url: string | null) => {
    if (url) {
      const pdfUrl = `/api/file?name=${url}`;

      // Membuka tab baru dengan PDF viewer
      const viewerWindow = window.open("", "_blank");

      if (viewerWindow) {
        viewerWindow.document.write(`
        <html>
          <head>
            <title>PDF Viewer</title>
            <style>
              body { margin: 0; }
              iframe { width: 100%; height: 100vh; border: none; }
            </style>
          </head>
          <body>
            <iframe src="${pdfUrl}#toolbar=0"></iframe>
          </body>
        </html>
      `);
      }
    }
  };

  const columns = React.useMemo<MRT_ColumnDef<Dokumen>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nama Dokumen",
        size: 300,
      },
      {
        accessorKey: "file_url",
        header: "File",
        size: 150,
        Cell: ({ cell }) => (
          <Button
            variant="outline"
            onClick={() => handleView(cell.getValue<string>())}
            disabled={!cell.getValue<string>()}
          >
            Lihat Dokumen
          </Button>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    if (!sessionLoading) {
      //   fetchDetailUsulanByUsulanId();
    }
  }, [sessionLoading]);

  if (sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type == "admin") {
    return <AddtionalDocumentAdmin columns={columns} />;
  } else if (session?.user_type == "lecturer") {
    return <AddtionalDocumentLecturer session={session} handleView={handleView} />;
  }
}
