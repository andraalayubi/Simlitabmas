import { Button, Card, Group, Text, Modal } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { additional_document, user_type } from "prisma/interfaces";
import { useState } from "react";
import additionalDocumentAction from "src/action/additionalDocumentAction";
import DeleteConfirmationModal from "src/components/modal/confirmation/DeleteConfirmationModal";
import AdditionalDocumentUpdateModal from "src/components/modal/proposal_suggestion/EditAdditionalDocumentModal";

interface AdditionalDocumentCardProps {
  document: additional_document;
  onSuccess: () => void;
  user_type: user_type;
  editable: boolean;
  showNotification?: any;
  setLoading: (loading: boolean) => void;
  handleView?: (fileUrl: string) => void;
}

const AdditionalDocumentCard: React.FC<AdditionalDocumentCardProps> = ({
  document,
  onSuccess,
  user_type,
  editable,
  showNotification,
  setLoading,
  handleView: propHandleView,
}) => {
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleViewClick = (url: string | null) => {
    if (url) {
      if (propHandleView) {
        propHandleView(url);
      } else {
        const pdfUrl = `/api/file?name=${url}`;
        window.open(pdfUrl, '_blank');
      }
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    const response = await additionalDocumentAction.deleteAdditionalDocument(
      document.id,
      document.proposal_suggestion_id.toString(),
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

  return (
    <>
      <DeleteConfirmationModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={confirmDelete}
        itemName={document?.name || 'dokumen ini'}
      />

      <Modal 
        opened={updateModalOpen} 
        onClose={() => setUpdateModalOpen(false)}
        title="Ubah Dokumen Tambahan"
        size="lg"
      >
        <AdditionalDocumentUpdateModal
          opened={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          user_type={user_type}
          proposal_suggestion_id={document.proposal_suggestion_id.toString()}
          fetchDokumens={onSuccess}
          loading={false}
          dokumen={document}
        />
      </Modal>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between">
          <Group gap="sm">
            <IconFile size={24} />
            <div>
              <Text fw={500}>{document.name}</Text>
              <Text size="sm" c="dimmed">
                {document.content || 'Tidak ada deskripsi'}
              </Text>
            </div>
          </Group>

          <Group gap="xs">
            <Button
              variant="outline"
              onClick={() => handleViewClick(document.file_url)}
              disabled={!document.file_url}
            >
              Lihat Dokumen
            </Button>
            {editable && user_type === "lecturer" && (
              <>
                <Button
                  variant="outline"
                  color="yellow"
                  onClick={() => setUpdateModalOpen(true)}
                >
                  Ubah
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => setDeleteModalOpened(true)}
                >
                  Hapus
                </Button>
              </>
            )}
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default AdditionalDocumentCard;
