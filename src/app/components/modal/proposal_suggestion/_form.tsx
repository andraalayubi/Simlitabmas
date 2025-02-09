'use client'

import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Select,
  Group,
  Button,
  Box,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import { proposalSuggestionPenelitianSchema, 
  proposalSuggestionPengmasSchema  } from "./_schema";
import { proposalSuggestionAction } from "./_action";
import useNotification from "@/app/components/notification/notification";
import { fetchSchemas } from "./_action";
import { fetchYearResearches } from "./_action";
import { fetchResearchGroups } from "./_action";

export function ProposalSuggestionForm({ 
  onClose, 
  showResearchGroup = true, 
  type 
}: { 
  onClose: () => void, 
  showResearchGroup?: boolean, 
  type: string 
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [schemas, setSchemas] = useState<{ value: string; label: string }[]>([]);
  const [yearResearches, setYearResearches] = useState<{ value: string; label: string }[]>([]);
  const [researchGroups, setResearchGroups] = useState<{ value: string; label: string }[]>([]);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    fetchSchemas().then((data) => setSchemas(data));
    fetchYearResearches().then((data) => setYearResearches(data));
    fetchResearchGroups().then((data) => setResearchGroups(data));
  }, []);

  const form = useForm({
    initialValues: type === 'penelitian' 
      ? {
          name: "",
          year_research_id: "",
          schema_id: "",
          research_group_id: "",
        }
      : {
          name: "",
          year_research_id: "",
          schema_id: "",
        },
    validate: zodResolver(type === 'penelitian' ? proposalSuggestionPenelitianSchema : proposalSuggestionPengmasSchema),
  });

  const handleSubmit = async (values: 
    { name: string; 
      year_research_id: string; 
      schema_id: string; 
      research_group_id?: string 
    }) => {
    const result = await proposalSuggestionAction(values, setLoading);

    if (result.success) {
      showNotification({ status: "success", message: result.message });
      onClose();
      router.push(`/${type}/usulan_saya`);
    } else {
      showNotification({ status: "error", message: result.message });
      onClose();
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label="Judul Penelitian"
        placeholder="Masukkan judul penelitian"
        {...form.getInputProps('name')}
      />
      {showResearchGroup && (
        <Select
          className="mt-2"
          required
          label="Kelompok Penelitian"
          placeholder="Pilih kelompok penelitian"
          data={researchGroups}
          {...form.getInputProps('research_group_id')}
        />
      )}
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
        data={yearResearches}
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
