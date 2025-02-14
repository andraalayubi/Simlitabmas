import { MRT_ColumnDef } from "mantine-react-table";
import React, { useState, useEffect } from "react";
import TableLayout from "src/components/table/tableLayout";
import { getSession } from "src/lib/session";

interface UsulanData {
  id: number;
  judulPenelitian: string;
  dosenPengusul: string;
  researchGroup: string;
  progressUsulan: string;
  statusProposal: string;
}

interface SemuaUsulanLecturerProps {
  columns: MRT_ColumnDef<UsulanData>[];
}

const SemuaUsulanLecturer: React.FC<SemuaUsulanLecturerProps> = ({
  columns,
}) => {
  const [data, setData] = useState<UsulanData[]>([]);
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

        const response = await fetch(
          "/api/lecturer/proposal-suggestion?get_schema=true&get_lecturer=true&get_research_group=true"
        );
        const result = await response.json();

        if (result.success) {
          // Transform the API data to match UsulanData interface
          const transformedData: UsulanData[] = result.data.map(
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
