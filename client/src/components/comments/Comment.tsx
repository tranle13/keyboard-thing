import { unknown } from "@/assets";
import { Comment as CommentInterface } from "@/entities/Comment";
import state from "@/store";
import { formatDate } from "@/utils";
import { decode } from "html-entities";
import parse from "html-react-parser";
import { useSnapshot } from "valtio";
import CommentActions from "./CommentActions";

interface Props {
  comment: CommentInterface;
}

const Comment = ({ comment }: Props) => {
  const snap = useSnapshot(state);

  return (
    <div className="card w-full bg-base-200 gap-5 p-6">
      <div className="flex gap-3 items-center">
        <div className="avatar">
          <div className="w-8 h-8 mask mask-hexagon">
            <img
              className=""
              src={comment.author.image || unknown}
              alt="author-profile-picture"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-base-content font-bold">
            {comment.author.username}
          </span>
          <span className="text-neutral-content text-xs">
            posted on {formatDate(comment.date)}
          </span>
        </div>
        {snap.user?.username === comment.author.username && (
          <CommentActions comment={comment} />
        )}
      </div>
      <span className="text-base-content">
        {parse(decode(comment.content))}
      </span>
    </div>
  );
};

export default Comment;
