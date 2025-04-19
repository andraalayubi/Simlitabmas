"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Modal,
  TextInput,
  Text,
  FileButton,
  Group,
  Skeleton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import additionalDocumentAction from "src/action/additionalDocumentAction";
import { useParams } from "next/navigation";
import useNotification from "src/components/notification/notification";
import fileAction from "src/action/fileAction";
import TableLayout from "src/components/table/tableLayout";
import ProposalSuggestionSummaryCard from "src/components/card/proposal_suggestion/ProposalSuggestionSummaryCard.tsx";
import { additional_document, proposal_suggestion } from "prisma/interfaces";
import { SessionPayload } from "src/lib/encrypt";

interface AdditionalDocumentLecturerProps {
  session: SessionPayload;
  handleView: (fileUrl: string) => void;
}

const AdditionalDocumentLecturer: React.FC<AdditionalDocumentLecturerProps> = ({
  session,
  handleView,
}) => {
  const user_type = "lecturer";
  const params = useParams();
  const proposal_suggestion_id = params.usulan_id;
  const { showNotification } = useNotification();

  const [updateSelectedFile, setUpdateSelectedFile] = useState<File | null>(
    null
  );
  const [updateUploadLoading, setUpdateUploadLoading] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedDokumen, setSelectedDokumen] =
    useState<additional_document | null>(null);
  const [updateNamaDokumen, setUpdateNamaDokumen] = useState("");
  const [updateFileUrl, setUpdateFileUrl] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [dokumens, setDokumens] = useState<additional_document[]>([]);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [proposalSuggestion, setProposalSuggestion] =
    useState<proposal_suggestion | null>(null);
  const [namaDokumen, setNamaDokumen] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newFileUrl, setNewFileUrl] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const fetchDokumens = useCallback(async () => {
    const response = await additionalDocumentAction.getAdditionalDocuments(
      user_type,
      proposal_suggestion_id as string,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setDokumens(response.data.additional_document);
      setProposalSuggestion(response.data);

      response.data.lecturer.id == session.lecturer_id && setIsEditable(true);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, proposal_suggestion_id]);

  useEffect(() => {
    fetchDokumens();
  }, [fetchDokumens]);

  const handleUpload = async () => {
    if (!newFileUrl || !namaDokumen) return;

    const response = await additionalDocumentAction.uploadAdditionalDocument(
      user_type,
      proposal_suggestion_id as string,
      namaDokumen,
      newFileUrl,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      fetchDokumens();
      close();
    } else {
      console.error(response.message);
      showNotification({ status: "error", message: response.message });
    }
  };

  const handleFileUpload = async (file: File | null) => {
    if (!file) {
      return;
    }
    setUploadLoading(true);

    const response = await fileAction.uploadFile(file);
    if (response.success) {
      setNewFileUrl(response.data.filename);
    } else {
      showNotification({ status: "error", message: response.message });
    }

    setUploadLoading(false);
    setSelectedFile(null);
  };

  const handleUpdateClick = (dokumen: additional_document) => {
    setSelectedDokumen(dokumen);
    setUpdateNamaDokumen(dokumen.name);
    setUpdateModalOpen(true);
    setUpdateFileUrl(dokumen.file_url);
  };

  const handleUpdate = async () => {
    if (!selectedDokumen || !updateNamaDokumen || !updateFileUrl) return;

    const response = await additionalDocumentAction.updateAdditionalDocument(
      user_type,
      proposal_suggestion_id as string,
      selectedDokumen.id,
      updateNamaDokumen,
      updateFileUrl,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      fetchDokumens();
      setUpdateModalOpen(false);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

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

  const columns = React.useMemo<MRT_ColumnDef<additional_document>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nama Dokumen",
        size: 300,
      },
      {
        accessorKey: "file_url",
        header: "File",
        size: 150,
        Cell: ({ cell }) => (
          <Button
            variant="outline"
            onClick={() => handleView(cell.getValue<string>())}
            disabled={!cell.getValue<string>()}
          >
            Lihat Dokumen
          </Button>
        ),
      },
      {
        accessorKey: "actions",
        header: "Aksi",
        size: 150,
        Cell: ({ row }) => (
          <Button
            variant="outline"
            color="yellow"
            onClick={() => handleUpdateClick(row.original)}
            disabled={!isEditable}
          >
            Update
          </Button>
        ),
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    [isEditable, handleUpdateClick]
  );

  return (
    <>
      <div className="bg-white shadow rounded-lg p-6">
        <Skeleton visible={loading}>
          <ProposalSuggestionSummaryCard
            proposal_suggestion_name={proposalSuggestion?.name!}
            status={proposalSuggestion?.status!}
            phase={proposalSuggestion?.phase!}
          />
        </Skeleton>

        <div className="mt-6">
          <Skeleton visible={loading}>
            <div className="mb-4 mx-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Daftar Dokumen Tambahan</h2>
              {isEditable && (
                <Button
                  onClick={open}
                  className="bg-blue-800 text-white"
                >
                  Tambah Dokumen
                </Button>
              )}
            </div>
          </Skeleton>
          <div className="w-full">
            <TableLayout
              columns={columns}
              data={dokumens}
              isLoading={loading}
            />
          </div>
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="Tambah Dokumen">
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

      <Modal
        opened={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        title="Update Dokumen"
      >
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
    </>
  );
};

export default AdditionalDocumentLecturer;
