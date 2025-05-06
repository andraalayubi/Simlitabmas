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
  min_degree: z.string().trim().optional().nullable(),
  is_lecturer: z.boolean().optional(),
  is_student: z.boolean().optional(),
  is_partner: z.boolean().optional(),
  positions: z.record(z.boolean()).optional()
}).refine(
  (data) => {
    if (data.type === 'pengmas') return true;
    
    if (data.min_degree) {
      return ['S1', 'S2', 'S3'].includes(data.min_degree);
    }
    
    return false;
  },
  {
    message: "Minimal gelar harus diisi (S1, S2, atau S3)",
    path: ["min_degree"]
  }
).refine(
  (data) => {
    if (data.type === 'pengmas') return true;
    
    const hasSelectedPosition = data.positions ? 
      Object.values(data.positions).some(v => v) : false;
    
    return hasSelectedPosition;
  },
  {
    message: "Satu jabatan harus dipilih",
    path: ["positions"]
  }
).refine(
  (data) => {
    if (data.type === 'pengmas') return true;
    
    const hasMemberSelection = data.is_lecturer || data.is_student || data.is_partner;
    
    return hasMemberSelection;
  },
  {
    message: "Pilih minimal satu jenis anggota",
    path: ["member_selection"]
  }
);

export type SchemaFormValues = z.infer<typeof schemaSchema>;