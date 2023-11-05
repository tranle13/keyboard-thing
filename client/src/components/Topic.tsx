import { unknown } from "@/assets";
import { Topic as TopicInterface } from "@/entities/Topic";
import state from "@/store";
import { formatDate } from "@/utils";
import { decode } from "html-entities";
import parse from "html-react-parser";
import { FaEllipsis } from "react-icons/fa6";
import { useSnapshot } from "valtio";
import Carousel from "./Carousel";

interface Props {
  topic: TopicInterface;
}

const Topic = ({ topic }: Props) => {
  const snap = useSnapshot(state);
  return (
    <div>
      {topic && (
        <>
          <div className="card w-full bg-base-300 shadow gap-5 p-6">
            <div className="flex gap-3 items-center">
              <div className="avatar">
                <div className="w-8 h-8 mask mask-hexagon">
                  <img
                    className=""
                    src={topic.author.image || unknown}
                    alt="author-profile-picture"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold">{topic.author.username}</span>
                <span className="text-xs">
                  posted on {formatDate(topic.date_posted)}
                </span>
              </div>
              {snap.user?.username === topic.author.username && (
                <>
                  <div className="dropdown dropdown-hover dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn m-1 bg-base-300 text-lg border-none"
                    >
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
                            document.getElementById("my_modal_1")?.showModal()
                          }
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Are you sure?</h3>
                      <p className="py-4">
                        You would no longer be able to view or edit this topic.
                      </p>
                      <div className="modal-action gap-5">
                        <form method="dialog">
                          <button className="btn btn-outline">Cancel</button>
                        </form>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            // TODO: delete topic, if succeed navigate away to homepage
                            // TODO: while deleting, disable buttons
                            // TODO: if there is an error with deleting, displaying it in this modal
                            // TODO: may as well separate this into its own component (?) so we can reuse it with editing comments
                          }}
                        >
                          <button className="btn btn-error" type="submit">
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </>
              )}
            </div>
            <div className="flex flex-col items-center">
              {!!topic.images.length && (
                <>
                  <Carousel images={topic.images} />
                  <div className="divider" />
                </>
              )}
              <span>{parse(decode(topic.content))}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Topic;
