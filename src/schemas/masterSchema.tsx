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