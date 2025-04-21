import React, { useState, useEffect } from "react";
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
import { additional_document, user_type } from "prisma/interfaces";
import useNotification from "src/components/notification/notification";

interface AdditionalDocumentUpdateModalProps {
  opened: boolean;
  onClose: () => void;
  user_type: user_type;
  proposal_suggestion_id: string;
  fetchDokumens: () => void;
  loading: boolean;
  dokumen: additional_document | null;
}

const AdditionalDocumentUpdateModal: React.FC<
  AdditionalDocumentUpdateModalProps
> = ({
  opened,
  onClose,
  user_type,
  proposal_suggestion_id,
  fetchDokumens,
  loading,
  dokumen,
}) => {
  const { showNotification } = useNotification();
  const [updateNamaDokumen, setUpdateNamaDokumen] = useState("");
  const [updateSelectedFile, setUpdateSelectedFile] = useState<File | null>(
    null
  );
  const [updateFileUrl, setUpdateFileUrl] = useState<string | null>(null);
  const [updateUploadLoading, setUpdateUploadLoading] = useState(false);

  useEffect(() => {
    if (dokumen) {
      setUpdateNamaDokumen(dokumen.name);
      setUpdateFileUrl(dokumen.file_url);
    }
  }, [dokumen]);

  const handleUpdateFileUpload = async (file: File | null) => {
    if (!file) return;
    setUpdateUploadLoading(true);

    const response = await fileAction.uploadFile(file);
    if (response.success) {
      setUpdateFileUrl(response.data.filename);
      showNotification({
        status: "success",
        message: "File berhasil diunggah",
      });
    } else {
      showNotification({ status: "error", message: response.message });
    }

    setUpdateUploadLoading(false);
    setUpdateSelectedFile(null);
  };

  const handleUpdate = async () => {
    if (!dokumen || !updateNamaDokumen || !updateFileUrl) return;

    const response = await additionalDocumentAction.updateAdditionalDocument(
      user_type,
      proposal_suggestion_id,
      dokumen.id,
      updateNamaDokumen,
      updateFileUrl,
      () => {}
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      fetchDokumens();
      onClose();
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Update Dokumen">
      <TextInput
        label="Nama Dokumen"
        value={updateNamaDokumen}
        onChange={(e) => setUpdateNamaDokumen(e.currentTarget.value)}
        required
      />
      <Group className="mt-4">
        <FileButton
          onChange={handleUpdateFileUpload}
          accept=".pdf,.doc,.docx"
          disabled={updateUploadLoading || loading}
        >
          {(props) => (
            <Button {...props} variant="outline">
              Ganti File
            </Button>
          )}
        </FileButton>
        {updateSelectedFile && (
          <Text size="sm" c="blue">
            Mengupload {updateSelectedFile.name}...
          </Text>
        )}
        {updateFileUrl && (
          <Text size="sm" c="green">
            File terunggah: {updateFileUrl.split("/").pop()}
          </Text>
        )}
      </Group>
      <Button
        onClick={handleUpdate}
        className="mt-4 bg-blue-800 text-white"
        loading={updateUploadLoading}
      >
        Update
      </Button>
    </Modal>
  );
};

export default AdditionalDocumentUpdateModal;
