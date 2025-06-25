import { Button, Card, Group, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { final_report, user_type } from "prisma/interfaces";
import { useState } from "react";
import finalReportAction from "src/action/finalReportAction";
import DeleteConfirmationModal from "src/components/modal/confirmation/DeleteConfirmationModal";
import ModalComponent from "src/components/modal/modal";
import EditFinalReportModal from "src/components/modal/proposal_suggestion/EditFinalReportModal";

interface FinalReportCardProps {
  final_report: final_report;
  onSuccess: () => void;
  user_type: user_type;
  editable: boolean;
  showNotification?: any;
  setLoading: (loading: boolean) => void;
}

const FinalReportCard: React.FC<FinalReportCardProps> = ({
  final_report,
  onSuccess,
  user_type,
  editable,
  showNotification,
  setLoading,
}) => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [finalReportToDelete, setFinalReportToDelete] = useState<final_report | null>(null); 

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
    const response = await finalReportAction.deleteFinalReport(
      finalReportToDelete?.id!,
      finalReportToDelete?.proposal_suggestion_id!,
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

  const openDeleteModal = (final_report: final_report) => {
    setFinalReportToDelete(final_report);
    setDeleteModalOpened(true);
  };

  return (
    <>
    <DeleteConfirmationModal
      opened={deleteModalOpened}
      onClose={() => setDeleteModalOpened(false)}
      onConfirm={confirmDelete}
      itemName={final_report?.name || 'Laporan Akhir'}
    />

      <Card
        key={final_report.id}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <Group justify="space-between">
          <Group gap="sm">
            <IconFile size={24} />
            <div>
              <Text fw={500}>{final_report.name}</Text>
              <Text size="sm" c="dimmed">
                {final_report.description}
              </Text>
            </div>
          </Group>

          <Group gap="xs">
            <ModalComponent
              title={final_report.file_url ? "Edit Laporan" : "Tambah Laporan"}
              disabled={!editable}
            >
              {(close) => (
                <EditFinalReportModal
                  final_report={final_report}
                  user_type={user_type}
                  onClose={close}
                  onSuccess={onSuccess}
                />
              )}
            </ModalComponent>
            <Button
              variant="outline"
              onClick={() => handleView(final_report.file_url)}
              disabled={!final_report.file_url}
            >
              Lihat Laporan
            </Button>
            {final_report.file_url && user_type === "lecturer" && (
              <Button
                variant="outline"
                color="red"
                onClick={() => openDeleteModal(final_report)}
                disabled={!editable}
              >
                Hapus Laporan
              </Button>
            )}
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default FinalReportCard;
