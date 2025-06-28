import { Button, Card, Group, Text } from "@mantine/core";
import { IconFile, IconTrash } from "@tabler/icons-react";
import { logbook, user_type } from "prisma/interfaces";
import { useState } from "react";
import logbookAction from "src/action/logbookAction";
import EditLogbookModal from "src/components/modal/proposal_suggestion/EditLogbookModal";
import ModalComponent from "src/components/modal/modal";
import DeleteConfirmationModal from "src/components/modal/confirmation/DeleteConfirmationModal";

interface LogbookCardProps {
  logbook: logbook;
  onSuccess: () => void;
  user_type: user_type;
  editable: boolean;
  showNotification?: any;
  setLoading: (loading: boolean) => void;
}

const LogbookCard: React.FC<LogbookCardProps> = ({
  logbook,
  onSuccess,
  user_type,
  editable,
  showNotification,
  setLoading,
}) => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [logbookToDelete, setLogbookToDelete] = useState<logbook | null>(null);

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
    const response = await logbookAction.deleteLogbook(
      logbookToDelete?.id!,
      logbookToDelete?.proposal_suggestion_id!,
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

  const openDeleteModal = (logbook: logbook) => {
    setLogbookToDelete(logbook);
    setDeleteModalOpened(true);
  };
  console.log(user_type);
  

  return (
    <>
      <DeleteConfirmationModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={confirmDelete}
        itemName={logbook?.name || 'Logbook'}
      />

      <Card key={logbook.id} shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between">
          <Group gap="sm">
            <IconFile size={24} />
            <div>
              <Text fw={500}>{logbook.name}</Text>
              <Text size="sm" c="dimmed">
                {logbook.description}
              </Text>
            </div>
          </Group>

          <Group gap="xs">
            <ModalComponent
              title={logbook.file_url ? "Edit Logbook" : "Tambah Logbook"}
              disabled={!editable}
            >
              {(close) => (
                <EditLogbookModal
                  logbook={logbook}
                  user_type={user_type}
                  onClose={close}
                  onSuccess={onSuccess}
                />
              )}
            </ModalComponent>
            <Button
              variant="outline"
              onClick={() => handleView(logbook.file_url)}
              disabled={!logbook.file_url}
            >
              Lihat Logbook
            </Button>
            {logbook.file_url && user_type === "lecturer" && (
              <Button
                variant="outline"
                color="red"
                onClick={() => openDeleteModal(logbook)}
                disabled={!editable}
              >
                Hapus Logbook
              </Button>
            )}
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default LogbookCard;
