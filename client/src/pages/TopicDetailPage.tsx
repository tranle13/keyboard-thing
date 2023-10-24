import { loading, unknown } from "@/assets";
import Carousel from "@/components/Carousel";
import CommentForm from "@/components/CommentForm";
import { Spinner } from "@/components/Spinner";
import useComments from "@/hooks/useComments";
import useTopic from "@/hooks/useTopic";
import authService from "@/services/authService";
import { Badge } from "@/shadcn-ui/components/ui/badge";
import { buttonVariants } from "@/shadcn-ui/components/ui/button";
import { formatDate } from "@/utils";
import { decode } from "html-entities";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

const TopicDetailPage = () => {
  const { id } = useParams();
  const user = authService.getCurrentUser();
  const {
    data: comments,
    error: cError,
    isLoading: cIsLoading,
  } = useComments(id || "");
  const {
    data: topic,
    error: tError,
    isLoading: tIsLoading,
  } = useTopic(id || "");

  if (tError || !topic) return null;
  if (tIsLoading) return <img src={loading} alt="loading" className="w-10" />;

  return (
    <div className="w-full px-10 pb-5">
      <div className="title-and-tags flex my-5 gap-3">
        <Badge className={`h-min mt-1 status-${topic?.status?.toLowerCase()}`}>
          {topic?.status}
        </Badge>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">{topic?.title}</h2>

          <div className="flex gap-2 text-gray-400 items-center">
            {topic?.categories.map((c, i) => (
              <Badge
                key={i}
                className="text-gray-400 bg-cream border-gray-400 border-2"
              >
                {c.name}
              </Badge>
            ))}
            <span className="text-xs">
              • project opened on {formatDate(topic?.date_posted)}
            </span>
          </div>
        </div>
        {topic?.ic_link && (
          <a
            className={`${buttonVariants()} ml-auto my-auto`}
            href={topic?.ic_link}
          >
            IC Form
          </a>
        )}
      </div>
      <div className="topic-comments-wrapper relative before:bg-gray-300">
        <div className="topic relative bg-cream">
          <div className="absolute">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={topic?.author.image || unknown}
              alt="author-profile-picture"
            />
          </div>
          <div className="post border-[1px] border-solid border-sorta-black rounded-lg ml-14 relative after:bg-cream before:bg-sorta-black">
            <div className="px-4 py-2 border-b-sorta-black border-solid border-b-[1px]">
              <span className="font-bold">{topic?.author.username}</span> &nbsp;
              <span className="text-gray-400 text-sm">
                posted on {formatDate(topic?.date_posted)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-5 p-4">
              <Carousel images={topic?.images} />
              <span>{parse(decode(topic?.content))}</span>
            </div>
          </div>
        </div>
        {/* SECTION - comments */}
        <div className="relative my-7 flex flex-col gap-7">
          {cError && cIsLoading ? (
            <Spinner />
          ) : (
            comments?.data.map((comment, index) => (
              <div key={index} className="relative bg-cream">
                <img
                  className="w-10 h-10 rounded-full object-cover absolute"
                  src={comment.author.image || unknown}
                  alt="commentor-profile-picture"
                />
                <div className="post border-[1px] border-solid border-gray-200 rounded-lg ml-14 relative after:bg-cream before:bg-gray-200">
                  <div className="px-4 py-2 border-b-gray-200 border-solid border-b-[1px]">
                    <span className="font-bold">{comment.author.username}</span>{" "}
                    &nbsp;
                    <span className="text-gray-400 text-sm">
                      posted on {formatDate(comment.date)}
                    </span>
                  </div>
                  <div className="p-4">
                    <span>{parse(decode(comment.content))}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* SECTION - user comment */}
        {user && (
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full object-cover absolute"
              src={user?.image || unknown}
              alt="me-profile-picture"
            />
            <div className="ml-14">
              <CommentForm user={user} topic={topic} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetailPage;
