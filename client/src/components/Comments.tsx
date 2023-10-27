import { unknown } from "@/assets";
import useComments from "@/queries/hooks/useComments";
import { formatDate } from "@/utils";
import { decode } from "html-entities";
import parse from "html-react-parser";
import { Spinner } from "./Spinner";

interface Props {
  topicId?: string;
}

const Comments = ({ topicId = "" }: Props) => {
  const { data: comments, error, isLoading } = useComments(topicId);

  if (error || !comments) return;

  return (
    <div className="relative my-7 flex flex-col gap-7">
      {error && isLoading ? (
        <Spinner />
      ) : (
        comments.data.map((comment, index) => (
          <div className="relative bg-cream" key={index}>
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
  );
};

export default Comments;
