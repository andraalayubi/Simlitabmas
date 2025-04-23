"use client";

import { Text } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { department, research_group } from "prisma/interfaces";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import researchGroupAction from "src/action/researchGroupAction";
import AddResearchGroup from "src/components/modal/master/addResearchGroup";
import ModalComponent from "src/components/modal/modal";
import useNotification from "src/components/notification/notification";
import TableLayout from "src/components/table/tableLayout";

export default function AuditResearchGroupPage() {
  const user_type = "admin";
  const [researchGroup, setResearchGroup] = useState<research_group[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  // map columns
  const columns = useMemo<MRT_ColumnDef<research_group>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Nama Research Group",
        size: 300,
      },
      {
        accessorKey: "ketua_rg_name",
        header: "Nama Ketua",
        size: 100,
      },
      {
        accessorKey: "proposal_suggestion_count",
        header: "Jumlah Usulan",
        size: 50,
      },
      {
        accessorKey: "lecturer_count",
        header: "Jumlah Anggota",
        size: 50,
      },
    ],
    []
  );

  const getResearchGroup = useCallback(async () => {
    const response = await researchGroupAction.getResearchGroup(
      user_type,
      setLoading
    );

    if (response.success) {
      setResearchGroup(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getResearchGroup();
  }, [getResearchGroup]);

  return (
    <>
      <div className="px-4 py-6">
        <div className="bg-white shadow rounded-lg mt-4">
          <div className="bg-white shadow sm:rounded-lg">
            {/* Judul */}
            <div className="flex justify-between items-center pt-5 pb-2 px-6">
              <Text size="lg" fw={700}>
                Daftar Research Group
              </Text>
              <ModalComponent title="Buat Research Group">
                {(close) => (
                  <AddResearchGroup
                    user_type={user_type}
                    onClose={() => close()}
                    onSuccess={() => getResearchGroup()}
                  />
                )}
              </ModalComponent>
            </div>

            <TableLayout
              columns={columns}
              data={researchGroup}
              isLoading={loading}
              enableRowClick={true}
              getRowClickUrl={(row) => `/master/research_group/${row.id}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
