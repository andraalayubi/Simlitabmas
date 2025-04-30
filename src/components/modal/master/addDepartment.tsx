import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  Box,
  TextInput,
  Group,
  Button,
  Stack,
  Textarea,
} from "@mantine/core";
import { departmentSchema } from "src/schemas/masterSchema";
import departmentAction from "src/action/departmentAction";
import useNotification from "src/components/notification/notification";
import { useState } from "react";
import { user_type } from "prisma/interfaces";

interface AddDepartmentProps {
  user_type: user_type;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDepartment: React.FC<AddDepartmentProps> = ({
  user_type,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();

  const departmentForm = useForm({
    validate: zodResolver(departmentSchema),
    validateInputOnChange: true,
  });

  const handleSubmit = async () => {
    const response = await departmentAction.createDepartment(
      user_type,
      departmentForm.values,
      setLoading
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      onClose();
      onSuccess();
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  return (
    <>
        <Box p="md">
          <form onSubmit={departmentForm.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Nama Prodi"
                placeholder="Silahkan Isi Nama Prodi"
                {...departmentForm.getInputProps("name")}
              />
              
              <Textarea
                label="Deskripsi Prodi"
                placeholder="Silahkan Isi Deskripsi Prodi"
                {...departmentForm.getInputProps("description")}
              />

              <Group justify="flex-end" mt="md">
                <Button fullWidth type="submit" disabled={loading} size="md">
                  Buat Prodi
                </Button>
              </Group>
            </Stack>
          </form>
        </Box>
    </>
  );
};

export default AddDepartment;
