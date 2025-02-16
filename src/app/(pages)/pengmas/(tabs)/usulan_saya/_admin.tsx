import { MRT_ColumnDef } from "mantine-react-table";
import React, { useState, useEffect, useCallback } from "react";
import TableLayout from "src/components/table/tableLayout";
import { getSession } from "src/lib/session";
import { proposal_suggestion } from "prisma/interfaces";
import { showNotification } from "@mantine/notifications";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";

interface UsulanSayaAdminProps {
  columns: MRT_ColumnDef<proposal_suggestion>[];
}

const UsulanSayaAdmin: React.FC<UsulanSayaAdminProps> = ({ columns }) => {
  const user_type = "admin";
  const [data, setData] = useState<proposal_suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  const getProposalSuggestion = useCallback(async () => {
    const response = await proposalSuggestionAction.getProposalSuggestion(
      user_type,
      setLoading,
      {
        research_group_id: "null",
      }
    );
    
    if (response.success) {
      showNotification({ status: "success", message: response.message });
      const transformedData: proposal_suggestion[] = response.data.map(
        (item: any) => ({
          id: item.id,
          judulPenelitian: item.name,
          skema: item.schema.name,
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

export default UsulanSayaAdmin;
