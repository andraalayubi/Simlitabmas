"use client";

import { useSession } from "src/components/session/session";
import LoadingPage from "src/components/Loading/LoadingPage";
import { useEffect } from "react";
import AddtionalDocumentAdmin from "./_admin";
import AddtionalDocumentKaprodi from "./_kaprodi";
import AddtionalDocumentKetuaRG from "./_ketua_rg";
import AddtionalDocumentLecturer from "./_lecturer";

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

  useEffect(() => {
    if (!sessionLoading) {
      //   fetchDetailUsulanByUsulanId();
    }
  }, [sessionLoading]);

  if (sessionLoading) {
    return <LoadingPage />;
  }

  if (session?.user_type == "admin") {
    return <AddtionalDocumentAdmin session={session} handleView={handleView} />;
  } else if (session?.user_type == "lecturer") {
    return <AddtionalDocumentLecturer session={session} handleView={handleView} />;
  } else if (session?.user_type == "ketua_rg") {
    return <AddtionalDocumentKetuaRG session={session} handleView={handleView} />;
  } else if (session?.user_type == "kaprodi") {
    return <AddtionalDocumentKaprodi session={session} handleView={handleView} />;
  }
}
