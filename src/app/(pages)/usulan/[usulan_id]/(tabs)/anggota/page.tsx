'use client'

import { useSession } from "src/components/session/session";
import { notFound } from "next/navigation";
import { useEffect, useMemo } from "react";
import AnggotaAdmin from "./_admin";
import AnggotaKaprodi from "./_kaprodi";
import AnggotaKetuaRG from "./_ketua_rg";
import AnggotaLecturer from "./_lecturer";
import { MRT_ColumnDef } from "mantine-react-table";
import { Skeleton } from "@mantine/core";
import { lecturer } from "prisma/interfaces";


export default function AnggotaPage() {
    const { session, loading: sessionLoading } = useSession();
  
    const columns = useMemo<MRT_ColumnDef<lecturer>[]>(
      () => [
        {
          accessorKey: "name",
          header: "Nama Anggota",
          size: 300,
        },
        {
          accessorKey: "nip",
          header: "NRP / NIP",
          size: 225,
        },
        {
          accessorKey: "jabatan",
          header: "Jabatan",
          size: 225,
        },
        {
          accessorKey: "department_name",
          header: "Program Studi",
          size: 300,
        }
      ],
      []
    );

    useEffect(() => {
      if (!sessionLoading) {
        //   fetchDetailUsulanByUsulanId();
      }
    }, [sessionLoading]);
  
    if(session?.user_type == "admin") {
      return <Skeleton visible={sessionLoading}><AnggotaAdmin columns={columns}/></Skeleton>
    } else if (session?.user_type == "lecturer") {
      return <Skeleton visible={sessionLoading}><AnggotaLecturer /></Skeleton>
    } else if (session?.user_type == "ketua_rg") {
      return <Skeleton visible={sessionLoading}><AnggotaKetuaRG /></Skeleton>
    } else if (session?.user_type == "kaprodi") {
      return <Skeleton visible={sessionLoading}><AnggotaKaprodi /></Skeleton>
    }
  }