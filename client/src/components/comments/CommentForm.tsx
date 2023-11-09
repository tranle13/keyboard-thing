import { User } from "@/entities/User";
import useAddComment from "@/queries/hooks/useAddComment";
import state from "@/store";
import { tinymceInit } from "@/utils";
import { Editor } from "@tinymce/tinymce-react";
import { encode } from "html-entities";
import { FormEvent, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Editor as TinyMCEEditor } from "tinymce";
import { useSnapshot } from "valtio";

interface Props {
  topicId: string;
  lastPage: number;
}

const CommentForm = ({ topicId, lastPage }: Props) => {
  // SECTION = Constants
  const editorRef = useRef<TinyMCEEditor>();
  const { mutate, isPending, error } = useAddComment(lastPage);
  const snap = useSnapshot(state);

  // SECTION = Conditional rendering
  if (!snap.user) {
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

    if (editorRef.current?.getContent()) {
      mutate({
        author: { ...(snap.user as User) },
        topic: topicId,
        content: encode(editorRef.current.getContent()),
      });
      editorRef.current.resetContent("");
    }
  };
  const onReset = (e: FormEvent) => {
    e.preventDefault();
    editorRef.current?.resetContent();
  };

  // SECTION = Return
  return (
    <form
      className="card w-full bg-base-100 gap-5"
      onSubmit={onSubmit}
      onReset={onReset}
    >
      <Editor
        apiKey="6u83swqogsxupwyr54zmcbd6cc7gx4jw6uj1g56ui6tte16k"
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        initialValue=""
        init={tinymceInit(150)}
      />
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
