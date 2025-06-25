"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Select, Group, Button, Box, Skeleton } from "@mantine/core";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  proposalSuggestionPenelitianSchema,
  proposalSuggestionPengmasSchema,
} from "src/schemas/proposalSuggestionSchema";
import useNotification from "src/components/notification/notification";
import proposalSuggestionAction from "src/action/proposalSuggestionAction";
import schemaAction from "src/action/schemaAction";
import yearResearchAction from "src/action/yearResearchAction";
import researchGroupAction from "src/action/researchGroupAction";
import { user_type, lecturer } from "prisma/interfaces";

interface ProposalSuggestionModalProps {
  user_type: user_type;
  onClose: () => void;
  showResearchGroup?: boolean;
  type: string;
  lecturer: lecturer;
  refreshData: () => void;
}

const transformData = <T extends {
  [x: string]: any; id: number;
}>(
  data: T[], 
  labelExtractor: (item: T) => string = (item: any) => item.name || item.year
): { value: string; label: string }[] => {
  return data.map(item => ({
    value: item.id.toString(),
    label: labelExtractor(item)
  }));
};

const ProposalSuggestionModal: React.FC<ProposalSuggestionModalProps> = ({
  user_type,
  onClose,
  showResearchGroup = true,
  type,
  lecturer,
  refreshData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [schemas, setSchemas] = useState<{ value: string; label: string }[]>([]);
  const [yearResearches, setYearResearches] = useState<{ value: string; label: string }[]>([]);
  const [researchGroups, setResearchGroups] = useState<{ value: string; label: string }[]>([]);
  const { showNotification } = useNotification();

  const getData = useCallback(async () => {
    
    // get schema by type
    let schemaFilters = null
    if (type == 'penelitian') {
      schemaFilters = { is_active: true, min_degree: lecturer.highest_degree, type: "penelitian", position_id: lecturer.position_id }
    } else {
      schemaFilters = { is_active: true, type: 'pengmas' }
    }
    const getSchemas = await schemaAction.getSchemas(
      user_type,
      setLoading,
      schemaFilters,
    );
    const getYearResearches = await yearResearchAction.getYearResearches(
      user_type,
      setLoading,
      {is_active: true}
    );
    const getResearchGroups = await researchGroupAction.getResearchGroup(
      user_type,
      setLoading
    );

    const responses = [getSchemas, getYearResearches, getResearchGroups];
    const allSuccessful = responses.every((response) => response.success);

    if (allSuccessful) {
      const transformedSchemas = transformData(getSchemas.data);
      const transformedYearResearches = transformData(
        getYearResearches.data,
        (yearResearch) => yearResearch.year.toString()
      );
      const transformedResearchGroups = transformData(getResearchGroups.data);

      setSchemas(transformedSchemas);
      setYearResearches(transformedYearResearches);
      setResearchGroups(transformedResearchGroups);
      form.setFieldValue("year_research_id", transformedYearResearches.length === 1 ? transformedYearResearches[0].value : "");
    } else {
      const errorResponse = responses.find((response) => !response.success);
      showNotification({
        status: "error",
        message: errorResponse?.message || "Failed to retrieve data",
      });
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const form = useForm({
    initialValues:
      type === "penelitian"
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
    validate: zodResolver(
      type === "penelitian"
        ? proposalSuggestionPenelitianSchema
        : proposalSuggestionPengmasSchema
    ),
  });

  const handleSubmit = async (values: {
    name: string;
    year_research_id: string;
    schema_id: string;
    research_group_id?: string;
  }) => {
    const result = await proposalSuggestionAction.createProposalSuggestion(
      user_type,
      values,
      setLoading,
      lecturer.id
    );

    if (result.success) {
      showNotification({ status: "success", message: result.message });
      onClose();
      refreshData();
    } else {
      showNotification({ status: "error", message: result.message });
      onClose();
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label={type === 'penelitian' ? 'Judul Penelitian' : 'Judul Pengabdian'}
        placeholder={type === 'penelitian' ? 'Masukkan judul penelitian' : 'Masukkan judul pengabdian'}
        {...form.getInputProps("name")}
      />
      {showResearchGroup && (
        <Skeleton visible={loading} className="mt-2">
          <Select
            className="mt-2"
            required
            label="Kelompok Penelitian"
            placeholder="Pilih kelompok penelitian"
            data={researchGroups}
            {...form.getInputProps("research_group_id")}
          />
        </Skeleton>
      )}
      <Skeleton visible={loading} className="mt-2">
        <Select
          className="mt-2"
          required
          label={type === 'penelitian' ? 'Skema Penelitian' : 'Skema Pengabdian'}
          placeholder={type === 'penelitian' ? 'Pilih skema penelitian' : 'Pilih skema pengabdian'}
          data={schemas}
          {...form.getInputProps("schema_id")}
        />
      </Skeleton>
      <Skeleton visible={loading} className="mt-2">
        <Select
          className="mt-2"
          required
          label={type === 'penelitian' ? 'Tahun Penelitian' : 'Tahun Pengabdian'}
          placeholder={type === 'penelitian' ? 'Pilih tahun penelitian' : 'Pilih tahun pengabdian'}
          data={yearResearches}
          {...form.getInputProps("year_research_id")}
        />
      </Skeleton>
      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={loading}>
          Buat Usulan
        </Button>
      </Group>
    </Box>
  );
};

export default ProposalSuggestionModal;
