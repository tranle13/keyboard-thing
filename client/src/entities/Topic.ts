import { TopicImage } from "./TopicImage";
import { User } from "./User";

interface BaseTopic {
  title: string;
  cover_image: string;
  status: "IC" | "GB" | "Closed";
  ic_link: string;
  categories: string[];
  images: TopicImage[];
  content: string;
}

export interface RequestTopic extends BaseTopic {
  author: string;
}

export interface Topic extends BaseTopic {
  date_posted: string;
  views: number;
  author: User;
  _id: string;
}
