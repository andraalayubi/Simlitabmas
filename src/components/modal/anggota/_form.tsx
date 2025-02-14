"use client";

import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Group, Button, Box, MultiSelect, Avatar, MultiSelectProps, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import { anggotaSchema } from "./_schema";
// import { anggotaAction } from "./_action";
import useNotification from "src/components/notification/notification";
import { fetchLecturers } from "./_action";
import { lecturer } from "prisma/interfaces";


export function AnggotaForm({
  onClose,
  usulanId,
}: {
  onClose: () => void;
  usulanId: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [lecturers, setLecturers] = useState<lecturer[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    fetchLecturers().then((data) => setLecturers(data));
  }, []);

  const form = useForm({
    initialValues: {
      name: "",
      nidn: "",
      usulan_id: usulanId,
    },
    validate: zodResolver(anggotaSchema),
  });

  const handleSubmit = async (values: {
    name: string;
    nidn: string;
    usulan_id: string;
  }) => {
    const result = await anggotaAction(values, setLoading);

    if (result.success) {
      showNotification({ status: "success", message: result.message });
      onClose();
      router.refresh();
    } else {
      showNotification({ status: "error", message: result.message });
    onClose();
    }
  };

  const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({ option }) => (
    <Group gap="sm">
      <div>
        <Text size="sm">{option.label}</Text>
      </div>
    </Group>
  );

  // const memberData = lecturers
  console.log('lecturers', lecturers);
  const memberData = lecturers.map((lecturer) => ({
    value: lecturer.id.toString(),
    label: lecturer.name
  }))
  console.log('value', value);
  
  // const memberData = [
  //   { value: '1', label: 'Mirza Ramadhani' },
  //   { value: '2', label: 'Andra Al Ayubi' },
  //   { value: '3', label: 'Hammam Mujahid' }
  // ];

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <MultiSelect
        searchable
        required
        label="Nama Anggota"
        placeholder="Masukkan nama anggota"
        data={memberData}
        renderOption={renderMultiSelectOption}
        value={value}
        onChange={setValue}
        // {...form.getInputProps("name")}
      />
      <TextInput
        required
        label="NIDN"
        placeholder="Masukkan NIDN"
        {...form.getInputProps("nidn")}
        className="mt-2"
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={loading}>
          Tambah Anggota
        </Button>
      </Group>
    </Box>
  );
}
