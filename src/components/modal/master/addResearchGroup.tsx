import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  Box,
  TextInput,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import { researchGroupSchema } from "src/schemas/masterSchema";
import useNotification from "src/components/notification/notification";
import { useState } from "react";
import { user_type } from "prisma/interfaces";
import researchGroupAction from "src/action/researchGroupAction";

interface AddResearchGroupProps {
  user_type: user_type;
  onClose: () => void;
  onSuccess: () => void;
}

const AddResearchGroup: React.FC<AddResearchGroupProps> = ({
  user_type,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();

  const researchGroupForm = useForm({
    validate: zodResolver(researchGroupSchema),
    validateInputOnChange: true,
  });

  const handleSubmit = async () => {
    const response = await researchGroupAction.createResearchGroup(
      user_type,
      researchGroupForm.values,
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
          <form onSubmit={researchGroupForm.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Nama Research Group"
                placeholder="Silahkan Isi Nama Research Group"
                {...researchGroupForm.getInputProps("name")}
              />
              <TextInput
                label="Deskripsi Research Group"
                placeholder="Silahkan Isi Deskripsi Research Group"
                {...researchGroupForm.getInputProps("description")}
              />

              <Group justify="flex-end" mt="md">
                <Button fullWidth type="submit" disabled={loading} size="md">
                  Buat Research Group
                </Button>
              </Group>
            </Stack>
          </form>
        </Box>
    </>
  );
};

export default AddResearchGroup;
