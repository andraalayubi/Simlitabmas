import { useCallback, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { user_type } from "prisma/interfaces";
import researchGroupAction from "src/action/researchGroupAction";
import departmentAction from "src/action/departmentAction";
import lecturerAction from "src/action/lecturerAction";
import {
  Box,
  Button,
  Group,
  ScrollArea,
  Select,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { createLecturerSchema } from "src/schemas/userSchema";
import useNotification from "src/components/notification/notification";
import positionAction from "src/action/positionAction";

interface CreateLecturerModalProps {
  user_type: user_type;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateLecturerModal: React.FC<CreateLecturerModalProps> = ({
  user_type,
  onClose,
  onSuccess,
}: CreateLecturerModalProps) => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [researchGroups, setResearchGroups] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const { showNotification } = useNotification();

  const lecturerForm = useForm({
    initialValues: {
      department_id: "",
      research_group_id: "",
      position_id: "",
      is_kaprodi: false,
      is_ketua_rg: false,
    },
    validate: zodResolver(createLecturerSchema),
    validateInputOnChange: true,
  });

  // get department
  const getDepartments = useCallback(async () => {
    const response = await departmentAction.getDepartment(
      user_type,
      setLoading
    );

    if (response.success) {
      const transformedData = response.data.map((item: any) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setDepartments(transformedData);
    }
  }, [user_type]);

  // get research group
  const getResearchGroups = useCallback(async () => {
    const response = await researchGroupAction.getResearchGroup(
      user_type,
      setLoading
    );

    if (response.success) {
      const transformedData = response.data.map((item: any) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setResearchGroups(transformedData);
    }
  }, [user_type]);

  // get position
  const getPosition = useCallback(async () => {
    const response = await positionAction.getPositions(user_type, setLoading);
    if (response.success) {
      const transformedData = response.data.map((item: any) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setPositions(transformedData);
    }
  }, [user_type]);

  // submit to create lecturer
  const handleSubmit = async () => {
    // parsing payload string to int
    let values = lecturerForm.values;
    const payload = {
      ...values,
      department_id: parseInt(values.department_id),
      research_group_id: parseInt(values.research_group_id),
      position_id: parseInt(values.position_id),
    };

    console.log(lecturerForm.getTransformedValues());

    const response = await lecturerAction.createLecturer(
      user_type,
      payload,
    );

    if (response.success) {
      showNotification({ status: "success", message: response.message });
      onClose();
      onSuccess();
    } else {
      showNotification({ status: "error", message: response.message });
    }
  };

  useEffect(() => {
    getResearchGroups();
    getDepartments();
    getPosition();
  }, [getDepartments, getResearchGroups, getPosition]);

  return (
    <>
      {/* <ScrollArea h={500} type="always" offsetScrollbars> */}
        <Box p="md">
          <form onSubmit={lecturerForm.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              <TextInput
                label="Nama Dosen"
                placeholder="nama dosen"
                {...lecturerForm.getInputProps("name")}
              />
              <TextInput
                label="NIP"
                placeholder="12388319912"
                {...lecturerForm.getInputProps("nip")}
              />
              <TextInput
                label="NIDN"
                placeholder="912093093212"
                {...lecturerForm.getInputProps("nidn")}
              />
              <TextInput
                label="Nomor Telepon"
                placeholder="08123456789"
                {...lecturerForm.getInputProps("phone_number")}
              />
              <Select
                label="Pilih Research Group"
                placeholder="pilih research group"
                data={researchGroups}
                {...lecturerForm.getInputProps("research_group_id")}
                searchable
              />

              <Select
                label="Pilih Department"
                placeholder="pilih Department"
                data={departments}
                {...lecturerForm.getInputProps("department_id")}
                searchable
              />

              <Select
                label="Pilih Jabatan"
                placeholder="pilih Jabatan"
                data={positions}
                {...lecturerForm.getInputProps("position_id")}
                searchable
              />

              <Group gap="xl" mt="sm" mb="md">
                <Switch
                  label="Ketua Research Group"
                  {...lecturerForm.getInputProps("is_ketua_rg", {
                    type: "checkbox",
                  })}
                />
                <Switch
                  label="Kaprodi"
                  {...lecturerForm.getInputProps("is_kaprodi", {
                    type: "checkbox",
                  })}
                />
              </Group>

              <Group justify="flex-end" mt="xl">
                <Button fullWidth type="submit" disabled={loading} size="md">
                  Tambahkan Dosen
                </Button>
              </Group>
            </Stack>
          </form>
        </Box>
      {/* </ScrollArea> */}
    </>
  );
};

export default CreateLecturerModal;
