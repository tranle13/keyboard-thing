import { Topic } from "./Topic";

export interface Topics {
  page: number;
  limit: number;
  total: number;
  topics: Topic[];
}
