import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Box,
  Button,
  Group,
  NumberInput,
  ScrollArea,
  Stack,
  TextInput,
} from "@mantine/core";
import useNotification from "src/components/notification/notification";
import { user_type } from "prisma/interfaces";
import criterionAction from "src/action/criterionAction";

interface CreateCriterionModalProps {
  user_type: user_type;
  conditionData: {
    type: string;
    phase: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

const CreateCriterionModal: React.FC<CreateCriterionModalProps> = ({
  user_type,
  conditionData,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const form = useForm({
    initialValues: {
      name: "",
      weight: 0,
    },
    validate: {
    name: (value) => (value.trim().length === 0 ? "Nama kriteria wajib diisi" : null),
    weight: (value) =>
      value === 0
        ? "Bobot kriteria tidak boleh 0"
        : null,
  },
    validateInputOnChange: true,
  });

  const handleSubmit = async () => {
    const formData = {
      ...form.values,
      type: conditionData.type,
      phase: conditionData.phase,
    };

    const response = await criterionAction.createCriterion(
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

  useEffect(() => {
    console.log(conditionData);
  }, []);

  return (
    <Box p="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="sm">
          <TextInput
            label="Nama Kriteria"
            placeholder="Input Nama"
            {...form.getInputProps("name")}
          />
          <NumberInput
            label="Bobot Kriteria"
            placeholder="Input Bobot"
            {...form.getInputProps("weight")}
            allowDecimal={false}
            allowNegative={false}
            min={0}
            max={10}
          />
          <Group justify="flex-end" mt="xl">
            <Button fullWidth type="submit" loading={loading} size="md">
              Simpan Kriteria
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateCriterionModal;
