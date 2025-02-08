import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { ReactNode } from 'react';

interface ModalProps {
  title?: string;
  children: ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ title, children }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        {children}
      </Modal>

      <Button
        variant="default"
        onClick={open}
        className="px-4 py-2 mt-2 bg-blue-800 text-white rounded-lg"
      >
        {title}
      </Button>
    </>
  );
}

export default ModalComponent;