import { Topic } from "./Topic";

export interface Topics {
  page: number;
  pageSize: number;
  total: number;
  data: Topic[];
}
