import { unknown } from "@/assets";
import { Topic as TopicInterface } from "@/entities/Topic";
import state from "@/store";
import { formatDate } from "@/utils";
import { decode } from "html-entities";
import parse from "html-react-parser";
import { useSnapshot } from "valtio";
import Carousel from "./Carousel";
import TopicActions from "./topic/TopicActions";

interface Props {
  topic: TopicInterface;
}

const Topic = ({ topic }: Props) => {
  const snap = useSnapshot(state);
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
              <div className="flex flex-col flex-1">
                <span className="font-bold">{topic.author.username}</span>
                <span className="text-xs">
                  posted on {formatDate(topic.date_posted)}
                </span>
              </div>
              {snap.user?.username === topic.author.username && (
                <TopicActions topic={topic} />
              )}
            </div>
            <div className="flex flex-col items-center">
              {!!topic.images.length && (
                <>
                  <Carousel images={topic.images} />
                  <div className="divider" />
                </>
              )}
              <div className="w-full">{parse(decode(topic.content))}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Topic;
