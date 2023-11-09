import useComments from "@/queries/hooks/useComments";
import { useState } from "react";
import Pagination from "../Pagination";
import Comment from "./Comment";

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
        </>
      )}
    </div>
  );
};

export default Comments;
