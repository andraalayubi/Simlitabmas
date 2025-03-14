import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { ReactNode } from "react";

interface ModalProps {
  title?: string;
  children: (close: () => void) => ReactNode;
  disabled?: boolean;
}

const ModalComponent: React.FC<ModalProps> = ({
  title,
  children,
  disabled = false,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} size="50%" centered>
        {children(close)}
      </Modal>

      <Button
        variant="default"
        onClick={open}
        className={`px-4 py-2 rounded-lg transition-colors ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-800 text-white hover:bg-blue-900"
        }`}
        disabled={disabled}
      >
        {title}
      </Button>
    </>
  );
};

export default ModalComponent;
