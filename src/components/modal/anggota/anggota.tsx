"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Group,
  Button,
  Box,
  MultiSelect,
  MultiSelectProps,
  Text,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import useNotification from "src/components/notification/notification";
import { anggotaAction } from "./_action";
import { lecturer } from "prisma/interfaces";
import memberAction from "src/action/memberAction";
import { user_type } from "prisma/interfaces";
import { LecturerMemberFormValues, lecturerMemberSchema } from "src/schemas/memberSchema";

interface AnggotaModalProps {
  user_type: user_type;
  onClose: () => void;
  usulanId: number;
}

const AnggotaModal: React.FC<AnggotaModalProps> = ({
  user_type,
  onClose,
  usulanId,
}: AnggotaModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [lecturers, setLecturers] = useState<lecturer[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const { showNotification } = useNotification();
  const router = useRouter();
  console.log(value);

  const getLecturers = useCallback(async () => {
    const response = await memberAction.getLecturerMember(
      user_type,
      usulanId,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      const transformedData: lecturer[] = response.data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
      }));

      setLecturers(transformedData);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type, usulanId]);

  useEffect(() => {
    getLecturers();
  }, [getLecturers]);

  const form = useForm<LecturerMemberFormValues>({
    initialValues: {
      usulan_id: usulanId,
      anggota: []
    },
    validate: zodResolver(lecturerMemberSchema),
    validateInputOnChange: true
  });

  const handleSubmit = async (values: LecturerMemberFormValues) => {
    console.log(values);
    
    const result = await memberAction.addLecturerMember(
      {
        ...values
      },
      setLoading
    );

    if (result.success) {
      showNotification({ status: "success", message: result.message });
      onClose();
      router.refresh();
    } else {
      showNotification({ status: "error", message: result.message });
      onClose();
    }
  };

  const renderMultiSelectOption: MultiSelectProps["renderOption"] = ({
    option,
  }) => (
    <Group gap="sm">
      <div>
        <Text size="sm">{option.label}</Text>
      </div>
    </Group>
  );

  const memberData = lecturers.map((lecturer) => ({
    value: lecturer.id.toString(),
    label: lecturer.name,
  }));

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
        onChange={(selected) => {
          setValue(selected);
          form.setFieldValue("anggota", selected);
      }}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={loading}>
          Tambah Anggota
        </Button>
      </Group>
    </Box>
  );
};

export default AnggotaModal;
