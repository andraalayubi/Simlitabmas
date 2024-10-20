// This file was auto-generated by prisma-generator-typescript-interfaces

export type user_type = "ketua_rg" | "kaprodi" | "dosen" | "admin";

export type config_type = "system" | "user" | "proposal";

export type proposal_suggestion_status = "tersimpan" | "menunggu" | "ditolak" | "diterima" | "aktif" | "selesai";

export type degree = "S1" | "S2" | "S3";

export type evaluation_phase = "proposal" | "progress_1" | "progress_2" | "progress_3" | "final";

export interface config {
  id: number;
  name: string | null;
  value: JsonValue | null;
  file: string | null;
  default: boolean | null;
  config_type: config_type | null;
}

export interface user {
  id: number;
  name: string | null;
  user_type: user_type | null;
  password: string | null;
  username: string | null;
  email: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  log?: log[];
  user_profile?: user_profile | null;
  lecturer?: lecturer[];
  refresh_token?: refresh_token | null;
}

export interface refresh_token {
  id: number;
  token: string;
  user_id: number;
  user?: user | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

export interface user_profile {
  id: number;
  user_id: number;
  lecturer_id: number;
  bio: string | null;
  gender: string | null;
  profile_pic: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: user | null;
  lecturer?: lecturer | null;
}

export interface lecturer {
  id: number;
  name: string;
  research_group_id: number | null;
  department_id: number | null;
  nidn: string | null;
  nip: string | null;
  degree: JsonValue | null;
  is_ketua_rg: boolean | null;
  position_id: number | null;
  signature_url: string | null;
  user_id: number | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  research_group?: research_group | null;
  department?: department | null;
  position?: position | null;
  user?: user | null;
  proposal_suggestion?: proposal_suggestion[];
  lecturer_member?: lecturer_member[];
  review?: review[];
  user_profile?: user_profile | null;
}

export interface research_group {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  lecturer?: lecturer[];
  proposal_suggestion?: proposal_suggestion[];
}

export interface department {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  lecturer?: lecturer[];
}

export interface year_research {
  id: number;
  year: number;
  open_date: Date;
  closed_date: Date;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  proposal_suggestion?: proposal_suggestion[];
}

export interface position {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  lecturer?: lecturer[];
  position_schema?: position_schema[];
}

export interface position_schema {
  id: number;
  schema_id: number;
  position_id: number;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  schema?: schema | null;
  position?: position | null;
}

export interface schema {
  id: number;
  name: string;
  description: string | null;
  max_cost: bigint | null;
  min_degree: degree | null;
  is_student: boolean | null;
  is_partner: boolean | null;
  is_lecturer: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  position_schema?: position_schema[];
  proposal_suggestion?: proposal_suggestion[];
  cost_category?: cost_category[];
  evaluation?: evaluation[];
  external_document_category?: external_document_category[];
}

export interface proposal_suggestion {
  id: number;
  year_research_id: number | null;
  schema_id: number | null;
  lecturer_id: number | null;
  research_group_id: number | null;
  status: proposal_suggestion_status | null;
  is_active: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  year_research?: year_research | null;
  schema?: schema | null;
  lecturer?: lecturer | null;
  research_group?: research_group | null;
  lecturer_member?: lecturer_member[];
  student_member?: student_member[];
  vendor_member?: vendor_member[];
  suggestion_cost?: suggestion_cost[];
  additonal_document?: additional_document[];
  external_document?: external_document[];
  review?: review[];
  proposal?: proposal | null;
}

export interface proposal {
  id: number;
  proposal_suggestion_id: number;
  name: string;
  title: string;
  abstract: JsonValue | null;
  keyword: JsonValue | null;
  background: JsonValue | null;
  purpose: JsonValue | null;
  method: JsonValue | null;
  literature_review: JsonValue | null;
  bibliography: JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  suggestion?: proposal_suggestion;
}

export interface lecturer_member {
  id: number;
  proposal_suggestion_id: number;
  lecturer_id: number;
  name: string;
  research_group_id: number | null;
  department_id: number | null;
  nip: string | null;
  degree: JsonValue | null;
  is_ketua_rg: boolean | null;
  position_id: number | null;
  signature_url: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  proposal_suggestion?: proposal_suggestion;
  lecturer?: lecturer;
}

export interface student_member {
  id: number;
  proposal_suggestion_id: number;
  name: string;
  nrp: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  proposal_suggestion?: proposal_suggestion;
}

export interface vendor_member {
  id: number;
  proposal_suggestion_id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  proposal_suggestion?: proposal_suggestion;
}

export interface suggestion_cost {
  id: number;
  name: string;
  proposal_suggestion_id: number;
  cost_category_id: number;
  total: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  proposal_suggestion?: proposal_suggestion;
  cost_category?: cost_category;
}

export interface cost_category {
  id: number;
  schema_id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  schema?: schema;
  suggestion_cost?: suggestion_cost[];
}

export interface additional_document {
  id: number;
  proposal_suggestion_id: number;
  name: string;
  content: string | null;
  file_url: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  proposal_suggestion?: proposal_suggestion;
}

export interface external_document {
  id: number;
  name: string;
  proposal_suggestion_id: number;
  external_document_category_id: number;
  description: string | null;
  file_url: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  proposal_suggestion?: proposal_suggestion;
  external_document_category?: external_document_category;
}

export interface log {
  id: number;
  table: string;
  audit: string | null;
  user_id: number | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  user?: user | null;
}

export interface evaluation {
  id: number;
  name: string;
  schema_id: number;
  evaluation_phase: evaluation_phase | null;
  score_weight: number | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  schema?: schema;
  review?: review[];
}

export interface review {
  id: number;
  evaluation_id: number;
  lecturer_id: number;
  proposal_suggestion_id: number;
  note: string | null;
  score: number | null;
  status: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  evaluation?: evaluation;
  lecturer?: lecturer;
  proposal_suggestion?: proposal_suggestion;
}

export interface external_document_category {
  id: number;
  schema_id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  schema?: schema;
  external_document?: external_document[];
}

type JsonValue = string | number | boolean | { [key in string]?: JsonValue } | Array<JsonValue> | null;
