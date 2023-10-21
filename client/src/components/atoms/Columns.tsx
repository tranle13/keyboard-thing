import { unknown } from "@/assets";
import { Topic } from "@/entities/Topic";
import { Badge } from "@/shadcn-ui/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Topic>[] = [
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const topic = row.original;
      return (
        <div className="flex flex-wrap gap-2">
          <img
            className="w-5 rounded-full"
            src={topic.author.image || unknown}
            alt="profile-picture"
          />
          <span>{topic.author.username}</span>
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
      const categories = row.original.categories;
      return (
        <div className="flex gap-2 flex-wrap">
          {categories.map((c, i) => (
            <Badge className={`${c.color}`} key={i}>
              {c.name}
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
    cell: ({ row }) => {
      const date = row.original.date_posted;
      return <span>{format(new Date(date), "MMM dd, yyyy")}</span>;
    },
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
