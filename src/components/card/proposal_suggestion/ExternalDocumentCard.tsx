import { external_document, user_type } from "prisma/interfaces";
import { Button, Card, Group, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import ModalComponent from "src/components/modal/modal";
import EditExternalDocumentModal from "src/components/modal/proposal_suggestion/EditExternalDocumentModal";

interface ExternalDucmentCardProps {
  external_document: external_document;
  onSuccess: () => void;
  user_type: user_type;
  editable: boolean;
}

const ExternalDocumentCard: React.FC<ExternalDucmentCardProps> = ({
  external_document,
  onSuccess,
  user_type,
  editable,
}) => {
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

  return (
    <>
      <Card
        key={external_document.id}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <Group justify="space-between">
          <Group gap="sm">
            <IconFile size={24} />
            <div>
              <Text fw={500}>{external_document.name}</Text>
              <Text size="sm" c="dimmed">
                {external_document.description}
              </Text>
              <Text size="sm" c="dimmed">
                {external_document.status}
              </Text>
              <Text size="sm" c="dimmed">
                Kategori Luaran :{" "}
                {external_document.external_document_category?.name}
              </Text>
            </div>
          </Group>

          <Group gap="xs">
            <ModalComponent title="Edit Luaran" disabled={!editable}>
              {(close) => (
                <EditExternalDocumentModal
                  external_document={external_document}
                  user_type={user_type}
                  onClose={close}
                  onSuccess={onSuccess}
                />
              )}
            </ModalComponent>
            <Button
              variant="outline"
              onClick={() => handleView(external_document.file_url)}
              disabled={!external_document.file_url}
            >
              Lihat Luaran
            </Button>
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default ExternalDocumentCard;
