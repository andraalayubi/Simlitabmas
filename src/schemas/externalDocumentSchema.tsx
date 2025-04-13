import { z } from "zod";

export const createExternalDocumentSchema = z.object({
  name: z.string().nonempty({
    message: "name is required",
  }),
  status: z.string().nonempty({
    message: "status is required",
  }),
  description: z.string(),
  external_document_category_id: z.coerce.number({
    invalid_type_error: "external document category id must be a number",
  }),
});
