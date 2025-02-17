"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Select, Group, Button, Box } from "@mantine/core";
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
import { user_type } from "prisma/interfaces";

interface ProposalSuggestionModalProps {
  user_type: user_type;
  onClose: () => void;
  showResearchGroup?: boolean;
  type: string;
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
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [schemas, setSchemas] = useState<{ value: string; label: string }[]>([]);
  const [yearResearches, setYearResearches] = useState<{ value: string; label: string }[]>([]);
  const [researchGroups, setResearchGroups] = useState<{ value: string; label: string }[]>([]);
  const { showNotification } = useNotification();
  const router = useRouter();

  const getData = useCallback(async () => {
    const getSchemas = await schemaAction.getSchemas(user_type, setLoading);
    const getYearResearches = await yearResearchAction.getYearResearches(
      user_type,
      setLoading
    );
    const getResearchGroups = await researchGroupAction.getResearchGroups(
      user_type,
      setLoading
    );

    // Check if all responses are successful
    const responses = [getSchemas, getYearResearches, getResearchGroups];
    const allSuccessful = responses.every((response) => response.success);

    if (allSuccessful) {
      showNotification({
        status: "success",
        message: "All data retrieved successfully",
      });

      const transformedSchemas = transformData(getSchemas.data);
      const transformedYearResearches = transformData(
        getYearResearches.data,
        (yearResearch) => yearResearch.year.toString()
      );
      const transformedResearchGroups = transformData(getResearchGroups.data);

      setSchemas(transformedSchemas);
      setYearResearches(transformedYearResearches);
      setResearchGroups(transformedResearchGroups);
    } else {
      // Find and show the first error message
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
    const proposalType =
      type === "penelitian" || type === "pengmas" ? type : "penelitian";
    const result = await proposalSuggestionAction.createProposalSuggestion(
      user_type,
      values,
      setLoading,
      proposalType
    );

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
        {...form.getInputProps("name")}
      />
      {showResearchGroup && (
        <Select
          className="mt-2"
          required
          label="Kelompok Penelitian"
          placeholder="Pilih kelompok penelitian"
          data={researchGroups}
          {...form.getInputProps("research_group_id")}
        />
      )}
      <Select
        className="mt-2"
        required
        label="Skema Penelitian"
        placeholder="Pilih skema penelitian"
        data={schemas}
        {...form.getInputProps("schema_id")}
      />
      <Select
        className="mt-2"
        required
        label="Tahun Penelitian"
        placeholder="Pilih tahun penelitian"
        data={yearResearches}
        {...form.getInputProps("year_research_id")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={loading}>
          Buat Usulan
        </Button>
      </Group>
    </Box>
  );
};

export default ProposalSuggestionModal;
