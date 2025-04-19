import {
  Box,
  Stack,
  TextInput,
  FileButton,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { external_document, user_type } from "prisma/interfaces";
import { useState } from "react";
import externalDocumentAction from "src/action/externalDocumentAction";
import fileAction from "src/action/fileAction";
import useNotification from "src/components/notification/notification";

interface EditExternalDocumentProps {
  external_document: external_document;
  user_type: user_type;
  onClose: () => void;
  onSuccess: () => void;
}

const EditExternalDocumentModal: React.FC<EditExternalDocumentProps> = ({
  external_document,
  user_type,
  onClose,
  onSuccess,
}: EditExternalDocumentProps) => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [editedName, setEditedName] = useState(external_document.name);
  const [editedDescription, setEditedDescription] = useState(
    external_document.description
  );
  const [editedStatus, setEditedStatus] = useState(external_document.status);
  const [editedExternalCategory, setExternalDocumentCategory] = useState(
    external_document.external_document_category_id
  );
  const [uploadLoading, setUploadLoading] = useState(false);
  const [newFileUrl, setNewFileUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const updateExternalDocument = async () => {
    const updatedData = {
      name: editedName,
      description: editedDescription,
      status: editedStatus,
      file_url: newFileUrl || external_document.file_url,
    };

    const response = await externalDocumentAction.updateExternalDocument(
      updatedData,
      external_document.proposal_suggestion_id,
      external_document.id,
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
    <>
      <Box>
        <Stack>
          <TextInput
            label="Nama Luaran"
            value={editedName ?? ""}
            onChange={(e) => setEditedName(e.currentTarget.value)}
            disabled={loading}
          />

          <TextInput
            label="Deskripsi Luaran"
            value={editedDescription ?? ""}
            onChange={(e) => setEditedDescription(e.currentTarget.value)}
            disabled={loading}
          />
          <TextInput
            label="Status Luaran"
            value={editedStatus ?? ""}
            onChange={(e) => setEditedStatus(e.currentTarget.value)}
            disabled={loading}
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

          <Group justify="flex-end" mt="md">
            <Button
              variant="default"
              onClick={onClose}
              disabled={loading || uploadLoading}
            >
              Batal
            </Button>
            <Button
              onClick={updateExternalDocument}
              loading={loading}
              disabled={uploadLoading}
            >
              Simpan Perubahan
            </Button>
          </Group>
        </Stack>
      </Box>
    </>
  );
};

export default EditExternalDocumentModal;
