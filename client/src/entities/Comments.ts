import { Comment } from "./Comment";

export interface Comments {
  page: number;
  limit: number;
  total: number;
  comments: Comment[];
}
