import { MRT_ColumnDef } from "mantine-react-table";
import React, { useState, useEffect, useCallback } from "react";
import TableLayout from "src/components/table/tableLayout";
import { getSession } from "src/lib/session";
import { proposal_suggestion } from "prisma/interfaces";
import { showNotification } from "@mantine/notifications";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import { useSession } from "src/components/session/session";
import { useProposalSuggestion } from "src/context/proposalSuggestion";

interface UsulanSayaLecturerProps {
  columns: MRT_ColumnDef<proposal_suggestion>[];
}

const UsulanSayaLecturer: React.FC<UsulanSayaLecturerProps> = ({ columns }) => {
  const user_type = "lecturer";
  const { filteredProposals, loading } = useProposalSuggestion();
  // const [data, setData] = useState<proposal_suggestion[]>([]);
  // const [loading, setLoading] = useState(true);
  const { session, loading: sessionLoading } = useSession();

  // const getProposalSuggestion = useCallback(async () => {
  //   const sessions = await getSession();
  //   const lecturerId =
  //     typeof session?.lecturer_id === "number" ? session.lecturer_id : "";
  //     console.log(session);
  //     console.log(sessions);

  //   const response = await proposalSuggestionAction.getProposalSuggestion(
  //     user_type,
  //     setLoading,
  //     {
  //       research_group_id: -1,
  //       lecturer_id: lecturerId,
  //     }
  //   );
    
  //   if (response.success) {
  //     showNotification({ status: "success", message: response.message });
  //     setData(response.data);
  //   } else {
  //     showNotification({ status: "error", message: response.message });
  //   }
  // }, [user_type]);

  // useEffect(() => {
  //   getProposalSuggestion();
  // }, [getProposalSuggestion]);

  return (
    <div>
      <TableLayout
        columns={columns}
        data={filteredProposals}
        isLoading={loading}
        enableRowClick={true}
        getRowClickUrl={(row) => `/usulan/${row.id}`}
      />
    </div>
  );
};

export default UsulanSayaLecturer;
