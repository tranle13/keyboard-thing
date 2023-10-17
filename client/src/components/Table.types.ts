export type IC = {
  title: string;
  views: number;
  date_created: string;
  author_pfp: string;
  author: string;
  tags: Tag[];
};

type Tag = {
  name: string;
  color: string;
};
