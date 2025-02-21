import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

export const createUserSchema = z.object({
  email: z.string().email({
    message: "Invalid format email address",
  }),
  username: z.string().nonempty({
    message: "Username is required",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }),
  user_type: z.enum(["lecturer", "kaprodi", "admin", "ketua_rg"], {
    errorMap: () => ({
      message:
        'user_type must be one of "lecturer", "kaprodi", "admin", or "ketua_rg"',
    }),
  }),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;


export const createLecturerSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required",
  }),
  nip: z.coerce.number({
    invalid_type_error: "NIP must be a number",
  }),
  nidn: z.coerce.number({
    invalid_type_error: "NIDN must be a number",
  }),
  department_id: z.string().nonempty({
    message: "Department is required",
  }),
  research_group_id: z.string().nonempty({
    message: "Research Group is required",
  }),
  position_id: z.string().nonempty({
    message: "Position is required",
  }),
  is_kaprodi: z.boolean({
    invalid_type_error: "is_kaprodi must be a boolean",
  }),
  is_ketua_rg: z.boolean({
    invalid_type_error: "is_ketua_rg must be a boolean",
  }),
});

export type CreateLecturerFormValues = z.infer<typeof createLecturerSchema>;
