import { MRT_ColumnDef } from "mantine-react-table";
import { Skeleton, Text } from "@mantine/core";
import React, { useState, useEffect, useCallback } from "react";
import TableLayout from "src/components/table/tableLayout";
import { getSession } from "src/lib/session";
import { proposal_suggestion } from "prisma/interfaces";
import { showNotification } from "@mantine/notifications";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import ModalComponent from "src/components/modal/modal";
import ProposalSuggestionModal from "src/components/modal/proposal_suggestion/proposal_suggesion";
import { useSession } from "src/components/session/session";

interface UsulanSayaLecturerProps {
  columns: MRT_ColumnDef<proposal_suggestion>[];
}

const UsulanSayaLecturer: React.FC<UsulanSayaLecturerProps> = ({ columns }) => {
  const user_type = "lecturer";
  const { session, loading: sessionLoading } = useSession();
  const [data, setData] = useState<proposal_suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  const getProposalSuggestion = useCallback(async () => {
    const lecturerId =
      typeof session?.lecturer_id === "number" ? session.lecturer_id : "";

    const response = await proposalSuggestionAction.getProposalSuggestion(
      user_type,
      setLoading,
      {
        research_group_id: -1,
        lecturer_id: lecturerId,
      }
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      setData(response.data);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getProposalSuggestion();
  }, [getProposalSuggestion]);

  return (
    <Skeleton visible={sessionLoading}>
      <div className="flex justify-between items-center pt-5 pb-2 px-6">
        <Text size="lg" fw={700}>
          Daftar Usulan Saya
        </Text>
        <ModalComponent title="Buat Usulan">
          {(close) => (
            <ProposalSuggestionModal
              user_type={user_type}
              onClose={close}
              showResearchGroup={true}
              type="penelitian"
              lecturer_id={Number(session?.lecturer_id)}
              refreshData={() => getProposalSuggestion()}
            />
          )}
        </ModalComponent>
      </div>
      <div>
        <TableLayout
          columns={columns}
          data={data}
          isLoading={loading}
          enableRowClick={true}
          getRowClickUrl={(row) => `/usulan/${row.id}`}
        />
      </div>
    </Skeleton>
  );
};

export default UsulanSayaLecturer;
