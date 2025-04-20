import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Group,
  FileButton,
  Button,
  Text,
} from "@mantine/core";
import fileAction from "src/action/fileAction";
import additionalDocumentAction from "src/action/additionalDocumentAction";
import { user_type } from "prisma/interfaces";
import useNotification from "src/components/notification/notification";

interface AdditionalDocumentAddModalProps {
  opened: boolean;
  onClose: () => void;
  user_type: user_type;
  proposal_suggestion_id: string;
  fetchDokumens: () => void;
  loading: boolean;
}

const AdditionalDocumentAddModal: React.FC<AdditionalDocumentAddModalProps> = ({
  opened,
  onClose,
  user_type,
  proposal_suggestion_id,
  fetchDokumens,
  loading,
}) => {
  const { showNotification } = useNotification();
  const [namaDokumen, setNamaDokumen] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newFileUrl, setNewFileUrl] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleFileUpload = async (file: File | null) => {
    if (!file) return;
    setUploadLoading(true);

    const response = await fileAction.uploadFile(file);
    if (response.success) {
      setNewFileUrl(response.data.filename);
      showNotification({
        status: "success",
        message: "File berhasil diunggah",
      });
    } else {
      showNotification({ status: "error", message: response.message });
    }

    setUploadLoading(false);
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!newFileUrl || !namaDokumen) return;

    const response = await additionalDocumentAction.uploadAdditionalDocument(
      user_type,
      proposal_suggestion_id,
      namaDokumen,
      newFileUrl,
      () => {}
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      fetchDokumens();
      onClose();
      setNamaDokumen("");
      setNewFileUrl(null);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Tambah Dokumen">
      <TextInput
        label="Nama Dokumen"
        placeholder="Masukkan Nama Dokumen"
        className="mb-4"
        value={namaDokumen}
        onChange={(e) => setNamaDokumen(e.currentTarget.value)}
        required
      />

      <Group>
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

        {selectedFile && (
          <Text size="sm" c="blue">
            Mengupload {selectedFile.name}...
          </Text>
        )}

        {newFileUrl && (
          <Text size="sm" c="green">
            File terunggah: {newFileUrl.split("/").pop()}
          </Text>
        )}
      </Group>

      <Button onClick={handleUpload} className="mt-4 bg-blue-800 text-white">
        Simpan
      </Button>
    </Modal>
  );
};

export default AdditionalDocumentAddModal;
