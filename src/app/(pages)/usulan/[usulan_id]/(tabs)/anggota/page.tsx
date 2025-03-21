'use client'

import { useSession } from "src/components/session/session";
import { useMemo } from "react";
import AnggotaAdmin from "./_admin";
import AnggotaKaprodi from "./_kaprodi";
import AnggotaKetuaRG from "./_ketua_rg";
import AnggotaLecturer from "./_lecturer";
import { MRT_ColumnDef } from "mantine-react-table";
import { Skeleton } from "@mantine/core";
import { lecturer, student_member, vendor_member } from "prisma/interfaces";


export default function AnggotaPage() {
    const { session, loading: sessionLoading } = useSession();
    console.log('tesss');
    
  
    const columnsLecturer = useMemo<MRT_ColumnDef<lecturer>[]>(
      () => [
        {
          accessorKey: "name",
          header: "Nama Anggota",
          size: 200,
        },
        {
          accessorKey: "nip",
          header: "NRP / NIP",
          size: 150,
        },
        {
          header: "Jabatan",
          Cell: ({ row }) => (row.index === 0 ? "Ketua" : "Anggota"),
          size: 150,
        },
        {
          accessorFn: (row) => row.department?.name,
          header: "Program Studi",
          size: 300,
        },
      ],
      []
    );

    const columnsStudent = useMemo<MRT_ColumnDef<student_member>[]>(
      () => [
        {
          accessorKey: "name",
          header: "Nama Anggota",
          size: 350,
        },
        {
          accessorKey: "nrp",
          header: "NRP / NIP",
          size: 300,
        },
        {
          accessorFn: (row) => row.department?.name,
          header: "Program Studi",
          size: 400,
        }
      ],
      []
    );

    const columnsVendor = useMemo<MRT_ColumnDef<vendor_member>[]>(
      () => [
        {
          accessorKey: "name",
          header: "Nama Anggota",
          size: 525,
        },
        {
          accessorKey: "description",
          header: "Deskripsi",
          size: 525,
        }
      ],
      []
    );
  
    if(session?.user_type == "admin") {
      console.log('admin');
      
      return <Skeleton visible={sessionLoading}><AnggotaAdmin columnsLecturer={columnsLecturer} columnsStudent={columnsStudent} columnsVendor={columnsVendor}/></Skeleton>
    } else if (session?.user_type == "lecturer") {
      return <Skeleton visible={sessionLoading}><AnggotaLecturer session={session} columnsLecturer={columnsLecturer} columnsStudent={columnsStudent} columnsVendor={columnsVendor}/></Skeleton>
    } else if (session?.user_type == "ketua_rg") {
      return <Skeleton visible={sessionLoading}><AnggotaKetuaRG columnsLecturer={columnsLecturer} columnsStudent={columnsStudent} columnsVendor={columnsVendor}/></Skeleton>
    } else if (session?.user_type == "kaprodi") {
      return <Skeleton visible={sessionLoading}><AnggotaKaprodi columnsLecturer={columnsLecturer} columnsStudent={columnsStudent} columnsVendor={columnsVendor}/></Skeleton>
    }
  }