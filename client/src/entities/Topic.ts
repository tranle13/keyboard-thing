import { TopicImage } from "./TopicImage";

export interface Topic {
  title: string;
  images: TopicImage[];
  ic_link: string;
  date_posted: string;
  categories: Category[];
  content: string;
  status: "IC" | "GB" | "Closed";
  views: number;
  author: Author;
  _id: string;
  comments: Comment[];
}

interface Category {
  name: "Keyboard" | "Keycap" | "Switch" | "PCB" | "Badge";
  color: string;
}

interface Author {
  _id?: string;
  username: string;
  image: string;
}

interface Comment {
  author: Author;
  _id: string;
  content: string;
  date: string;
  topic: string; // topic id
}
