import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import {
  Box,
  TextInput,
  Group,
  Button,
  Stack,
  NumberInput,
} from "@mantine/core";
import { yearResearchSchema } from "src/schemas/masterSchema";
import useNotification from "src/components/notification/notification";
import { useState } from "react";
import { user_type } from "prisma/interfaces";
import { DateInput } from "@mantine/dates";
import yearResearchAction from "src/action/yearResearchAction";

interface AddYearResearchProps {
  user_type: user_type;
  onClose: () => void;
  onSuccess: () => void;
}

const AddYearResearch: React.FC<AddYearResearchProps> = ({
  user_type,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();

  const yearResearchForm = useForm({
    initialValues: {
      year: "",
      open_date: null,
      close_date: null,
    },
    validate: zodResolver(yearResearchSchema),
    validateInputOnChange: true,
  });

  const handleSubmit = async () => {
    const response = await yearResearchAction.createYearResearch(
      user_type,
      yearResearchForm.values,
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
          <form onSubmit={yearResearchForm.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <NumberInput
                label="Tahun Penelitian"
                placeholder="Silahkan Isi Tahun Penelitian"
                {...yearResearchForm.getInputProps("year")}
              />
              
              <DateInput
                label="Open Date"
                placeholder="Silahkan Isi Open Date"
                {...yearResearchForm.getInputProps("open_date")}
              />
              
              <DateInput
                label="Close Date"
                placeholder="Silahkan Isi Close Date"
                {...yearResearchForm.getInputProps("closed_date")}
              />

              <Group justify="flex-end" mt="md">
                <Button fullWidth type="submit" disabled={loading} size="md">
                  Buat Tahun Penelitian
                </Button>
              </Group>
            </Stack>
          </form>
        </Box>
    </>
  );
};

export default AddYearResearch;
