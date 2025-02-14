import * as z from 'zod';

export const anggotaSchema = z.object({
  name: z.string(),
  // name: z.string()
  //   .min(2, { message: "Nama harus memiliki minimal 2 karakter" })
  //   .max(100, { message: "Nama tidak boleh lebih dari 100 karakter" })
  //   .regex(/^[a-zA-Z\s.]+$/, { message: "Nama hanya boleh berisi huruf, spasi, dan titik" }),
  
  nidn: z.string()
    .length(10, { message: "NIDN harus terdiri dari 10 digit" })
    .regex(/^\d{10}$/, { message: "NIDN harus berupa 10 angka" }),
  
  usulan_id: z.string()
    .min(1, { message: "ID usulan diperlukan" })
});