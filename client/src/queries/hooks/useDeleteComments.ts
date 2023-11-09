import { Comment } from "@/entities/Comment";
import { Comments } from "@/entities/Comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "../services/httpService";

interface DeleteCommentContext {
  previousComments: Comments | undefined;
}

const useDeleteComment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Comment, Error, Comment, DeleteCommentContext>({
    mutationFn: () => httpService.delete(`/api/comments/${id}`),
    onMutate: () => {
      const previousComments = queryClient.getQueryData<Comments>(["comments"]);
      queryClient.setQueryData(["comments"], (comments: Comments) =>
        comments.data.filter((c) => c._id !== id)
      );
      return { previousComments };
    },
    onError: (error, deleteComment, context) => {
      if (!context) return;
      queryClient.setQueryData(["comments"], context.previousComments);
    },
  });
};

export default useDeleteComment;
