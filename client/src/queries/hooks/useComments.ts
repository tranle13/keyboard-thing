import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Comments } from "../../entities/Comments";

const useComments = (topicId: string) =>
  useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      axios
        .get<Comments>("/api/comments/", {
          params: {
            topicId,
            page: 1,
            pageSize: 2,
          },
        })
        .then((res) => res.data),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useComments;
