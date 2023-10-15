export interface PostImage {
  url: string;
  caption?: string;
}

export interface Post {
  title: string;
  status: "IC" | "GB";
  tags: Tag[];
  ic_link: string;
  author: string;
  author_pfp: string;
  date: string;
  description: string;
  images: PostImage[];
  comments: Comment[];
}

interface Tag {
  name: string;
  color: string;
}

interface Comment {
  author: string;
  author_pfp: string;
  content: string;
  date: string;
}

export interface FormState {
  username: string;
  email?: string;
  password: string;
}
