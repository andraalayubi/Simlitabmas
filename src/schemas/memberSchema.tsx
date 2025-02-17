import { z } from 'zod';

export const lecturerMemberSchema = z.object({
  usulan_id: z.number(),
  anggota: z.array(z.string()).min(1, 'Pilih minimal satu anggota')
});

export type LecturerMemberFormValues = z.infer<typeof lecturerMemberSchema>;