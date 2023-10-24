import { Comment } from "./Comment";

export interface Comments {
  page: number;
  pageSize: number;
  total: number;
  data: Comment[];
}
