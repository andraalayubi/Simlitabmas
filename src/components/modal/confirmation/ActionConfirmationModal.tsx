import { Button, Group, Modal, Text } from "@mantine/core";

interface ActionConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  confirmLabel?: string;
  cancelLabel?: string;
  message?: string;
  confirmColor?: string;
}

const ActionConfirmationModal: React.FC<ActionConfirmationModalProps> = ({
  opened,
  onClose,
  onConfirm,
  itemName,
  confirmLabel = "Ya, Saya Yakin",
  cancelLabel = "Batal",
  message = "Apakah Anda yakin ingin",
  confirmColor = "green"
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Konfirmasi Tindakan"
      centered
    >
      <Text size="sm" mb="lg">
        {message} <strong>{itemName}</strong> usulan ini?
        <br />
        Tindakan ini tidak dapat dibatalkan.
      </Text>

      <Group justify="flex-end" gap="sm">
        <Button variant="outline" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button 
          color={confirmColor} 
          onClick={() => {onClose(); onConfirm()}} 
        >
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  );
};

export default ActionConfirmationModal;
