"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Button, Loader } from "@mantine/core";
import {
  MantineReactTable,
  MRT_ColumnDef,
} from "mantine-react-table";
import MainLayout from "@/app/components/layouts/MainLayout";
import { useParams } from "next/navigation";
import LoadingPage from "@/app/components/usulan/LoadingPage";

interface Usulan {
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
  const params = useParams();
  const category = params.category;
  const [navigation, setNavigation] = useState(0);
  const [usulans, setUsulans] = useState<Usulan[]>([]);
  const [loading, setLoading] = useState(true);

  const changeNavigation =
    (value: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setNavigation(value);
    };

  useEffect(() => {
    const fetchUsulans = async () => {
      try {
        const response = await axios.get("api/usulan");
        setUsulans(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the Usulans!", error);
        setLoading(false);
      }
    };

    fetchUsulans();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Usulan>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 300,
        Cell: ({ cell }) => {
          const proposal = cell.row.original as Usulan;
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
          const proposal = cell.row.original as Usulan;
          return (
            <span className={proposal.statusClass}>{proposal.status}</span>
          );
        },
      },
    ],
    []
  );

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <MainLayout>
      <nav className="text-sm text-gray-600 mb-4">
        Usulan {category ? `> ${category}` : ''}
      </nav>
      <div className="bg-white shadow rounded-lg py-6">
        <div className="mb-4 mx-4 flex justify-between items-center border-b">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 border-b-2 font-semibold ${navigation == 0
                ? "border-[#132963] text-[#132963]"
                : "text-gray-600"
                }`}
              onClick={changeNavigation(0)}
            >
              Usulan
            </button>
            <button
              className={`px-4 py-2 border-b-2 font-semibold ${navigation == 1
                ? "border-[#132963] text-[#132963]"
                : "text-gray-600"
                }`}
              onClick={changeNavigation(1)}
            >
              Usulan Saya
            </button>
          </div>
          <Button className="px-4 py-2 bg-blue-800 text-white rounded-lg">
            Buat Usulan
          </Button>
        </div>
        <div className="w-full">
          <MantineReactTable columns={columns} data={usulans} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Pengmas;
