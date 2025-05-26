"use client";

import { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Button,
  Title,
  Paper,
  Group,
  Stack,
  Text,
  Box,
  Divider,
  ActionIcon,
  Modal,
  ScrollArea,
  Skeleton,
} from "@mantine/core";
import { IconTrash, IconPlus, IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import schemaAction from "src/action/schemaAction";
import useNotification from "src/components/notification/notification";
import { useParams } from "next/navigation";
import { external_document_category } from "prisma/interfaces";

export default function EditSkemaPage() {
  const user_type = "admin";
  const params = useParams();
  const schema_id = parseInt(params.id[0]);
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [isAddingNewExternal, setIsAddingNewExternal] = useState(false);
  const [newExternalDocumentCategory, setNewExternalDocumentCategory] =
    useState({ name: "", description: "" });

  const schemaForm = useForm<{
    name: string;
    description: string;
    type: string;
    min_degree: string;
    is_student: boolean;
    is_lecturer: boolean;
    is_partner: boolean;
    is_active: boolean;
    positions: string[];
    external_document_categories: Array<{
      name: string;
      description: string;
    }>;
  }>({
    initialValues: {
      name: "",
      description: "",
      type: "",
      min_degree: "",
      is_student: true,
      is_lecturer: true,
      is_partner: true,
      is_active: true,
      positions: [],
      external_document_categories: [],
    },
    validate: {
       name: (value) => (value ? null : "Nama harus diisi"),
       is_active: (value) => (value ? null : "Status aktif harus diisi"),
    },
  });

  const getSchema = useCallback(async (schema_id: number) => {
    const response = await schemaAction.getSchemas(user_type, setLoading, {
      id: schema_id,
      get_position_schema: true,
      get_external_document_category: true,
    });

    if (response.success) {
      showNotification({ status: "success", message: response.message });

      const data = response.data[0];

      schemaForm.setValues({
        name: data.name,
        description: data.description,
        type: data.type,
        min_degree: data.min_degree,
        is_student: data.is_student,
        is_lecturer: data.is_lecturer,
        is_partner: data.is_partner,
        is_active: data.is_active,
        positions: data.position_schema.map((item: any) => item.position.name),

        external_document_categories: data.external_document_category.map(
          (doc: any) => ({
            name: doc.name,
            description: doc.description,
          })
        ),
      });
    } else {
      showNotification({ status: "error", message: response.message });
    }
  }, []);

  const handleAddExternalDocumentCategory = () => {
    schemaForm.insertListItem("external_document_categories", {
      name: newExternalDocumentCategory.name,
      description: newExternalDocumentCategory.description,
    });
    setNewExternalDocumentCategory({ name: "", description: "" });
    setIsAddingNewExternal(false);
  };

  const handleDeleteExternalDocumentCategory = (index: number) => {
    schemaForm.removeListItem("external_document_categories", index);
  };

  const handleSubmit = async () => {
    const data = schemaForm.getValues();

    const response = await schemaAction.updateSchema(
      user_type,
      schema_id,
      data,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      getSchema(schema_id);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  useEffect(() => {
    getSchema(schema_id);
  }, [getSchema, user_type]);

  return (
    <>
      <Paper shadow="xs" p="md" mt="md" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Group>
            <Title order={2}>Edit Skema</Title>
          </Group>
          <Button leftSection={<IconDeviceFloppy size={20} />} color="blue" onClick={handleSubmit}>
            Simpan Perubahan
          </Button>
        </Group>

        <form onSubmit={schemaForm.onSubmit(handleSubmit)}>
          <ScrollArea h={600}>
            <Stack gap="lg">
              <Box>
                <Skeleton visible={loading}>
                  <Title order={4} mb="xs">
                    Informasi Dasar
                  </Title>
                  <Stack gap="md">
                    <TextInput
                      label="Nama"
                      placeholder="Masukkan nama skema"
                      required
                      {...schemaForm.getInputProps("name")}
                    />

                    <Select
                      label="Tipe"
                      placeholder="Pilih tipe skema"
                      data={[
                        { value: "penelitian", label: "Penelitian" },
                        { value: "pengmas", label: "Pengabdian Masyarakat" },
                      ]}
                      disabled={true}
                      required
                      {...schemaForm.getInputProps("type")}
                    />

                    <Textarea
                      label="Deskripsi"
                      placeholder="Masukkan deskripsi skema"
                      minRows={3}
                      required
                      {...schemaForm.getInputProps("description")}
                    />
                    <Group justify="apart">
                      <Text size="sm">Aktif</Text>
                      <Switch
                        required
                        checked={schemaForm.values.is_active}
                        onChange={(event) =>
                          schemaForm.setFieldValue(
                            "is_active",
                            event.currentTarget.checked
                          )
                        }
                      />
                    </Group>
                  </Stack>
                </Skeleton>
              </Box>

              {/* if reseach show lecturer rule */}
              {loading == false && schemaForm.values.type == "penelitian" && (
                <>
                  <Divider />
                  <Box>
                    <Skeleton visible={loading}>
                      <Title order={4} mb="xs">
                        Persyaratan
                      </Title>
                      <Stack gap="md">
                        <Select
                          label="Minimal gelar"
                          placeholder="Pilih minimal gelar"
                          defaultValue={""}
                          data={[
                            { value: "S1", label: "S1" },
                            { value: "S2", label: "S2" },
                            { value: "S3", label: "S3" },
                          ]}
                          required
                          {...schemaForm.getInputProps("min_degree")}
                        />

                        <Box>
                          <Text size="lg" mb="xs">
                            Jabatan yang Bisa Mengajukan
                          </Text>
                          <Group>
                            <Checkbox
                              label="Dosen / Tanpa jabatan"
                              checked={schemaForm.values.positions.includes(
                                "Lecturer"
                              )}
                              onChange={(event) => {
                                if (event.currentTarget.checked) {
                                  schemaForm.setFieldValue("positions", [
                                    ...schemaForm.values.positions,
                                    "Lecturer",
                                  ]);
                                } else {
                                  schemaForm.setFieldValue(
                                    "positions",
                                    schemaForm.values.positions.filter(
                                      (j) => j !== "Lecturer"
                                    )
                                  );
                                }
                              }}
                            />
                            <Checkbox
                              label="Asisten Ahli"
                              checked={schemaForm.values.positions.includes(
                                "Asisten Ahli"
                              )}
                              onChange={(event) => {
                                if (event.currentTarget.checked) {
                                  schemaForm.setFieldValue("positions", [
                                    ...schemaForm.values.positions,
                                    "Asisten Ahli",
                                  ]);
                                } else {
                                  schemaForm.setFieldValue(
                                    "positions",
                                    schemaForm.values.positions.filter(
                                      (j) => j !== "Asisten Ahli"
                                    )
                                  );
                                }
                              }}
                            />

                            <Checkbox
                              label="Lektor"
                              checked={schemaForm.values.positions.includes(
                                "Lektor"
                              )}
                              onChange={(event) => {
                                if (event.currentTarget.checked) {
                                  schemaForm.setFieldValue("positions", [
                                    ...schemaForm.values.positions,
                                    "Lektor",
                                  ]);
                                } else {
                                  schemaForm.setFieldValue(
                                    "positions",
                                    schemaForm.values.positions.filter(
                                      (j) => j !== "Lektor"
                                    )
                                  );
                                }
                              }}
                            />
                            <Checkbox
                              label="Lektor Kepala"
                              checked={schemaForm.values.positions.includes(
                                "Lektor Kepala"
                              )}
                              onChange={(event) => {
                                if (event.currentTarget.checked) {
                                  schemaForm.setFieldValue("positions", [
                                    ...schemaForm.values.positions,
                                    "Lektor Kepala",
                                  ]);
                                } else {
                                  schemaForm.setFieldValue(
                                    "positions",
                                    schemaForm.values.positions.filter(
                                      (j) => j !== "Lektor Kepala"
                                    )
                                  );
                                }
                              }}
                            />
                            <Checkbox
                              label="Guru Besar"
                              checked={schemaForm.values.positions.includes(
                                "Guru Besar"
                              )}
                              onChange={(event) => {
                                if (event.currentTarget.checked) {
                                  schemaForm.setFieldValue("positions", [
                                    ...schemaForm.values.positions,
                                    "Guru Besar",
                                  ]);
                                } else {
                                  schemaForm.setFieldValue(
                                    "positions",
                                    schemaForm.values.positions.filter(
                                      (j) => j !== "Guru Besar"
                                    )
                                  );
                                }
                              }}
                            />
                          </Group>
                        </Box>

                        <Box>
                          <Text size="lg" mb="xs">
                            Anggota yang bisa mengikuti
                          </Text>
                          <Stack gap="xs">
                            <Group justify="apart">
                              <Text>Dosen</Text>
                              <Switch
                                checked={schemaForm.values.is_lecturer}
                                onChange={(event) =>
                                  schemaForm.setFieldValue(
                                    "is_lecturer",
                                    event.currentTarget.checked
                                  )
                                }
                              />
                            </Group>
                            <Group justify="apart">
                              <Text>Mahasiswa</Text>
                              <Switch
                                checked={schemaForm.values.is_student}
                                onChange={(event) =>
                                  schemaForm.setFieldValue(
                                    "is_student",
                                    event.currentTarget.checked
                                  )
                                }
                              />
                            </Group>
                            <Group justify="apart">
                              <Text>Mitra / Partner</Text>
                              <Switch
                                checked={schemaForm.values.is_partner}
                                onChange={(event) =>
                                  schemaForm.setFieldValue(
                                    "is_partner",
                                    event.currentTarget.checked
                                  )
                                }
                              />
                            </Group>
                          </Stack>
                        </Box>
                      </Stack>
                    </Skeleton>
                  </Box>
                </>
              )}

              <Divider />

              <Box>
                <Skeleton visible={loading}>
                  <Group justify="apart" mb="md">
                    <Title order={4}>Dokumen Luaran</Title>
                    <Button
                      leftSection={<IconPlus size={16} />}
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddingNewExternal(true)}
                    >
                      Tambah Dokumen
                    </Button>
                  </Group>

                  <Stack gap="md">
                    {schemaForm.values.external_document_categories.map(
                      (doc, index) => (
                        <Paper key={index} p="md" withBorder>
                          <Group justify="apart">
                            <Box>
                              <Text size="lg">{doc.name}</Text>
                              <Text size="sm" color="dimmed">
                                {doc.description}
                              </Text>
                            </Box>
                            <ActionIcon
                              color="red"
                              onClick={() =>
                                handleDeleteExternalDocumentCategory(index)
                              }
                            >
                              <IconTrash size={18} />
                            </ActionIcon>
                          </Group>
                        </Paper>
                      )
                    )}

                    {schemaForm.values.external_document_categories.length ===
                      0 && (
                      <Text color="dimmed" py="lg">
                        Belum ada dokumen luaran. Klik tombol Tambah Dokumen
                        untuk menambahkan.
                      </Text>
                    )}
                  </Stack>
                </Skeleton>
              </Box>
            </Stack>
          </ScrollArea>
        </form>
      </Paper>

      {/* Modal for adding new document output */}
      <Modal
        opened={isAddingNewExternal}
        onClose={() => setIsAddingNewExternal(false)}
        title="Tambah Dokumen Luaran"
        closeOnClickOutside={false}
      >
        <Stack gap="md">
          <TextInput
            label="Nama Dokumen"
            placeholder="Masukkan nama dokumen"
            required
            value={newExternalDocumentCategory.name}
            onChange={(e) =>
              setNewExternalDocumentCategory({
                ...newExternalDocumentCategory,
                name: e.target.value,
              })
            }
          />

          <Textarea
            label="Deskripsi"
            placeholder="Masukkan deskripsi dokumen"
            minRows={3}
            required
            value={newExternalDocumentCategory.description}
            onChange={(e) =>
              setNewExternalDocumentCategory({
                ...newExternalDocumentCategory,
                description: e.target.value,
              })
            }
          />

          <Group justify="right" mt="md">
            <Button
              variant="outline"
              onClick={() => setIsAddingNewExternal(false)}
            >
              Batal
            </Button>
            <Button onClick={handleAddExternalDocumentCategory}>Simpan</Button>
          </Group>
        </Stack>
      </Modal>
    </>
    // </Box>
  );
}
