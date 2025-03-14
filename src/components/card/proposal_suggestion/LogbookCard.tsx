import { Button, Card, Group, Text } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";
import { logbook, user_type } from "prisma/interfaces";
import ModalComponent from "src/components/modal/modal";
import EditLogbookModal from "src/components/modal/proposal_suggestion/EditLogbookModal";

interface LogbookCardProps {
  logbook: logbook;
  onSuccess: () => void;
  user_type: user_type;
  editable: boolean;
}

const LogbookCard: React.FC<LogbookCardProps> = ({
  logbook,
  onSuccess,
  user_type,
  editable
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
            <ModalComponent title="Edit Logbook" disabled={!editable}>
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
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default LogbookCard;
