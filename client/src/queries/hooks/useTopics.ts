import { Topics } from "@/entities/Topics";
import httpService from "@/queries/services/httpService";
import { useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  limit?: number;
  status?: "IC" | "GB" | "Closed" | "";
}

const useTopics = ({ page, limit = 5, status = "" }: Props) =>
  useQuery({
    queryKey: ["topics", page, status],
    queryFn: () =>
      httpService
        .get<Topics>("/api/topics/", { params: { page, limit, status } })
        .then((res) => res.data),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useTopics;
