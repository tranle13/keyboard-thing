import { Comments } from "@/entities/Comments";
import httpService from "@/queries/services/httpService";
import { useQueryClient } from "@tanstack/react-query";
import { FaEllipsis } from "react-icons/fa6";
import { toast } from "react-toastify";

interface Props {
  commentId: string;
  currentPage: number;
}

const CommentActions = ({ commentId, currentPage }: Props) => {
  const queryClient = useQueryClient();
  const queryKey = ["comments", currentPage];

  const deleteComment = async () => {
    const cachedComments = queryClient.getQueryData<Comments>(queryKey);
    if (cachedComments) {
      queryClient.setQueryData(queryKey, (data: Comments) => ({
        ...data,
        comments: data.comments.filter((c) => c._id !== commentId),
      }));
    }

    try {
      const promise = httpService.delete(`/api/comments/${commentId}`);

      await toast.promise(
        promise,
        {
          pending: "Deleting comment...",
          success: "Comment deleted successfully!",
          error: "Uh oh, something went wrong. Please try again.",
        },
        {
          className: "bg-base-300 text-base-content font-[inherit] rounded-2xl",
          progress: undefined,
        }
      );
    } catch (e) {
      if (cachedComments) queryClient.setQueryData(queryKey, cachedComments);
      console.log(e);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex={0} className="btn m-1 bg-base-200 text-lg border-none">
          <FaEllipsis />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24"
        >
          <li>
            <a
              onClick={() => {
                if (document) {
                  (
                    document.getElementById(commentId) as HTMLFormElement
                  ).showModal();
                }
              }}
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
      <dialog id={commentId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            You would no longer be able to view or edit this comment.
          </p>
          <div className="modal-action gap-5">
            <form method="dialog">
              <button className="btn btn-outline">Cancel</button>
              <button
                className="btn btn-error ml-5"
                onClick={() => {
                  deleteComment();
                }}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CommentActions;
