import { unknown } from "@/assets";
import AuthContext from "@/context/authContext";
import { Topic } from "@/entities/Topic";
import useAddComment from "@/queries/hooks/useAddComment";
import { encode } from "html-entities";
import { FormEvent, createRef, useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Editor as TinyMCEEditor } from "tinymce";
import ContentEditor from "../topic/ContentEditor";

interface Props {
  topic: Topic;
}

const CommentForm = ({ topic }: Props) => {
  // SECTION = Constants
  const ref = createRef<TinyMCEEditor>();
  const { mutate, isPending, error } = useAddComment();
  const { user } = useContext(AuthContext);

  // SECTION = Conditional rendering
  if (!user) {
    return null;
  }
  if (error) {
    <div className="alert alert-error">
      <AiOutlineCloseCircle />
      <span>{error.message}</span>
    </div>;
  }

  // SECTION = Functions
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ref.current?.getContent()) {
      mutate({
        author: { ...user },
        topic: topic._id,
        content: encode(ref.current.getContent()),
      });
      ref.current.resetContent();
    }
  };
  const onReset = (e: FormEvent) => {
    e.preventDefault();
    ref.current?.resetContent();
  };

  // SECTION = Return
  return (
    <form
      className="card w-full bg-base-100 gap-5 p-6"
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <div className="flex gap-3 items-center">
        <div className="avatar">
          <div className="w-8 h-8 mask mask-hexagon">
            <img
              className=""
              src={user?.image || unknown}
              alt="author-profile-picture"
            />
          </div>
        </div>
        <span className="text-base-content font-bold">
          {topic.author.username}
        </span>
      </div>
      <ContentEditor height={150} ref={ref} />
      <div className="flex justify-end">
        <button
          className="btn btn-sm btn-outline btn-accent mr-5"
          type="reset"
          disabled={isPending}
        >
          Discard
        </button>
        <button
          className="btn btn-sm btn-accent"
          type="submit"
          disabled={isPending}
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
