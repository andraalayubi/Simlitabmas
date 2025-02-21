import { useState } from "react";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { lecturer, user_type } from "prisma/interfaces";
import {
  Box,
  Button,
  Group,
  PasswordInput,
  ScrollArea,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { createUserSchema } from "src/schemas/userSchema";
import userAction from "src/action/userAction";
import useNotification from "src/components/notification/notification";

interface CreateUserModalProps {
  user_type: user_type;
  lecturerData: lecturer;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  user_type,
  lecturerData,
  onClose,
  onSuccess,
}: CreateUserModalProps) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lecturer, setLecturer] = useState<lecturer>(lecturerData);
  const { showNotification } = useNotification();

  const userForm = useForm({
    validate: zodResolver(createUserSchema),
    validateInputOnChange: true,
  });

  // submit to create lecturer
  const handleSubmit = async () => {
    const response = await userAction.createUserLecturer(
      user_type,
      lecturer.id,
      userForm.values
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
      <ScrollArea h={450} type="always" offsetScrollbars>
        <Box p="md">
          <form onSubmit={userForm.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              <TextInput
                label="Email"
                placeholder="you@example.com"
                {...userForm.getInputProps("email")}
              />

              <TextInput
                label="Username"
                placeholder="example2133"
                {...userForm.getInputProps("username")}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                {...userForm.getInputProps("password")}
              />

              <Select
                label="Pilih Role User"
                placeholder="pilih role user"
                data={[
                  { value: "lecturer", label: "Dosen" },
                  { value: "admin", label: "Admin" },
                  ...(lecturer.is_ketua_rg
                    ? [{ value: "ketua_rg", label: "Ketua Research Group" }]
                    : []),
                  ...(lecturer.is_kaprodi
                    ? [{ value: "kaprodi", label: "Kaprodi" }]
                    : []),
                ]}
                {...userForm.getInputProps("user_type")}
              />

              <Group justify="flex-end" mt="xl">
                <Button fullWidth type="submit" disabled={loading} size="md">
                  Buat Akun Dosen
                </Button>
              </Group>
            </Stack>
          </form>
        </Box>
      </ScrollArea>
    </>
  );
};

export default CreateUserModal;
