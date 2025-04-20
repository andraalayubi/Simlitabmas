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
import { proposal_suggestion } from "prisma/interfaces";

interface Dokumen {
  id: number;
  name: string;
  fileUrl: string;
}

interface AdditionalDocumentKetuaRGProps {
  columns: MRT_ColumnDef<Dokumen>[];
}

const AdditionalDocumentKetuaRG: React.FC<AdditionalDocumentKetuaRGProps> = ({
  columns,
}) => {
  const user_type = "ketua_rg";
  const params = useParams();
  const proposal_suggestion_id = params.usulan_id;
  const { showNotification } = useNotification();

  const [dokumens, setDokumens] = useState<Dokumen[]>([]);
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
    </>
  );
};

export default AdditionalDocumentKetuaRG;
