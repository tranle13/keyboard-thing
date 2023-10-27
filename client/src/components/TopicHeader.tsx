import { Topic as TopicInterface } from "@/entities/Topic";
import { Badge } from "@/shadcn-ui/components/ui/badge";
import { buttonVariants } from "@/shadcn-ui/components/ui/button";
import { formatDate } from "@/utils";

interface Props {
  topic: TopicInterface;
}

const TopicHeader = ({ topic }: Props) => {
  if (!topic) return;

  return (
    <div className="title-and-tags flex my-5 gap-3">
      <Badge className={`h-min mt-1 status-${topic.status.toLowerCase()}`}>
        {topic.status}
      </Badge>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">{topic.title}</h2>

        <div className="flex gap-2 text-gray-400 items-center">
          {topic.categories.map((c, i) => (
            <Badge
              key={i}
              className="text-gray-400 bg-cream border-gray-400 border-2"
            >
              {c.name}
            </Badge>
          ))}
          <span className="text-xs">
            • project opened on {formatDate(topic.date_posted)}
          </span>
        </div>
      </div>
      {topic.ic_link && (
        <a
          className={`${buttonVariants()} ml-auto my-auto`}
          href={topic.ic_link}
          target="_blank"
        >
          IC Form
        </a>
      )}
    </div>
  );
};

export default TopicHeader;
