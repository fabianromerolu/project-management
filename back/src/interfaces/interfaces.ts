export interface ProjectQueryOptions {
  page: number;
  limit: number;
  status?: string;
  priority?: string;
  orderBy?: string;
  orderDir?: "asc" | "desc";
}
