"use client";
import useNotification from "src/components/notification/notification";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import departmentAction from "src/action/departmentAction";
import configurationAction from "src/action/configurationAction";
import { configuration } from "prisma/interfaces";
import {
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Skeleton,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import yearResearchService from "src/services/yearResearchService";
import yearResearchAction from "src/action/yearResearchAction";

export default function ConfiugrationYearPage() {
  const user_type = "admin";
  const [yearResearches, setYearResearches] = useState<any[]>([]);
  const [configuration, setConfiguration] = useState<configuration | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  const configurationForm = useForm({
    initialValues: {
      year_research_id: "",
    },
  });

  const getYearResearches = useCallback(async () => {
    const response = await yearResearchAction.getYearResearches(
      user_type,
      setLoading
    );

    if (response.success) {
      const transformedData = response.data.map((item: any) => ({
        value: item.id.toString(),
        label: item.year.toString(),
      }));
      setYearResearches(transformedData);
    }
  }, [user_type]);

  const getConfiguration = useCallback(async () => {
    const response = await configurationAction.getConfiguration(
      user_type,
      setLoading
    );
    if (response.success) {
      setConfiguration(response.data);
      configurationForm.setValues({
        year_research_id: response.data.year_research_id?.toString() || "",
      });
      showNotification({ status: "success", message: response.message });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, [user_type]);

  const handleSubmit = async () => {
    let values = configurationForm.values;
    const payload = {
      year_research_id: parseInt(values.year_research_id),
    };

    const result = await configurationAction.updateConfiguration(
      payload,
      user_type,
      setLoading
    );

    if (result.success) {
      showNotification({ status: "success", message: result.message });
      getConfiguration();
    } else {
      showNotification({ status: "error", message: result.message });
    }
  };

  useEffect(() => {
    getYearResearches();
    getConfiguration();
  }, [getYearResearches, getConfiguration]);

  return (
    <>
      <div className="px-4 py-6">
        <div className="bg-white shadow rounded-lg mt-4">
          <div className="bg-white shadow sm:rounded-lg">
            {/* Judul */}
            <div className="flex justify-between items-center pt-5 pb-2 px-6">
              <Text size="lg" fw={700}>
                Konfigurasi Usulan
              </Text>
            </div>

            {/* configuration form */}
            <form
              onSubmit={configurationForm.onSubmit(handleSubmit)}
              className="p-6"
            >
              <Skeleton visible={loading} />

              <Grid gutter="xl">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Select
                    label="Tahun Pembukuan"
                    data={yearResearches}
                    searchable
                    {...configurationForm.getInputProps("year_research_id")}
                    value={configurationForm.values.year_research_id}
                  />
                </Grid.Col>

              </Grid>

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
    </>
  );
}
