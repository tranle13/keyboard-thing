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
}

interface Category {
  name: "Keyboard" | "Keycap" | "Switch" | "PCB" | "Badge";
  color: string;
}

interface Author {
  _id: string;
  username: string;
  image: string;
}
