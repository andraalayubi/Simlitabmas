import { useForm } from "@mantine/form";
import { Box, Group, Button, Stack, Text, Select } from "@mantine/core";
import useNotification from "src/components/notification/notification";
import { useState } from "react";
import { lecturer, user_type } from "prisma/interfaces";
import reviewerAction from "src/action/reviewerAction";

interface AddReviewerProps {
  user_type: user_type;
  onClose: () => void;
  onSuccess: () => void;
  lecturers: lecturer[];
}

const AddReviewer: React.FC<AddReviewerProps> = ({
  user_type,
  onClose,
  onSuccess,
  lecturers,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { showNotification } = useNotification();

  const reviewerForm = useForm({
    initialValues: {
      lecturer_id: "",
      category: "",
    },
      validate: {
    lecturer_id: (value) =>
      value.trim() === "" ? "Dosen harus dipilih" : null,
    category: (value) =>
      value.trim() === "" ? "Tipe harus dipilih" : null,
  },
    validateInputOnChange: true,
  });

const handleSubmit = async () => {
  const formData = { ...reviewerForm.values };
  const lecturerId = parseInt(formData.lecturer_id);

  // Cari dosen yang dipilih
  const selectedLecturer = lecturers.find(
    (lect) => lect.id === lecturerId
  );

  // Cek apakah sudah pernah jadi reviewer (dan dihapus)
  const existingReviewer = selectedLecturer?.reviewer?.find(
    (r) => r.deleted === true
  );

  let response;

  if (existingReviewer) {
    // Kalau reviewer sudah ada dan dihapus, cukup update
    response = await reviewerAction.updateReviewer(
      user_type,
      setLoading,
      existingReviewer.id,
      {
        deleted: false,
        category: formData.category,
      }
    );
  } else {
    // Kalau belum pernah jadi reviewer, bikin baru
    response = await reviewerAction.createReviewer(
      user_type,
      formData,
      setLoading
    );
  }

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
        <form onSubmit={reviewerForm.onSubmit(handleSubmit)}>
          <Stack gap="sm">
            <Select
              label={
                <Text fs="14" fw={500}>
                  Dosen
                </Text>
              }
              placeholder="Pilih dosen"
              {...reviewerForm.getInputProps("lecturer_id")}
              data={lecturers
                .filter(
                  (lecturer) =>
                    // Tidak punya reviewer sama sekali
                    !lecturer.reviewer ||
                    lecturer.reviewer.length === 0 ||
                    // Atau reviewer-nya sudah didelete semua
                    lecturer.reviewer.every((r) => r.deleted === true)
                )
                .map((lecturer) => ({
                  value: lecturer.id.toString(),
                  label: lecturer.name,
                }))}
            />

            <Select
              label={
                <Text fs="14" fw={500}>
                  Tipe
                </Text>
              }
              placeholder="Pilih tipe"
              {...reviewerForm.getInputProps("category")}
              data={[
                { value: "penelitian", label: "Penelitian" },
                { value: "pengmas", label: "Pengmas" },
              ]}
            />

            <Group justify="flex-end" mt="md">
              <Button fullWidth type="submit" disabled={loading} size="md">
                Tambah Reviewer
              </Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddReviewer;
