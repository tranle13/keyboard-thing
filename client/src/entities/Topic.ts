import { TopicImage } from "./TopicImage";
import { User } from "./User";

interface BaseTopic {
  title: string;
  images: TopicImage[];
  ic_link: string;
  categories: string[];
  content: string;
  status: "IC" | "GB" | "Closed";
}

export interface RequestTopic extends BaseTopic {
  cover_image: string;
  author: string;
}

export interface Topic extends BaseTopic {
  date_posted: string;
  views: number;
  author: User;
  _id: string;
}
