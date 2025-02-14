// components/PdfViewer.tsx
'use client'

import React from "react";
import { Paper, Box, Text } from "@mantine/core";

interface PdfViewerProps {
  pdfUrl: string | null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        shadow="lg"
        radius="md"
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="PDF Viewer"
          />
        ) : (
          <Text color="orange" size="lg">
            PDF tidak tersedia
          </Text>
        )}
      </Paper>
    </Box>
  );
};

export default PdfViewer;
