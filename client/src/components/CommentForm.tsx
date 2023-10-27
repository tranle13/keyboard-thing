import { Topic } from "@/entities/Topic";
import { User } from "@/entities/User";
import useAddComment from "@/queries/hooks/useAddComment";
import { useToast } from "@/shadcn-ui/components/ui/use-toast";
import { encode } from "html-entities";
import { createRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import EditorForm from "./EditorForm";

interface Props {
  user: User;
  topic: Topic;
}

const CommentForm = ({ user, topic }: Props) => {
  const { toast } = useToast();
  const ref = createRef<TinyMCEEditor>();
  const { mutate, isPending, error } = useAddComment();

  if (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description:
        "There was a problem with adding your comment. Please try again later.",
    });
  }

  return (
    <EditorForm
      isUpdating={isPending}
      ref={ref}
      height={150}
      handleSubmit={(e) => {
        e.preventDefault();
        if (ref.current?.getContent()) {
          mutate({
            author: { ...user },
            topic: topic._id,
            content: encode(ref.current.getContent()),
          });
        }
      }}
      handleReset={(e) => {
        e.preventDefault();
        ref.current?.resetContent();
      }}
    />
  );
};

export default CommentForm;
