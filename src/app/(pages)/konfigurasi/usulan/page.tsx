"use client";
import useNotification from "src/components/notification/notification";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { configuration } from "prisma/interfaces";
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  FileButton,
  FileInput,
  Grid,
  Group,
  Modal,
  Paper,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Switch,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import configurationAction from "src/action/configurationAction";
import yearResearchAction from "src/action/yearResearchAction";
import schemaAction from "src/action/schemaAction";
import fileAction from "src/action/fileAction";
import { notifications } from "@mantine/notifications";
import { IconUpload, IconEye, IconTrash } from "@tabler/icons-react";

interface FormValues {
  year_research_id: string;
  schemas: Record<string, boolean>;
  template_proposal: string;
  template_external_document: string;
  template_logbook: string;
  template_final_report: string;
}

export default function ConfigurationProposalSuggestionPage() {
  const user_type = "admin";
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const [fakeLoading, setFakeLoading] = useState(true);
  const [uploading, setUploading] = useState({
    template_proposal: false,
    template_external_document: false,
    template_logbook: false,
    template_final_report: false,
  });
  const [state, setState] = useState({
    schemas: [] as any[],
    yearResearches: [] as any[],
    configuration: null as configuration | null,
  });

  const configurationForm = useForm<FormValues>({
    initialValues: {
      year_research_id: "",
      schemas: {},
      template_proposal: "",
      template_external_document: "",
      template_logbook: "",
      template_final_report: "",
    },
  });

  const router = useRouter();

  // Track if the form has unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState<FormValues>({
    year_research_id: "",
    schemas: {},
    template_proposal: "",
    template_external_document: "",
    template_logbook: "",
    template_final_report: "",
  });
  const [deleteModal, setDeleteModal] = useState<{
    opened: boolean;
    field: keyof FormValues | null;
  }>({ opened: false, field: null });

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);

      const [yearResponse, configResponse, schemaResponse] = await Promise.all([
        yearResearchAction.getYearResearches(user_type, setFakeLoading, null),
        configurationAction.getConfiguration(user_type, setFakeLoading),
        schemaAction.getSchemas(user_type, setFakeLoading, null),
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
      const formValues = {
        year_research_id:
          newState.configuration?.year_research_id?.toString() || "",
        template_proposal: newState.configuration?.template_proposal || "",
        template_external_document:
          newState.configuration?.template_external_document || "",
        template_logbook: newState.configuration?.template_logbook || "",
        template_final_report:
          newState.configuration?.template_final_report || "",
        schemas: newState.schemas.reduce(
          (acc: any, item: any) => ({
            ...acc,
            [item.id]: item.is_active,
          }),
          {}
        ),
      };

      configurationForm.setValues(formValues);
      setInitialFormValues(formValues);
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

  // Handle route changes
  useEffect(() => {
    console.log(hasUnsavedChanges);
    // const handleRouteChange = (url: string) => {
    //   if (hasUnsavedChanges) {
    //     setNextPath(url);
    //     openConfirmModal();
    //     throw 'Route change aborted. Please wait for user confirmation.';
    //   }
    // };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBeforeUnload);
    };
  }, [hasUnsavedChanges, router]);

  const handleBeforeUnload = (event: BeforeUnloadEvent | PopStateEvent) => {
    if (hasUnsavedChanges) {
      event.preventDefault();
      if ("returnValue" in event) {
        (event as BeforeUnloadEvent).returnValue = "";
      }
      return "";
    }
  };

  const handleView = (url: string | null) => {
    if (url) {
      const pdfUrl = `/api/file?name=${url}`;

      const viewerWindow = window.open("", "_blank");

      if (viewerWindow) {
        viewerWindow.document.write(`
          <html>
            <head>
              <title>PDF Viewer</title>
              <style>
                body { margin: 0; }
                iframe { width: 100%; height: 100vh; border: none; }
              </style>
            </head>
            <body>
              <iframe src="${pdfUrl}#toolbar=0"></iframe>
            </body>
          </html>
        `);
      }
    }
  };

  const handleFileUpload = async (
    file: File | null,
    field: keyof FormValues
  ) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading((prev) => ({ ...prev, [field]: true }));
      const response = await fileAction.uploadFile(file!);

      if (response.success) {
        configurationForm.setFieldValue(field, response.data.filename);
        setHasUnsavedChanges(true); // Mark as unsaved after upload
        showNotification({
          status: "success",
          message: "File berhasil diunggah",
        });
      } else {
        throw new Error(response.message || "Gagal mengunggah file");
      }
    } catch (error: any) {
      showNotification({
        status: "error",
        message: error.message || "Terjadi kesalahan saat mengunggah file",
      });
    } finally {
      setUploading((prev) => ({ ...prev, [field]: false }));
    }
  };

  const openDeleteModal = (field: keyof FormValues) => {
    setDeleteModal({ opened: true, field });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ opened: false, field: null });
  };

  const handleDelete = () => {
    if (deleteModal.field) {
      configurationForm.setFieldValue(deleteModal.field, "");
      setHasUnsavedChanges(true); // Mark as unsaved after deletion
      showNotification({
        status: "success",
        message: "File berhasil dihapus",
      });
      closeDeleteModal();
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const payload = {
        year_research_id: parseInt(values.year_research_id),
        schemas: Object.entries(values.schemas).map(([schemaId, isActive]) => ({
          schema_id: parseInt(schemaId),
          is_active: isActive,
        })),
        template_proposal: values.template_proposal,
        template_external_document: values.template_external_document,
        template_logbook: values.template_logbook,
        template_final_report: values.template_final_report,
      };

      const result = await configurationAction.updateConfiguration(
        payload,
        user_type,
        setLoading
      );

      if (result.success) {
        showNotification({ status: "success", message: result.message });
        setHasUnsavedChanges(false); // Reset unsaved changes flag after save
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

  // Detect changes in form values
  useEffect(() => {
    const currentValues = configurationForm.values;
    const hasChanges =
      currentValues.year_research_id !== initialFormValues.year_research_id ||
      JSON.stringify(currentValues.schemas) !=
        JSON.stringify(initialFormValues.schemas) ||
      currentValues.template_proposal !== initialFormValues.template_proposal ||
      currentValues.template_external_document !=
        initialFormValues.template_external_document ||
      currentValues.template_logbook !== initialFormValues.template_logbook ||
      currentValues.template_final_report !==
        initialFormValues.template_final_report;

    setHasUnsavedChanges(hasChanges);
  }, [configurationForm.values]);

  return (
    <>
      <Modal
        opened={deleteModal.opened}
        onClose={closeDeleteModal}
        title="Konfirmasi Hapus File"
        centered
      >
        <Text mb="md">Apakah Anda yakin ingin menghapus file ini?</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={closeDeleteModal}>
            Batal
          </Button>
          <Button color="red" onClick={handleDelete}>
            Hapus
          </Button>
        </Group>
      </Modal>

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
                <Stack gap="xl">
                  <Card withBorder shadow="sm" radius="md" padding="lg">
                    <Card.Section withBorder inheritPadding py="xs">
                      <Text fw={600}>Pengaturan Umum</Text>
                    </Card.Section>
                    <Grid gutter="xl" mt="md">
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <Select
                          data={state.yearResearches}
                          searchable
                          placeholder="Pilih tahun pembukaan"
                          {...configurationForm.getInputProps(
                            "year_research_id"
                          )}
                        />
                      </Grid.Col>
                    </Grid>
                  </Card>

                  <Card withBorder shadow="sm" radius="md" padding="lg">
                    <Card.Section withBorder inheritPadding py="xs">
                      <Text fw={600}>Manajemen Schema</Text>
                    </Card.Section>
                    <Stack gap="sm" mt="md">
                      <Text size="sm" c="dimmed" mb={0}>
                        Pilih schema yang akan diaktifkan untuk pengajuan usulan
                      </Text>
                      <Divider />
                      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
                        {state.schemas.map((schema) => (
                          <Paper withBorder p="sm" radius="md" key={schema.id}>
                            <Group justify="space-between">
                              <Text fz="sm">{schema.name}</Text>
                              <Switch
                                checked={
                                  configurationForm.values.schemas[schema.id] ||
                                  false
                                }
                                onChange={(event) =>
                                  configurationForm.setFieldValue(
                                    `schemas.${schema.id}`,
                                    event.currentTarget.checked
                                  )
                                }
                              />
                            </Group>
                          </Paper>
                        ))}
                      </SimpleGrid>
                    </Stack>
                  </Card>

                  <Card withBorder shadow="sm" radius="md" padding="lg">
                    <Card.Section withBorder inheritPadding py="xs">
                      <Text fw={600}>Template Dokumen</Text>
                    </Card.Section>
                    <Grid gutter="xl" mt="md">
                      <Grid.Col
                        span={{ base: 12, md: 6 }}
                        aria-label="Upload section for Template Proposal"
                      >
                        <Group wrap="nowrap" gap="xs">
                          <FileButton
                            onChange={(file) =>
                              handleFileUpload(file, "template_proposal")
                            }
                            accept="application/pdf"
                            disabled={uploading.template_proposal}
                          >
                            {(props) => (
                              <Tooltip label="Upload file PDF">
                                <Button
                                  variant="outline"
                                  {...props}
                                  loading={uploading.template_proposal}
                                  leftSection={<IconUpload size={16} />}
                                  style={{ flex: 2 }}
                                  aria-label="Upload Template Proposal"
                                >
                                  Upload
                                </Button>
                              </Tooltip>
                            )}
                          </FileButton>
                          <Tooltip label="Lihat file yang diupload">
                            <Button
                              variant="light"
                              leftSection={<IconEye size={16} />}
                              onClick={() =>
                                handleView(
                                  configurationForm.values.template_proposal
                                )
                              }
                              disabled={
                                !configurationForm.values.template_proposal
                              }
                              style={{ flex: 1 }}
                              aria-label="Lihat Template Proposal"
                            >
                              Lihat
                            </Button>
                          </Tooltip>
                          <Tooltip label="Hapus file">
                            <ActionIcon
                              variant="filled"
                              color="red"
                              onClick={() =>
                                openDeleteModal("template_proposal")
                              }
                              disabled={
                                !configurationForm.values.template_proposal
                              }
                              aria-label="Hapus Template Proposal"
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                        <Text size="sm" c="dimmed" mt={4}>
                          Template Proposal
                        </Text>
                      </Grid.Col>

                      <Grid.Col
                        span={{ base: 12, md: 6 }}
                        aria-label="Upload section for Template Luaran"
                      >
                        <Group wrap="nowrap" gap="xs">
                          <FileButton
                            onChange={(file) =>
                              handleFileUpload(
                                file,
                                "template_external_document"
                              )
                            }
                            accept="application/pdf"
                            disabled={uploading.template_external_document}
                          >
                            {(props) => (
                              <Tooltip label="Upload file PDF">
                                <Button
                                  variant="outline"
                                  {...props}
                                  loading={uploading.template_external_document}
                                  leftSection={<IconUpload size={16} />}
                                  style={{ flex: 2 }}
                                  aria-label="Upload Template Luaran"
                                >
                                  Upload
                                </Button>
                              </Tooltip>
                            )}
                          </FileButton>
                          <Tooltip label="Lihat file yang diupload">
                            <Button
                              variant="light"
                              leftSection={<IconEye size={16} />}
                              onClick={() =>
                                handleView(
                                  configurationForm.values
                                    .template_external_document
                                )
                              }
                              disabled={
                                !configurationForm.values
                                  .template_external_document
                              }
                              style={{ flex: 1 }}
                              aria-label="Lihat Template Luaran"
                            >
                              Lihat
                            </Button>
                          </Tooltip>
                          <Tooltip label="Hapus file">
                            <ActionIcon
                              variant="filled"
                              color="red"
                              onClick={() =>
                                openDeleteModal("template_external_document")
                              }
                              disabled={
                                !configurationForm.values
                                  .template_external_document
                              }
                              aria-label="Hapus Template Luaran"
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                        <Text size="sm" c="dimmed" mt={4}>
                          Template Luaran
                        </Text>
                      </Grid.Col>

                      <Grid.Col
                        span={{ base: 12, md: 6 }}
                        aria-label="Upload section for Template Logbook"
                      >
                        <Group wrap="nowrap" gap="xs">
                          <FileButton
                            onChange={(file) =>
                              handleFileUpload(file, "template_logbook")
                            }
                            accept="application/pdf"
                            disabled={uploading.template_logbook}
                          >
                            {(props) => (
                              <Tooltip label="Upload file PDF">
                                <Button
                                  variant="outline"
                                  {...props}
                                  loading={uploading.template_logbook}
                                  leftSection={<IconUpload size={16} />}
                                  style={{ flex: 2 }}
                                  aria-label="Upload Template Logbook"
                                >
                                  Upload
                                </Button>
                              </Tooltip>
                            )}
                          </FileButton>
                          <Tooltip label="Lihat file yang diupload">
                            <Button
                              variant="light"
                              leftSection={<IconEye size={16} />}
                              onClick={() =>
                                handleView(
                                  configurationForm.values.template_logbook
                                )
                              }
                              disabled={
                                !configurationForm.values.template_logbook
                              }
                              style={{ flex: 1 }}
                              aria-label="Lihat Template Logbook"
                            >
                              Lihat
                            </Button>
                          </Tooltip>
                          <Tooltip label="Hapus file">
                            <ActionIcon
                              variant="filled"
                              color="red"
                              onClick={() =>
                                openDeleteModal("template_logbook")
                              }
                              disabled={
                                !configurationForm.values.template_logbook
                              }
                              aria-label="Hapus Template Logbook"
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                        <Text size="sm" c="dimmed" mt={4}>
                          Template Logbook
                        </Text>
                      </Grid.Col>

                      <Grid.Col
                        span={{ base: 12, md: 6 }}
                        aria-label="Upload section for Template Laporan Akhir"
                      >
                        <Group wrap="nowrap" gap="xs">
                          <FileButton
                            onChange={(file) =>
                              handleFileUpload(file, "template_final_report")
                            }
                            accept="application/pdf"
                            disabled={uploading.template_final_report}
                          >
                            {(props) => (
                              <Tooltip label="Upload file PDF">
                                <Button
                                  variant="outline"
                                  {...props}
                                  loading={uploading.template_final_report}
                                  leftSection={<IconUpload size={16} />}
                                  style={{ flex: 2 }}
                                  aria-label="Upload Template Laporan Akhir"
                                >
                                  Upload
                                </Button>
                              </Tooltip>
                            )}
                          </FileButton>
                          <Tooltip label="Lihat file yang diupload">
                            <Button
                              variant="light"
                              leftSection={<IconEye size={16} />}
                              onClick={() =>
                                handleView(
                                  configurationForm.values.template_final_report
                                )
                              }
                              disabled={
                                !configurationForm.values.template_final_report
                              }
                              style={{ flex: 1 }}
                              aria-label="Lihat Template Laporan Akhir"
                            >
                              Lihat
                            </Button>
                          </Tooltip>
                          <Tooltip label="Hapus file">
                            <ActionIcon
                              variant="filled"
                              color="red"
                              onClick={() =>
                                openDeleteModal("template_final_report")
                              }
                              disabled={
                                !configurationForm.values.template_final_report
                              }
                              aria-label="Hapus Template Laporan Akhir"
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                        <Text size="sm" c="dimmed" mt={4}>
                          Template Laporan Akhir
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Card>
                </Stack>
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
    </>
  );
}
