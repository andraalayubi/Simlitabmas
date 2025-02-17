import * as z from 'zod';

export const lecturerMemberSchema = z.object({
  name: z.string(),
  nidn: z.string(),
  usulan_id: z.string()
    .min(1, { message: "ID usulan diperlukan" })
});