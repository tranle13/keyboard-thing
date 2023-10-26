import { User } from "./User";

export interface Comment {
  author: User;
  _id?: string;
  content: string;
  date?: string;
  topic: string; // topic id
}
