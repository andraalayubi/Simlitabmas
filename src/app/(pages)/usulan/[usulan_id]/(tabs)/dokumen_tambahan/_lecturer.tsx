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
import AdditionalDocumentAddModal from "src/components/modal/proposal_suggestion/CreateAdditionalDocumentModal";
import AdditionalDocumentUpdateModal from "src/components/modal/proposal_suggestion/EditAdditionalDocumentModal";

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

  // State for modals
  const [opened, { open, close }] = useDisclosure(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedDokumen, setSelectedDokumen] = useState<additional_document | null>(null);

  // General state
  const [isEditable, setIsEditable] = useState(false);
  const [dokumens, setDokumens] = useState<additional_document[]>([]);
  const [loading, setLoading] = useState(true);
  const [proposalSuggestion, setProposalSuggestion] = useState<proposal_suggestion | null>(null);

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

  const handleUpdateClick = (dokumen: additional_document) => {
    setSelectedDokumen(dokumen);
    setUpdateModalOpen(true);
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

      <AdditionalDocumentAddModal
        opened={opened}
        onClose={close}
        user_type={user_type}
        proposal_suggestion_id={proposal_suggestion_id as string}
        fetchDokumens={fetchDokumens}
        loading={loading}
      />

      <AdditionalDocumentUpdateModal
        opened={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        user_type={user_type}
        proposal_suggestion_id={proposal_suggestion_id as string}
        fetchDokumens={fetchDokumens}
        loading={loading}
        dokumen={selectedDokumen}
      />
    </>
  );
};

export default AdditionalDocumentLecturer;