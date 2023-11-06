import { Topic } from "@/entities/Topic";
import httpService from "@/queries/services/httpService";
import { FaEllipsis } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  topic: Topic;
}

const TopicActions = ({ topic }: Props) => {
  const navigate = useNavigate();
  const deleteTopic = async () => {
    try {
      const promise = httpService.delete(`/api/topics/${topic._id}`);

      await toast.promise(
        promise,
        {
          pending: "Deleting topic...",
          success: "Topic deleted successfully!",
          error: "Uh oh, something went wrong. Please try again.",
        },
        {
          className: "bg-base-300 text-base-content font-[inherit] rounded-2xl",
          progress: undefined,
        }
      );
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
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
              <button className="btn btn-outline">Cancel</button>
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
