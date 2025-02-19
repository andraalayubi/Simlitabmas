import { showNotification } from "@mantine/notifications";
import { MRT_ColumnDef } from "mantine-react-table";
import { proposal_suggestion } from "prisma/interfaces";
import React, { useState, useEffect, useCallback } from "react";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import TableLayout from "src/components/table/tableLayout";

interface SemuaUsulanKaprodiProps {
  columns: MRT_ColumnDef<proposal_suggestion>[];
}

const SemuaUsulanKaprodi: React.FC<SemuaUsulanKaprodiProps> = ({ columns }) => {
  const user_type = "kaprodi";
  const [data, setData] = useState<proposal_suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  const getProposalSuggestion = useCallback(async () => {
    const response = await proposalSuggestionAction.getProposalSuggestion(
      user_type,
      setLoading,
      {
        research_group_id: -1,
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

export default SemuaUsulanKaprodi;
