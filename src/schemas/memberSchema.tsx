import { z } from "zod";

export const lecturerMemberSchema = z.object({
  usulan_id: z.number(),
  anggota: z.array(z.string()).min(1, { message: "Pilih minimal satu dosen" }),
});

export type LecturerMemberFormValues = z.infer<typeof lecturerMemberSchema>;

export const studentMemberSchema = z.object({
  usulan_id: z.number(),
  anggota: z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    nrp: z
      .number()
      .min(1, "NRP wajib diisi")
      .refine((val) => val.toString().length === 10, {
        message: "NRP harus terdiri dari 10 digit",
      }),
    department: z.string().min(1, "Pilih program studi"),
  }),
});

export type StudentMemberFormValues = z.infer<typeof studentMemberSchema>;

export const vendorMemberSchema = z.object({
  usulan_id: z.number(),
  anggota: z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    description: z.string().min(1, "Deskripsi wajib diisi"),
  }),
});

export type VendorMemberFormValues = z.infer<typeof vendorMemberSchema>;
