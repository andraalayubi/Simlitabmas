import {
  Box,
  Stack,
  TextInput,
  FileButton,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { logbook, user_type } from "prisma/interfaces";
import { useState } from "react";
import fileAction from "src/action/fileAction";
import logbookAction from "src/action/logbookAction";
import useNotification from "src/components/notification/notification";

interface EditLogbookModalProps {
  logbook: logbook;
  user_type: user_type;
  onClose: () => void;
  onSuccess: () => void;
}

const EditLogbookModal: React.FC<EditLogbookModalProps> = ({
  logbook,
  user_type,
  onClose,
  onSuccess,
}: EditLogbookModalProps) => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [editedName, setEditedName] = useState(logbook.name);
  const [newFileUrl, setNewFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateLogbook = async () => {
    const updatedData = {
      name: editedName,
      file_url: newFileUrl || logbook.file_url,
    };

    const response = await logbookAction.updateLogbook(
      updatedData,
      logbook.proposal_suggestion_id,
      logbook.id,
      user_type,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      onClose();
      onSuccess();
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  const handleFileUpload = async (file: File | null) => {
    if (!file) {
      showNotification({
        status: "error",
        message: "Pilih file terlebih dahulu!",
      });
      return;
    }
    setUploadLoading(true);

    const response = await fileAction.uploadFile(file, setLoading);
    if (response.success) {
      setNewFileUrl(response.data.filename);

      showNotification({
        status: "success",
        message: response.message,
      });
    } else {
      showNotification({ status: "error", message: response.message });
    }

    setUploadLoading(false);
    setSelectedFile(null);
  };

  return (
    <Box p="md">
      <Stack>
        <TextInput
          label="Nama Dokumen"
          value={editedName ?? ""}
          onChange={(e) => setEditedName(e.currentTarget.value)}
          disabled={loading}
        />

        {selectedFile ? (
          <Text size="sm" c="blue">
            Mengupload {selectedFile.name}...
          </Text>
        ) : newFileUrl ? (
          <Text size="sm" c="green">
            File terunggah: {newFileUrl.split("/").pop()}
          </Text>
        ) : (
          <Text size="sm" c="red">
            Format file yang diizinkan: .pdf, .doc, .docx (Maksimal 10MB)
          </Text>
        )}

        <Group justify="space-between">
          <FileButton
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx"
            disabled={uploadLoading || loading}
          >
            {(props) => (
              <Button {...props} variant="outline">
                {logbook.file_url ? 'Ganti File' : 'Tambah File'}
              </Button>
            )}
          </FileButton>

          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={onClose}
              disabled={loading || uploadLoading}
            >
              Batal
            </Button>
            <Button
              onClick={updateLogbook}
              loading={loading}
              disabled={uploadLoading}
            >
              Simpan Perubahan
            </Button>
          </div>
        </Group>
      </Stack>
    </Box>
  );
};

export default EditLogbookModal;
