import { Comment } from "@/entities/Comment";
import { Comments } from "@/entities/Comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface AddCommentContext {
  previousComments: Comments | undefined;
}

const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, Comment, AddCommentContext>({
    mutationFn: (comment) =>
      axios
        .post<Comment>("/api/comments/new", {
          ...comment,
        })
        .then((res) => res.data),
    onMutate: (newComment) => {
      const previousComments = queryClient.getQueryData<Comments>(["comments"]);
      queryClient.setQueryData(["comments"], (comments: Comments) => ({
        ...comments,
        data: [...comments.data, newComment],
      }));
      return { previousComments };
    },
    onSuccess: (savedComment, newComment) => {
      queryClient.setQueryData(["comments"], (comments: Comments) => ({
        ...comments,
        data: comments.data.map((d) => (d === newComment ? savedComment : d)),
      }));
    },
    onError: (error, newComment, context) => {
      if (!context) return;
      queryClient.setQueryData(["comments"], context.previousComments);
    },
  });
};

export default useAddComment;
