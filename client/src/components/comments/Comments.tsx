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
  const { data, error, isLoading } = useComments({
    topicId,
    page: currentPage,
    limit: 10,
  });

  if (error) return;

  return (
    <div className="relative flex flex-col gap-7">
      {isLoading ? (
        <span className="loading loading-infinity loading-lg text-secondary" />
      ) : (
        <>
          {data?.comments &&
            data.comments.map((comment, index) => (
              <Comment
                comment={comment}
                key={index}
                currentPage={currentPage}
              />
            ))}
          <Pagination
            totalPages={data?.total || 0}
            currentPage={currentPage}
            onPageChange={(newPage: number) => setCurrentPage(newPage)}
          />
          {snap.user && (
            <CommentForm topicId={topicId} lastPage={data?.total || 0} />
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
