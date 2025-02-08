'use client'

import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Textarea,
  Select,
  Group,
  Button,
  Box,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import { proposalSuggestionSchema } from "./_schema";
import { proposalSuggestionAction } from "./_action";
import useNotification from "@/app/components/notification/notification";

export function ProposalSuggestionForm({
  schemas = []
}: {
  schemas?: { value: string; label: string }[]
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(proposalSuggestionSchema),
  });

  console.log('schemas: ', schemas);
  

  const handleSubmit = async (values: { email: string; password: string }) => {
    const result = await proposalSuggestionAction(values, setLoading);

    if (result.success) {
      showNotification({ status: "success", message: result.message });
      setTimeout(() => router.push("/penelitian/usulan_saya"), 2000);
      console.log('to penelitian/usulan_saya')
    } else {
      showNotification({ status: "error", message: result.message });
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label="Judul Penelitian"
        placeholder="Masukkan judul penelitian"
        {...form.getInputProps('title')}
      />
      <Textarea
        className="mt-2"
        required
        label="Deskripsi Penelitian"
        placeholder="Jelaskan penelitian Anda"
        {...form.getInputProps('description')}
      />
      <Select
        className="mt-2"
        required
        label="Kelompok Penelitian"
        placeholder="Pilih kelompok penelitian"
        data={[
          { value: '1', label: 'Kelompok A' },
          { value: '2', label: 'Kelompok B' }
        ]}
        {...form.getInputProps('research_group_id')}
      />
      <Select
        className="mt-2"
        required
        label="Skema Penelitian"
        placeholder="Pilih skema penelitian"
        data={schemas}
        {...form.getInputProps('schema_id')}
      />
      <Select
        className="mt-2"
        required
        label="Tahun Penelitian"
        placeholder="Pilih tahun penelitian"
        data={[
          { value: '2024', label: '2024' },
          { value: '2025', label: '2025' }
        ]}
        {...form.getInputProps('year_research_id')}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={loading}>
          Buat Usulan
        </Button>
      </Group>
    </Box>
  );
};
