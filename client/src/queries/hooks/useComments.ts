import { useQuery } from "@tanstack/react-query";
import { Comments } from "../../entities/Comments";
import httpService from "../services/httpService";

interface Props {
  topicId: string;
  page: number;
  pageSize?: number;
}

const useComments = ({ topicId, page = 1, pageSize = 20 }: Props) => {
  return useQuery({
    queryKey: ["comments", page],
    queryFn: () =>
      httpService
        .get<Comments>("/api/comments/", {
          params: {
            topicId,
            page,
            pageSize,
          },
        })
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60 * 60 * 1_000, //1h
  });
};

export default useComments;
