import {
  Box,
  Stack,
  TextInput,
  FileButton,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { final_report, user_type } from "prisma/interfaces";
import { useState } from "react";
import fileAction from "src/action/fileAction";
import finalReportAction from "src/action/finalReportAction";
import useNotification from "src/components/notification/notification";

interface EditFinalReportModalProps {
  final_report: final_report;
  user_type: user_type;
  onClose: () => void;
  onSuccess: () => void;
}

const EditFinalReportModal: React.FC<EditFinalReportModalProps> = ({
  final_report,
  user_type,
  onClose,
  onSuccess,
}: EditFinalReportModalProps) => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [editedName, setEditedName] = useState(final_report.name);
  const [newFileUrl, setNewFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateFinalReport = async () => {
    const updatedData = {
      name: editedName,
      file_url: newFileUrl || final_report.file_url,
    };

    const response = await finalReportAction.updateFinalReport(
      updatedData,
      final_report.proposal_suggestion_id,
      final_report.id,
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
                Ganti File
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
              onClick={updateFinalReport}
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

export default EditFinalReportModal;
