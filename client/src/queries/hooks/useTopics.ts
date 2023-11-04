import { Topics } from "@/entities/Topics";
import httpService from "@/queries/services/httpService";
import { useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  limit?: number;
  status?: "IC" | "GB" | "Closed" | "";
  username?: string;
}

const useTopics = ({ page, limit = 10, status = "" }: Props) => {
  const key = status ? "topics" : `topics-${status.toLowerCase()}`;
  return useQuery({
    queryKey: [key, page, status],
    queryFn: () =>
      httpService
        .get<Topics>("/api/topics/", { params: { page, limit, status } })
        .then((res) => res.data),
    staleTime: 60 * 60 * 1_000, //1h
  });
};

const useUserTopics = ({ page, limit = 10, username = "" }: Props) =>
  useQuery({
    queryKey: ["user-topics", page, username],
    queryFn: () =>
      httpService
        .get<Topics>(`/api/users/${username}/topics/`, {
          params: {
            page,
            limit,
          },
        })
        .then((res) => res.data),
    staleTime: 60 * 60 * 1_000, //1h
  });

export { useTopics, useUserTopics };
