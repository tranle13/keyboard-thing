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
    <div className="topic relative bg-cream">
      {topic && (
        <>
          <div className="absolute">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={topic.author.image || unknown}
              alt="author-profile-picture"
            />
          </div>
          <div className="post border-[1px] border-solid border-sorta-black rounded-lg ml-14 relative after:bg-cream before:bg-sorta-black">
            <div className="px-4 py-2 border-b-sorta-black border-solid border-b-[1px]">
              <span className="font-bold">{topic.author.username}</span> &nbsp;
              <span className="text-gray-400 text-sm">
                posted on {formatDate(topic.date_posted)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-5 p-4">
              <Carousel images={topic.images} />
              <span>{parse(decode(topic.content))}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Topic;
