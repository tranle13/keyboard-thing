export interface Topic {
  title: string;
  images: Image[];
  ic_link: string;
  date_posted: Date;
  categories: Category[];
  content: string;
  status: "IC" | "GB" | "Closed";
  views: number;
  author: Author;
  _id: string;
}

interface Image {
  url: string;
  caption: string;
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
