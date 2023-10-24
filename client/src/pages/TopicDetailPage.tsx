import { loading, unknown } from "@/assets";
import Carousel from "@/components/Carousel";
import EditorForm from "@/components/EditorForm";
import useAddComment from "@/hooks/useAddComment";
import useComments from "@/hooks/useComments";
import useTopic from "@/hooks/useTopic";
import authService from "@/services/authService";
import { Badge } from "@/shadcn-ui/components/ui/badge";
import { buttonVariants } from "@/shadcn-ui/components/ui/button";
import { formatDate } from "@/utils";
import { decode, encode } from "html-entities";
import parse from "html-react-parser";
import { FormEvent, createRef } from "react";
import { useParams } from "react-router-dom";
import { Editor as TinyMCEEditor } from "tinymce";

const TopicDetailPage = () => {
  const { id } = useParams();
  const ref = createRef<TinyMCEEditor | null>();
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
  const addComment = useAddComment();

  if (tError || !topic) return null;
  if (tIsLoading) return <img src={loading} alt="loading" className="w-10" />;

  // TODO: separate this into its own service file and handle error accordingly
  const uploadComment = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (ref.current?.getContent() && user) {
        addComment.mutate({
          author: {
            username: user.username,
            image: user.image,
          },
          topic: topic._id,
          content: encode(ref.current?.getContent()),
        });
      }

      // await httpService.post("/api/comments/new", {
      //   topicId: topic?._id,
      //   username: user?.username,
      //   image: user?.image,
      //   content: encode(ref.current?.getContent()),
      // });

      // window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

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
        {cError || cIsLoading ? (
          <img src={loading} alt="loading" />
        ) : (
          comments?.data.map((comment, index) => (
            <div key={index} className="relative mt-7 bg-cream">
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
        {user && (
          <div className="relative mt-7">
            <img
              className="w-10 h-10 rounded-full object-cover absolute"
              src={user?.image || unknown}
              alt="me-profile-picture"
            />
            <div className="ml-14">
              <EditorForm
                editorRef={ref}
                height={150}
                handleSubmit={(e) => uploadComment(e)}
                handleReset={(e) => {
                  e.preventDefault();
                  ref.current?.resetContent();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetailPage;
