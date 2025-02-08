import { z } from "zod";

export const proposalSuggestionSchema = z.object({
  title: z.string().min(10, { message: "Research title must be at least 10 characters long" }),
  description: z.string().min(20, { message: "Research description must be at least 20 characters long" }),
  research_group_id: z.number().positive({ message: "Please select a research group" }),
  schema_id: z.number().positive({ message: "Please select a research schema" }),
  year_research_id: z.number().positive({ message: "Please select a research year" }),
});
