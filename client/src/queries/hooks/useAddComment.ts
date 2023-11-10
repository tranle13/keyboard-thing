import { Comment } from "@/entities/Comment";
import { Comments } from "@/entities/Comments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "../services/httpService";

interface AddCommentContext {
  previousComments: Comments | undefined;
}

const useAddComment = (lastPage: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["comments", lastPage];

  return useMutation<Comment, Error, Comment, AddCommentContext>({
    mutationFn: (comment) =>
      httpService
        .post<Comment>("/api/comments/new", {
          ...comment,
        })
        .then((res) => res.data),
    onMutate: (newComment) => {
      const previousComments = queryClient.getQueryData<Comments>(queryKey);
      if (previousComments) {
        queryClient.setQueryData(queryKey, (data: Comments) => ({
          ...data,
          comments: [...data.comments, newComment],
        }));
        return { previousComments };
      }
    },
    onSuccess: (savedComment, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, (data: Comments) => ({
          ...data,
          comments: data.comments.map((d) =>
            d === newComment ? savedComment : d
          ),
        }));
      }
    },
    onError: (error, newComment, context) => {
      if (!context) return;
      queryClient.setQueryData(queryKey, context.previousComments);
    },
  });
};

export default useAddComment;
