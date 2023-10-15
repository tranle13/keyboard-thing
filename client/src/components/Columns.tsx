import { Badge } from "@/shadcn-ui/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type IC = {
  title: string;
  views: number;
  date_created: string;
  author_pfp: string;
  author: string;
  status: "IC" | "GB";
  tags: Tag[];
};

type Tag = {
  name: string;
  color: string;
};

export const columns: ColumnDef<IC>[] = [
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const ic = row.original;
      return (
        <div className="flex flex-wrap gap-2">
          <img
            className="w-5 rounded-full"
            src={ic.author_pfp}
            alt="profile-picture"
          />
          <span>{ic.author}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "tags",
    header: "Categories",
    cell: ({ row }) => {
      const tags = row.original.tags;
      return (
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <Badge className={`${tag.color}`} key={index}>
              {tag.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "date_created",
    header: "Date posted",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge className={`status-${status.toLowerCase()}`}>{status}</Badge>
      );
    },
  },
];
