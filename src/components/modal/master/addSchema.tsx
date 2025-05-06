import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  Box,
  TextInput,
  Group,
  Button,
  Stack,
  NumberInput,
  Text,
  SimpleGrid,
  Checkbox,
  Select,
  Switch,
  Textarea,
} from "@mantine/core";
import { schemaSchema } from "src/schemas/masterSchema";
import useNotification from "src/components/notification/notification";
import { useState } from "react";
import { position, user_type } from "prisma/interfaces";
import schemaAction from "src/action/schemaAction";

interface AddSchemaProps {
  user_type: user_type;
  onClose: () => void;
  onSuccess: () => void;
  positions: position[];
}

const AddSchema: React.FC<AddSchemaProps> = ({
  user_type,
  onClose,
  onSuccess,
  positions,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();

  const schemaForm = useForm({
    initialValues: {
      name: "",
      description: "",
      type: "",
      min_degree: "",
      is_lecturer: true,
      is_student: true,
      is_partner: true,
      positions: positions.reduce((acc, position) => {
        acc[position.id] = false;
        return acc;
      }, {} as Record<string, boolean>),
    },
    validate: zodResolver(schemaSchema),
    validateInputOnChange: true,
  });
  console.log("a", schemaForm.values.min_degree, "b");
  

  const handleSubmit = async () => {
    const formData = { ...schemaForm.values };
  
    // Paksa set min_degree = 'S1' jika type adalah 'pengmas'
    if (formData.type === 'pengmas') {
      formData.min_degree = 'S1';
    }
  
    const response = await schemaAction.createSchema(
      user_type,
      formData,
      setLoading
    );
  
    if (response.success) {
      showNotification({ status: "success", message: response.message });
      onClose();
      onSuccess();
    } else {
      showNotification({ status: "error", message: response.message });
      console.error(response.message);
    }
  };

  return (
    <>
      <Box p="md">
        <form onSubmit={schemaForm.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            <TextInput
              label={
                <Text fs="14" fw={500}>
                  Nama
                </Text>
              }
              placeholder="Silahkan Isi Nama"
              {...schemaForm.getInputProps("name")}
            />
            
            <Select
              label={
                <Text fs="14" fw={500}>
                  Tipe
                </Text>
              }
              placeholder="Pilih tipe"
              {...schemaForm.getInputProps("type")}
              data={[
                { value: "penelitian", label: "Penelitian" },
                { value: "pengmas", label: "Pengmas" },
              ]}
            />

            <Textarea
              label={
                <Text fs="14" fw={500}>
                  Deskripsi
                </Text>
              }
              placeholder="Silahkan Isi Deskripsi"
              {...schemaForm.getInputProps("description")}
            />

            {(!schemaForm.values.type || schemaForm.values.type === 'penelitian') && (
              <>
                <Select
                  label={
                    <Text fs="14" fw={500}>
                      Minimal gelar
                    </Text>
                  }
                  placeholder="Pilih minimal gelar"
                  {...schemaForm.getInputProps("min_degree")}
                  data={[
                    { value: "S1", label: "S1" },
                    { value: "S2", label: "S2" },
                    { value: "S3", label: "S3" },
                  ]}
                />

                <Text fs="14" fw={500}>
                  Jabatan yang Bisa Mengakses
                </Text>
                {schemaForm.errors.positions && (
                  <Text c="red" size="sm" mt={-10}>
                    {schemaForm.errors.positions}
                  </Text>
                )}
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                  {positions.map((position) => (
                    <Checkbox
                      key={position.id}
                      label={position.name}
                      checked={schemaForm.values.positions[position.id] || false}
                      onChange={(event) => {
                        schemaForm.setFieldValue(
                          `positions.${position.id}`,
                          event.currentTarget.checked
                        );
                      }}
                    />
                  ))}
                </SimpleGrid>

                <Text fs="14" fw={500}>
                  Anggota yang bisa mengikuti
                </Text>
                {schemaForm.errors.member_selection && (
                  <Text c="red" size="sm" mt={-10}>
                    {schemaForm.errors.member_selection}
                  </Text>
                )}
                <Stack gap="xs">
                  <Switch
                    label="Dosen"
                    checked={schemaForm.values.is_lecturer}
                    {...schemaForm.getInputProps("is_lecturer")}
                    error={!!schemaForm.errors.member_selection}
                  />
                  <Switch
                    label="Mahasiswa"
                    checked={schemaForm.values.is_student}

                    {...schemaForm.getInputProps("is_student")}
                    error={!!schemaForm.errors.member_selection}
                  />
                  <Switch
                    label="Partner / Vendor"
                    checked={schemaForm.values.is_partner}
                    {...schemaForm.getInputProps("is_partner")}
                    error={!!schemaForm.errors.member_selection}
                  />
                </Stack>
              </>
            )}

            <Group justify="flex-end" mt="md">
              <Button fullWidth type="submit" disabled={loading} size="md">
                Buat Skema
              </Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddSchema;
