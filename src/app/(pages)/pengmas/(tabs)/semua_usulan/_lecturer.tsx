import { MRT_ColumnDef } from "mantine-react-table";
import React, { useState, useEffect } from "react";
import TableLayout from "src/components/table/tableLayout";
import { getSession } from "src/lib/session";
import { proposal_suggestion } from "prisma/interfaces";

interface SemuaUsulanLecturerProps {
  columns: MRT_ColumnDef<proposal_suggestion>[];
}

const SemuaUsulanLecturer: React.FC<SemuaUsulanLecturerProps> = ({
  columns,
}) => {
  const [data, setData] = useState<proposal_suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProposalSuggestions = async () => {
      try {
        const session = await getSession();
        if (!session || !session.user_id) {
          console.error("No session or user_id found");
          setIsLoading(false);
          return;
        }

        const response = await fetch("/api/lecturer/proposal-suggestion");
        const result = await response.json();

        if (result.success) {
          // Transform the API data to match UsulanData interface
          const transformedData: proposal_suggestion[] = result.data.map(
            (item: any) => ({
              id: item.id,
              judulPenelitian: item.name,
              skema: item.schema_id,
              dosenPengusul: item.lecturer_id,
              researchGroup: item.research_group_id,
              statusProposal: item.status,
            })
          );

          setData(transformedData);
        } else {
          console.error(
            "Failed to fetch proposal suggestions:",
            result.message
          );
        }
      } catch (error) {
        console.error("Error fetching proposal suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposalSuggestions();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TableLayout
        columns={columns}
        data={data}
        enableRowClick={true}
        getRowClickUrl={(row) => `/usulan/${row.id}`}
      />
    </div>
  );
};

export default SemuaUsulanLecturer;
