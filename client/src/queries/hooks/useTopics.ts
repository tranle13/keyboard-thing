import { Topics } from "@/entities/Topics";
import httpService from "@/queries/services/httpService";
import { useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  pageSize?: number;
}

const useTopics = ({ page, pageSize = 5 }: Props) =>
  useQuery({
    queryKey: ["topics", page],
    queryFn: () =>
      httpService
        .get<Topics>("/api/topics/", { params: { page, pageSize } })
        .then((res) => res.data),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useTopics;
