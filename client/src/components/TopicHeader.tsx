import { Topic as TopicInterface } from "@/entities/Topic";
import { formatDate } from "@/utils";

interface Props {
  topic: TopicInterface;
}

const TopicHeader = ({ topic }: Props) => {
  if (!topic) return;

  return (
    <div className="title-and-tags flex my-5 gap-3">
      <div
        className={`badge mt-[6px] flex-0 ${
          topic.status === "IC" ? "badge-secondary" : "badge-accent"
        }`}
      >
        {topic.status}
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-2xl font-bold">{topic.title}</h2>

        <div className="flex gap-2 items-center">
          {topic.categories.map((c, i) => (
            <div
              key={i}
              className="badge text-neutral border-neutral border-[1px] text-xs"
            >
              {c}
            </div>
          ))}
          <span className="text-xs">
            • project opened on {formatDate(topic.date_posted)}
          </span>
        </div>
      </div>
      {topic.ic_link && (
        <a
          className="btn btn-primary flex-0"
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
