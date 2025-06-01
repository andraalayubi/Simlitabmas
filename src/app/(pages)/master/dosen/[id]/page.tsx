"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Title,
  Text,
  Group,
  Paper,
  Divider,
  Grid,
  Box,
  Stack,
  Button,
  TextInput,
  Select,
  NumberInput,
  ActionIcon,
  useMantineTheme,
  Card,
  Skeleton,
} from "@mantine/core";
import { IconUser, IconSchool, IconPlus, IconTrash } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useParams } from "next/navigation";
import lecturerAction from "src/action/lecturerAction";
import { decode } from "src/lib/sqids";
import useNotification from "src/components/notification/notification";

interface EducationEntry {
  university: string;
  year: string;
  field: string;
  degree: string;
  code: string;
}

interface LecturerFormValues {
  name: string;
  position: string;
  nip: number | "";
  nidn: number | "";
  phone_number: number | "";
  education: EducationEntry[];
}

const positionOptions = [
  { value: "Lecturer", label: "Tanpa Jabatan" },
  { value: "Asisten Ahli", label: "Asisten Ahli" },
  { value: "Lektor", label: "Lektor" },
  { value: "Lektor Kepala", label: "Lektor Kepala" },
  { value: "Guru Besar", label: "Guru Besar" },
];

const degreeOptions = [
  { value: "S1", label: "S1 (Sarjana)" },
  { value: "S2", label: "S2 (Magister)" },
  { value: "S3", label: "S3 (Doktor)" },
];

const EditLecturerPage = () => {
  const theme = useMantineTheme();
  const user_type = "admin";
  const params = useParams();
  const lecturer_id = parseInt(params.id[0]);
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  const lecturerForm = useForm<LecturerFormValues>({
    initialValues: {
      name: "",
      position: "",
      nip: "",
      nidn: "",
      phone_number: "",
      education: [],
    },
    validate: {
      name: (value) => (value ? null : "Nama harus diisi"),
      nip: (value) => (value ? null : "NIP harus diisi"),
      nidn: (value) => (value ? null : "NIDN harus diisi"),
      education: {
        university: (value) => (value ? null : "Universitas harus diisi"),
        year: (value) => (value ? null : "Tahun harus diisi"),
        field: (value) => (value ? null : "Bidang/Jurusan harus diisi"),
      },
    },
  });

  const getLecturer = useCallback(
    async (lecturerId: number) => {
      const response = await lecturerAction.getProfile(
        user_type,
        lecturerId,
        setLoading
      );

      if (response.success) {
        showNotification({ status: "success", message: response.message });

        const data = response.data;

        lecturerForm.setValues({
          name: data.name,
          nip: data.nip,
          nidn: data.nidn,
          position: data.position.name,
          phone_number: data.phone_number,
          education: data.degree.map((item: any) => ({
            code: item.code,
            degree: item.degree,
            field: item.field,
            university: item.university,
            year: item.year,
          })),
        });
      } else {
        showNotification({ status: "error", message: response.message });
      }
    },
    [user_type]
  );

  const handleSubmit = async () => {
    const data = lecturerForm.getValues();

    const payload = {
      ...data,
      nip: data.nip.toString(),
      nidn: data.nidn.toString(),
      phone_number: data.phone_number.toString(),
      degree: data.education,
    };

    const response = await lecturerAction.updateLecturerProfile(
      user_type,
      lecturer_id,
      payload,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      getLecturer(lecturer_id);
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  const addEducation = () => {
    lecturerForm.insertListItem("education", {
      university: "",
      year: "",
      field: "",
      degree: "S1",
      code: "",
    });
  };

  const removeEducation = (index: number) => {
    lecturerForm.removeListItem("education", index);
  };

  useEffect(() => {
    getLecturer(lecturer_id);
  }, [getLecturer, user_type]);

  return (
    <Card shadow="sm" padding="lg" radius="md" p="md" mt="md" withBorder>
      <form onSubmit={lecturerForm.onSubmit(handleSubmit)}>
        <Group justify="space-between" align="flex-start">
          <Group>
            <Skeleton visible={loading}>
              <Avatar size={120} radius={60} color="gray.2" src={""}>
                <IconUser size={60} stroke={1.5} color={theme.colors.gray[5]} />
              </Avatar>
              <Box>
                <Title order={2}>Edit Profil Dosen</Title>
                <Text color="dimmed">Perbarui informasi dosen</Text>
              </Box>
            </Skeleton>
          </Group>
        </Group>

        <Divider my="md" />

        <Box mb="md">
          <Skeleton visible={loading}>
            <Group align="center" mb="xs">
              <IconUser size={20} />
              <Text fw={600} size="lg">
                Data Dosen
              </Text>
            </Group>

            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  label="Nama"
                  placeholder="Masukkan nama dosen"
                  required
                  {...lecturerForm.getInputProps("name")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Select
                  label="Jabatan"
                  placeholder="Pilih jabatan"
                  data={positionOptions}
                  {...lecturerForm.getInputProps("position")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberInput
                  label="NIP"
                  placeholder="Masukkan NIP"
                  required
                  hideControls
                  {...lecturerForm.getInputProps("nip")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberInput
                  label="NIDN"
                  placeholder="Masukkan NIDN"
                  required
                  hideControls
                  {...lecturerForm.getInputProps("nidn")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <NumberInput
                  label="Nomor Telepon"
                  placeholder="Masukkan Nomor Telepon"
                  required
                  hideControls
                  {...lecturerForm.getInputProps("phone_number")}
                />
              </Grid.Col>
            </Grid>
          </Skeleton>
        </Box>

        <Divider my="md" />

        <Box mb="md">
          <Skeleton visible={loading}>
            <Group align="center" mb="xs" justify="space-between">
              <Group>
                <IconSchool size={20} />
                <Text fw={600} size="lg">
                  Pendidikan
                </Text>
              </Group>
              <Button
                leftSection={<IconPlus size={16} />}
                variant="outline"
                onClick={addEducation}
                size="sm"
              >
                Tambah Pendidikan
              </Button>
            </Group>

            <Stack gap="md">
              {lecturerForm.values.education.map((_, index) => (
                <Paper key={index} p="md" withBorder>
                  <Group justify="flex-end" mb="xs">
                    {lecturerForm.values.education.length > 1 && (
                      <ActionIcon
                        color="red"
                        onClick={() => removeEducation(index)}
                        variant="subtle"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    )}
                  </Group>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Universitas"
                        placeholder="Masukkan nama universitas"
                        required
                        {...lecturerForm.getInputProps(
                          `education.${index}.university`
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Tahun"
                        placeholder="Masukkan tahun lulus"
                        required
                        {...lecturerForm.getInputProps(
                          `education.${index}.year`
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Bidang/Jurusan"
                        placeholder="Masukkan bidang atau jurusan"
                        required
                        {...lecturerForm.getInputProps(
                          `education.${index}.field`
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Select
                        label="Gelar"
                        placeholder="Pilih gelar"
                        data={degreeOptions}
                        required
                        {...lecturerForm.getInputProps(
                          `education.${index}.degree`
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label="Kode"
                        placeholder="Masukkan kode (opsional)"
                        {...lecturerForm.getInputProps(
                          `education.${index}.code`
                        )}
                      />
                    </Grid.Col>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Skeleton>
        </Box>

        <Divider my="md" />

        <Group justify="flex-end" mt="xl">
          <Button type="submit" loading={loading} variant="filled">
            Simpan
          </Button>
        </Group>
      </form>
    </Card>
  );
};

export default EditLecturerPage;
