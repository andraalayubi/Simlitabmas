"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button, TextInput, Modal, Group } from "@mantine/core";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";

interface DaftarDosenProps {
  dosenList: Dosen[];
}

const DaftarDosen: React.FC<DaftarDosenProps> = ({ dosenList }) => {
  const [opened, setOpened] = useState(false);
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [rg, setRg] = useState("");
  const [prodi, setProdi] = useState("");

  const handleAddDosen = async () => {
    const newDosen = { id: dosenList.length + 1, nama, nip, rg, prodi };
    try {
      const response = await axios.post("/api/dosen", newDosen);
      if (response.status === 201) {
        // setDosenList([...dosenList, newDosen]);
        setNama("");
        setNip("");
        setRg("");
        setProdi("");
        setOpened(false);
      }
    } catch (error) {
      console.error("Error adding dosen:", error);
    }
  };

  const columns = React.useMemo<MRT_ColumnDef<Dosen>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "nama",
        header: "Nama Dosen",
        size: 200,
      },
      {
        accessorKey: "nip",
        header: "NIP",
        size: 150,
      },
      {
        accessorKey: "rg",
        header: "Research Group",
        size: 200,
      },
      {
        accessorKey: "prodi",
        header: "Program Studi",
        size: 200,
      },
    ],
    []
  );

  return (
    <div className="bg-white shadow sm:rounded-lg p-6 overflow-x-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Dosen</h2>
        <Button onClick={() => setOpened(true)}>Tambah Dosen</Button>
      </div>
      <MantineReactTable
        columns={columns}
        data={dosenList}
        enablePagination
        enableColumnActions={false}
      />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Tambah Dosen"
      >
        <TextInput
          label="Nama Dosen"
          placeholder="Masukkan nama dosen"
          value={nama}
          onChange={(e) => setNama(e.currentTarget.value)}
          required
        />
        <TextInput
          label="NIP"
          placeholder="Masukkan NIP"
          value={nip}
          onChange={(e) => setNip(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Research Group"
          placeholder="Masukkan research group"
          value={rg}
          onChange={(e) => setRg(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Program Studi"
          placeholder="Masukkan program studi"
          value={prodi}
          onChange={(e) => setProdi(e.currentTarget.value)}
          required
        />
        <Group justify="flex-end" mt="md">
          <Button onClick={handleAddDosen}>Simpan</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default DaftarDosen;
