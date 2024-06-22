"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import { Button, Input } from "@mantine/core";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_ColumnDef,
} from "mantine-react-table";

interface Proposal {
  id: number;
  title: string;
  date: string;
  schema: string;
  dosenPengusul: string;
  prodi: string;
  status: string;
  statusClass: string;
}

const Pengmas: React.FC = () => {
  const [navigation, setNavigation] = useState(0);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  const changeNavigation =
    (value: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setNavigation(value);
    };

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get("/api/proposals");
        setProposals(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the proposals!", error);
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Proposal>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 300,
        Cell: ({ cell }) => {
          const proposal = cell.row.original as Proposal;
          return (
            <div>
              <div className="font-semibold">{proposal.title}</div>
              <div className="text-sm text-gray-500">{proposal.date}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "schema",
        header: "Schema",
        size: 135,
      },
      {
        accessorKey: "dosenPengusul",
        header: "Pengusul",
        size: 170,
      },
      {
        accessorKey: "prodi",
        header: "Prodi",
        size: 130,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 130,
        Cell: ({ cell }) => {
          const proposal = cell.row.original as Proposal;
          return (
            <span className={proposal.statusClass}>{proposal.status}</span>
          );
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: proposals,
    // mantineTableProps: {
    //   style: { tableLayout: "fixed", width: "50%" },
    // },
    // mantineTableBodyProps: {
    //   style: { overflowX: "auto", width: "50%" },
    // },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="ms-64 flex-1">
        <Header />
        <div className="p-4">
          <nav className="text-sm text-gray-600 mb-4">Usulan {">"} Pengmas</nav>
          <div className="bg-white shadow rounded-lg py-6">
            <div className="mb-4 flex justify-between items-center border-b">
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 border-b-2 font-semibold ${
                    navigation == 0
                      ? "border-[#132963] text-[#132963]"
                      : "text-gray-600"
                  }`}
                  onClick={changeNavigation(0)}
                >
                  Usulan
                </button>
                <button
                  className={`px-4 py-2 border-b-2 font-semibold ${
                    navigation == 1
                      ? "border-[#132963] text-[#132963]"
                      : "text-gray-600"
                  }`}
                  onClick={changeNavigation(1)}
                >
                  Usulan Saya
                </button>
              </div>
              <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Buat Usulan
              </Button>
            </div>
            {/* <div className="mb-4 border-b pb-4">
              <Input
                type="text"
                placeholder="Cari berdasarkan judul proposal"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div> */}
            <div className="w-full">
              <MantineReactTable table={table} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengmas;
