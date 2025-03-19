"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useNotification from "src/components/notification/notification";
import { useParams } from "next/navigation";
import { research_group, year_research } from "prisma/interfaces";
import { MRT_ColumnDef } from "mantine-react-table";
import yearResearchAction from "src/action/yearResearchAction";
import TableLayout from "src/components/table/tableLayout";
import ModalComponent from "src/components/modal/modal";
import { Text } from "@mantine/core";

export default function AuditTahun() {
  const user_type = "admin";
  const [loading, setLoading] = useState(true);
  const [yearResearch, setYearResearch] = useState<year_research[]>([]);
  const params = useParams();
  const { showNotification } = useNotification();

  // map column
  const columns = useMemo<MRT_ColumnDef<year_research>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "year",
        header: "Tahun",
        size: 100,
      },
      {
        accessorKey: "open_date",
        header: "Tanggal Buka",
        size: 200,
      },
      {
        accessorKey: "closed_date",
        header: "Tanggal Tutup",
        size: 200,
      },
      {
        accessorKey: "accepted_suggestion_count",
        header: "Usulan Diterima",
        size: 150,
      },
      {
        accessorKey: "proposal_suggestion_count",
        header: "Jumlah Usulan",
        size: 150,
      },
    ],
    []
  );

  const getYearResearch = useCallback(async () => {
    const response = await yearResearchAction.getYearResearches(
      user_type,
      setLoading
    );

    if (response.success) {
      setYearResearch(response.data);
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  useEffect(() => {
    getYearResearch();
  }, [getYearResearch]);

  return (
    <>
      <div>
        {/* Judul */}
        <div className="flex justify-between items-center pt-5 pb-2 px-6">
          <Text size="lg" fw={700}>
            Daftar Tahun Usulan
          </Text>
          <ModalComponent title="Buat Tahun Usulan">
            {(close) => <> </>}
          </ModalComponent>
        </div>

        <TableLayout
          columns={columns}
          data={yearResearch}
          isLoading={loading}
          enableRowClick={false}
        />
      </div>
    </>
  );
}
