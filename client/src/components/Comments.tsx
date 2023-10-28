import { unknown } from "@/assets";
import useComments from "@/queries/hooks/useComments";
import { formatDate } from "@/utils";
import { decode } from "html-entities";
import parse from "html-react-parser";
import { useState } from "react";

interface Props {
  topicId?: string;
}

const Comments = ({ topicId = "" }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: comments,
    error,
    isLoading,
  } = useComments({ topicId, page: currentPage });

  if (error || !comments || !comments.data.length) return;

  const paginate = (direction: "prev" | "next") => {
    switch (direction) {
      case "prev":
        if (currentPage - 1 < 0) setCurrentPage(currentPage - 1);
        else setCurrentPage(1);
        break;
      default:
        if (currentPage + 1 < comments.total) setCurrentPage(currentPage + 1);
        else setCurrentPage(comments.total);
        break;
    }
  };

  return (
    <div className="relative flex flex-col gap-7">
      {error && isLoading ? (
        <span className="loading loading-infinity loading-lg text-secondary" />
      ) : (
        <>
          {comments.data.map((comment, index) => (
            <div className="card w-full bg-base-200 gap-5 p-6" key={index}>
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
                <div className="flex flex-col">
                  <span className="text-base-content font-bold">
                    {comment.author.username}
                  </span>
                  <span className="text-neutral-content text-xs">
                    posted on {formatDate(comment.date)}
                  </span>
                </div>
              </div>
              <span className="text-base-content">
                {parse(decode(comment.content))}
              </span>
            </div>
          ))}
          <div className="join justify-center">
            <button className="join-item btn" onClick={() => paginate("prev")}>
              «
            </button>
            <button className="join-item btn">{currentPage}</button>
            <button className="join-item btn" onClick={() => paginate("next")}>
              »
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
