import { Comment } from "@/entities/Comment";
import { Comments } from "@/entities/Comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "../services/httpService";

interface AddCommentContext {
  previousComments: Comments | undefined;
}

const useAddComment = (totalPage: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["comments", totalPage];
  let hasCacheLastPage = false;

  return useMutation<Comment, Error, Comment, AddCommentContext>({
    mutationFn: (comment) =>
      httpService
        .post<Comment>("/api/comments/new", {
          ...comment,
        })
        .then((res) => res.data),
    onMutate: (newComment) => {
      const previousComments = queryClient.getQueryData<Comments>(queryKey);
      hasCacheLastPage = !!previousComments;
      if (previousComments) {
        queryClient.setQueryData(queryKey, (comments: Comments) => ({
          ...comments,
          data: [...comments.data, newComment],
        }));
        return { previousComments };
      }
    },
    onSuccess: (savedComment, newComment) => {
      if (hasCacheLastPage) {
        queryClient.setQueryData(queryKey, (comments: Comments) => ({
          ...comments,
          data: comments.data.map((d) => (d === newComment ? savedComment : d)),
        }));
      }
    },
    onError: (error, newComment, context) => {
      if (!context) return;
      if (hasCacheLastPage)
        queryClient.setQueryData(queryKey, context.previousComments);
    },
  });
};

export default useAddComment;
