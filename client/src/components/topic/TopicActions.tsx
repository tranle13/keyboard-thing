import { Topic } from "@/entities/Topic";
import httpService from "@/queries/services/httpService";
import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  topic: Topic;
}

const TopicActions = ({ topic }: Props) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteTopic = async () => {
    setIsDeleting(true);
    try {
      await httpService.delete(`/api/topics/${topic._id}`);
      toast.success("Topic deleted successfully!", {
        className: "bg-base-300 text-base-content font-[inherit] rounded-2xl",
        progress: undefined,
      });
      setIsDeleting(false);
      navigate("/", { replace: true });
    } catch (e) {
      toast.error("Something unexpected happened, please try again.", {
        className: "bg-base-300 text-base-content font-[inherit] rounded-2xl",
        progress: undefined,
      });
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex={0} className="btn m-1 bg-base-300 text-lg border-none">
          <FaEllipsis />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24"
        >
          <li>
            <a href={`/topic/${topic._id}/edit`}>Edit</a>
          </li>
          <li>
            <a
              onClick={() =>
                document.getElementById("deletion_modal")?.showModal()
              }
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
      <dialog id="deletion_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <p className="py-4">
            You would no longer be able to view or edit this topic.
          </p>
          <div className="modal-action gap-5">
            <form method="dialog">
              <button className="btn btn-outline" disabled={isDeleting}>
                Cancel
              </button>
              <button
                className="btn btn-error ml-5"
                onClick={() => {
                  deleteTopic();
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

export default TopicActions;
