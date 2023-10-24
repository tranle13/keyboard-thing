import { TopicImage } from "./TopicImage";
import { User } from "./User";

export interface Topic {
  title: string;
  images: TopicImage[];
  ic_link: string;
  date_posted: string;
  categories: Category[];
  content: string;
  status: "IC" | "GB" | "Closed";
  views: number;
  author: User;
  _id: string;
}

interface Category {
  name: "Keyboard" | "Keycap" | "Switch" | "PCB" | "Badge";
  color: string;
}
