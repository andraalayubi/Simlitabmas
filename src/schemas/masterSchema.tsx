import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;

export const researchGroupSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
});

export type ResearchGroupFormValues = z.infer<typeof researchGroupSchema>;

export const yearResearchSchema = z.object({
  year: z.number().min(1, { message: "Tahun wajib diisi" }),
  open_date: z.date({ message: "Tanggal mulai wajib diisi" }),
  closed_date: z.date({ message: "Tanggal berakhir wajib diisi" }),
});

export type YearResearchFormValues = z.infer<typeof yearResearchSchema>;

export const schemaSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
  type: z.enum(['penelitian', 'pengmas'], { 
    errorMap: () => ({ message: "Pilih jenis skema yang valid" }) 
  }),
  min_degree: z.enum(['S1', 'S2', 'S3'], { 
    errorMap: () => ({ message: "Pilih jenjang yang valid" }) 
  }),
  is_lecturer: z.boolean().optional(),
  is_student: z.boolean().optional(),
  is_partner: z.boolean().optional(),
  positions: z.record(z.boolean()).refine(
    (val) => Object.values(val).some(v => v),
    { message: "Satu jabatan harus dipilih" }
  )
}).refine(
  (data) => data.is_lecturer || data.is_student || data.is_partner,
  {
    message: "Pilih minimal satu jenis anggota",
    path: ["member_selection"]
  }
);

export type SchemaFormValues = z.infer<typeof schemaSchema>;