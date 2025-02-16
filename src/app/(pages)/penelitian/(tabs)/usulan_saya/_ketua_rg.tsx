import { MRT_ColumnDef } from "mantine-react-table";
import React, { useState, useEffect, useCallback } from "react";
import TableLayout from "src/components/table/tableLayout";
import { getSession } from "src/lib/session";
import { proposal_suggestion } from "prisma/interfaces";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import { showNotification } from "@mantine/notifications";

interface UsulanSayaKetuaRGProps {
  columns: MRT_ColumnDef<proposal_suggestion>[];
}

const UsulanSayaKetuaRG: React.FC<UsulanSayaKetuaRGProps> = ({ columns }) => {
  const user_type = "ketua_rg";
  const [data, setData] = useState<proposal_suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  const getProposalSuggestion = useCallback(async () => {
    const session = await getSession();
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
      const transformedData: proposal_suggestion[] = response.data.map(
        (item: any) => ({
          id: item.id,
          judulPenelitian: item.name,
          skema: item.schema.name,
          dosenPengusul: item.lecturer.name,
          researchGroup: item.research_group.name,
          statusProposal: item.status,
        })
      );

      setData(transformedData);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getProposalSuggestion();
  }, [getProposalSuggestion]);

  return (
    <div>
      <TableLayout
        columns={columns}
        data={data}
        isLoading={loading}
        enableRowClick={true}
        getRowClickUrl={(row) => `/usulan/${row.id}`}
      />
    </div>
  );
};

export default UsulanSayaKetuaRG;
