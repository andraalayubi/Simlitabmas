import { external_document, user_type } from "prisma/interfaces";
import { Button, Card, Group, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import ModalComponent from "src/components/modal/modal";
import EditExternalDocumentModal from "src/components/modal/proposal_suggestion/EditExternalDocumentModal";
import DeleteConfirmationModal from "src/components/modal/confirmation/DeleteConfirmationModal";
import { useState } from "react";
import externalDocumentAction from "src/action/externalDocumentAction";

interface ExternalDucmentCardProps {
  external_document: external_document;
  onSuccess: () => void;
  user_type: user_type;
  editable: boolean;
  showNotification?: any;
  setLoading: (loading: boolean) => void;
}

const ExternalDocumentCard: React.FC<ExternalDucmentCardProps> = ({
  external_document,
  onSuccess,
  user_type,
  editable,
  showNotification,
  setLoading,
}) => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [externalDocumentToDelete, setExternalDocumentToDelete] =
    useState<external_document | null>(null);

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

  const confirmDelete = async () => {
    const response = await externalDocumentAction.deleteExternalDocument(
      externalDocumentToDelete?.id!,
      externalDocumentToDelete?.proposal_suggestion_id!,
      user_type,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      onSuccess();
    } else {
      showNotification({ status: "error", message: response.message });
    }

    setDeleteModalOpened(false);
  };

  const openDeleteModal = (external_document: external_document) => {
    setExternalDocumentToDelete(external_document);
    setDeleteModalOpened(true);
  };

  return (
    <>
      <DeleteConfirmationModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={confirmDelete}
        itemName={external_document?.name || "Luaran"}
      />

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
                {external_document.status}
              </Text>
              <Text size="sm" c="dimmed">
                Kategori Luaran : {external_document.category_name}
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
            { user_type === "lecturer" && (
              <Button
                variant="outline"
                color="red"
                onClick={() => openDeleteModal(external_document)}
                disabled={!editable}
              >
                Hapus Luaran
              </Button>
            )}
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default ExternalDocumentCard;
