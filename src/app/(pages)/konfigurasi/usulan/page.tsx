"use client";
import useNotification from "src/components/notification/notification";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { configuration } from "prisma/interfaces";
import {
  Button,
  Grid,
  Group,
  Select,
  Skeleton,
  Stack,
  Switch,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import configurationAction from "src/action/configurationAction";
import yearResearchAction from "src/action/yearResearchAction";
import schemaAction from "src/action/schemaAction";

interface FormValues {
  year_research_id: string;
  schemas: Record<string, boolean>;
}

export default function ConfigurationProposalSuggestionPage() {
  const user_type = "admin";
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const [fakeLoading, setFakeLoading] = useState(true);
  const [state, setState] = useState({
    schemas: [] as any[],
    yearResearches: [] as any[],
    configuration: null as configuration | null,
  });

  const configurationForm = useForm<FormValues>({
    initialValues: {
      year_research_id: "",
      schemas: {},
    },
  });

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);

      const [yearResponse, configResponse, schemaResponse] = await Promise.all([
        yearResearchAction.getYearResearches(user_type, setFakeLoading),
        configurationAction.getConfiguration(user_type, setFakeLoading),
        schemaAction.getSchemas(user_type, setFakeLoading),
      ]);

      const newState = {
        yearResearches:
          yearResponse.data?.map((item: any) => ({
            value: item.id.toString(),
            label: item.year.toString(),
          })) || [],
        configuration: configResponse.data,
        schemas: schemaResponse.data || [],
      };

      setState(newState);

      // Set form values after all data is loaded
      configurationForm.setValues({
        year_research_id:
          newState.configuration?.year_research_id?.toString() || "",
        schemas: newState.schemas.reduce(
          (acc: any, item: any) => ({
            ...acc,
            [item.id]: item.is_active,
          }),
          {}
        ),
      });
    } catch (error) {
      showNotification({
        status: "error",
        message: "Gagal memuat data konfigurasi",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const payload = {
        year_research_id: parseInt(values.year_research_id),
        schemas: Object.entries(values.schemas).map(([schemaId, isActive]) => ({
          schema_id: parseInt(schemaId),
          is_active: isActive,
        })),
      };

      const result = await configurationAction.updateConfiguration(
        payload,
        user_type,
        setLoading
      );

      if (result.success) {
        showNotification({ status: "success", message: result.message });
        await fetchAllData(); // Refresh data after successful update
      }
    } catch (error) {
      showNotification({
        status: "error",
        message: "Gagal menyimpan konfigurasi",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="bg-white shadow rounded-lg mt-4">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="flex justify-between items-center pt-5 pb-2 px-6">
            <Text size="lg" fw={700}>
              Konfigurasi Usulan
            </Text>
          </div>

          <form
            onSubmit={configurationForm.onSubmit(handleSubmit)}
            className="p-6"
          >
            <Skeleton visible={loading}>
              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Tahun Pembukuan"
                    data={state.yearResearches}
                    searchable
                    {...configurationForm.getInputProps("year_research_id")}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12 }}>
                  <Text size="sm" fw={500} mb="sm">
                    Daftar Schema
                  </Text>
                  <Stack gap="sm">
                    {state.schemas.map((schema) => (
                      <Switch
                        key={schema.id}
                        label={schema.name}
                        checked={
                          configurationForm.values.schemas[schema.id] || false
                        }
                        onChange={(event) =>
                          configurationForm.setFieldValue(
                            `schemas.${schema.id}`,
                            event.currentTarget.checked
                          )
                        }
                      />
                    ))}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Skeleton>

            <Group justify="flex-end" mt="xl">
              <Button
                type="submit"
                loading={loading}
                variant="filled"
                size="md"
              >
                Simpan Perubahan
              </Button>
            </Group>
          </form>
        </div>
      </div>
    </div>
  );
}
