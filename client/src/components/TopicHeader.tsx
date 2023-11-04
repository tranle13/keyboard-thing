import { badges } from "@/constants";
import { Topic as TopicInterface } from "@/entities/Topic";
import { formatDate } from "@/utils";
import { GrFormViewHide } from "react-icons/gr";

interface Props {
  topic: TopicInterface;
}

const TopicHeader = ({ topic }: Props) => {
  if (!topic) return;

  return (
    <div className="title-and-tags flex my-5 gap-3">
      <div className="stats shadow w-full flex">
        <div className="stat w-max flex-none gap-2">
          <div
            className={`badge mt-[6px] flex-0 justify-self-center ${
              badges[topic.status]
            }`}
          >
            {topic.status}
          </div>
          <div className="flex items-center justify-center gap-2">
            {topic.views}
            <GrFormViewHide />
          </div>
        </div>

        <div className="stat grow-1 gap-2">
          <h2 className="text-2xl font-bold">{topic.title}</h2>

          <div className="flex gap-2 items-center">
            {topic.categories.map((c, i) => (
              <div
                key={i}
                className="badge text-base-content/50 border-base-content/50 border-[1px] text-xs"
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
          <div className="stat flex-none w-max">
            <a className="btn btn-primary" href={topic.ic_link} target="_blank">
              IC Form
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicHeader;
