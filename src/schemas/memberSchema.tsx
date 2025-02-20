import { z } from "zod";

export const lecturerMemberSchema = z.object({
  usulan_id: z.number(),
  anggota: z.array(z.string()).min(1, { message: "Pilih minimal satu dosen" })
});

export type LecturerMemberFormValues = z.infer<typeof lecturerMemberSchema>;

export const studentMemberSchema = z.object({
  usulan_id: z.number(),
  anggota: z.array(z.string()).min(1, { message: "Pilih minimal satu mahasiswa" })
});

export type StudentMemberFormValues = z.infer<typeof studentMemberSchema>;

export const vendorMemberSchema = z.object({
  usulan_id: z.number(),
  anggota: z.array(z.string()).min(1, { message: "Pilih minimal satu vendor" })
});

export type VendorMemberFormValues = z.infer<typeof vendorMemberSchema>;
