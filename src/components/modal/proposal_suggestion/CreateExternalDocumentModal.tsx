import { proposal_suggestion, user_type } from "prisma/interfaces";
import { useCallback, useEffect, useState } from "react";
import externalDocumentAction from "src/action/externalDocumentAction";
import useNotification from "src/components/notification/notification";
import { useForm } from "@mantine/form";
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
import { zodResolver } from "mantine-form-zod-resolver";
import { createExternalDocumentSchema } from "src/schemas/externalDocumentSchema";

interface CreateExternalModalProps {
  user_type: user_type;
  proposal_suggestion: proposal_suggestion;
  onClose: () => void;
  onSuccess: () => void;
  disabled: boolean;
}

const CreateExternalDocumentModal: React.FC<CreateExternalModalProps> = ({
  user_type,
  proposal_suggestion,
  onClose,
  onSuccess,
  disabled,
}: CreateExternalModalProps) => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [externalDocumentCategories, setExternalDocumentCategories] = useState<
    any[]
  >([]);

  const externalDocumentForm = useForm({
    initialValues: {
      external_document_category_id: "",
    }, 
    validate: zodResolver(createExternalDocumentSchema),
    validateInputOnChange: true,
  })

  const getExternalDocumentsCategories = useCallback(async () => {
    const response = await externalDocumentAction.getExternalDocumentsCategory(
      proposal_suggestion.schema_id!,
      user_type,
      setLoading
    );

    if (response.success) {
      const transformedData = response.data.map((item: any) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setExternalDocumentCategories(transformedData);
    }
  }, [user_type]);

  const handleSubmit = async () => {

    let values = externalDocumentForm.values;
    const payload = {
      ...values,
      external_document_category_id : parseInt(values.external_document_category_id),
    }

    const response = await externalDocumentAction.createExternalDocument(
      payload,
      proposal_suggestion.id,
      user_type,
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
    getExternalDocumentsCategories();
  }, [getExternalDocumentsCategories]);

  return (
    <>
      <Box>
        <form onSubmit={externalDocumentForm.onSubmit(handleSubmit)}>
          <Stack>
          {/* <TextInput
                label="Nama Luaran"
                placeholder="Jurnal..."
                required
                {...externalDocumentForm.getInputProps("name")}
              />
          
          <TextInput
                label="Status Luaran"
                placeholder="dalam progress..."
                required
                {...externalDocumentForm.getInputProps("status")}
              />
           */}
          {/* <TextInput
                label="Deskripsi Luaran"
                placeholder="penjelasan singkat luaran"
                {...externalDocumentForm.getInputProps("description")}
              /> */}
          
          <Select
                label="Pilih Kategori Luaran"
                placeholder="pilih kategori luaran"
                required
                data={externalDocumentCategories}
                {...externalDocumentForm.getInputProps("external_document_category_id")}
                searchable
              />
              <Group justify="flex-end" mt="md">
                <Button fullWidth type="submit" disabled={loading && disabled} size="md">
                  Tambahkan Luaran
                </Button>
              </Group>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default CreateExternalDocumentModal;
