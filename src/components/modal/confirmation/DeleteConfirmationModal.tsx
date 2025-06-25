import { Button, Group, Modal, Text } from "@mantine/core";

interface DeleteConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  confirmLabel?: string;
  cancelLabel?: string;
  message?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  opened,
  onClose,
  onConfirm,
  itemName,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  message = "Apakah Anda yakin ingin menghapus",
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Konfirmasi Hapus"
      centered
    >
      <Text size="sm" mb="lg">
        {message} <strong>{itemName}</strong>?
        <br />
        Tindakan ini tidak dapat dibatalkan.
      </Text>

      <Group justify="flex-end" gap="sm">
        <Button variant="outline" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button 
          color="red" 
          onClick={onConfirm} 
        >
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteConfirmationModal;
