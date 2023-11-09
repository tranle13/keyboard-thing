import useComments from "@/queries/hooks/useComments";
import state from "@/store";
import { useState } from "react";
import { useSnapshot } from "valtio";
import Pagination from "../Pagination";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

interface Props {
  topicId?: string;
}

const Comments = ({ topicId = "" }: Props) => {
  const snap = useSnapshot(state);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: comments,
    error,
    isLoading,
  } = useComments({ topicId, page: currentPage, pageSize: 10 });

  if (error || !comments || !comments.data.length) return;

  return (
    <div className="relative flex flex-col gap-7">
      {error && isLoading ? (
        <span className="loading loading-infinity loading-lg text-secondary" />
      ) : (
        <>
          {comments.data.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
          <Pagination
            totalPages={comments.total}
            currentPage={currentPage}
            onPageChange={(newPage: number) => setCurrentPage(newPage)}
          />
          {snap.user && (
            <div>
              <CommentForm topicId={topicId} totalPages={comments.total} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
