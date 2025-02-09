import { z } from "zod";

export const proposalSuggestionPenelitianSchema = z.object({
  name: z.string().min(1, { message: "Judul penelitian harus diisi" }),
  year_research_id: z.string().min(1, { message: "Tahun penelitian harus dipilih" }),
  schema_id: z.string().min(1, { message: "Skema penelitian harus dipilih" }),
  research_group_id: z.string().min(1, { message: "Kelompok penelitian harus dipilih" }),
});

export const proposalSuggestionPengmasSchema = z.object({
  name: z.string().min(1, { message: "Judul pengabdian harus diisi" }),
  year_research_id: z.string().min(1, { message: "Tahun pengabdian harus dipilih" }),
  schema_id: z.string().min(1, { message: "Skema pengabdian harus dipilih" }),
});
