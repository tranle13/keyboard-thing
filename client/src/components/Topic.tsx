import { unknown } from "@/assets";
import { Topic as TopicInterface } from "@/entities/Topic";
import { formatDate } from "@/utils";
import { decode } from "html-entities";
import parse from "html-react-parser";
import Carousel from "./Carousel";

interface Props {
  topic: TopicInterface;
}

const Topic = ({ topic }: Props) => {
  return (
    <div>
      {topic && (
        <>
          <div className="card w-full bg-base-300 shadow gap-5 p-6">
            <div className="flex gap-3 items-center">
              <div className="avatar">
                <div className="w-8 h-8 mask mask-hexagon">
                  <img
                    className=""
                    src={topic.author.image || unknown}
                    alt="author-profile-picture"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{topic.author.username}</span>
                <span className="text-xs">
                  posted on {formatDate(topic.date_posted)}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              {!!topic.images.length && (
                <>
                  <Carousel images={topic.images} />
                  <div className="divider" />
                </>
              )}
              <span>{parse(decode(topic.content))}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Topic;
