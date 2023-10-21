import { Topic } from "@/entities/Topic";
import httpService from "@/services/httpService";
import { useQuery } from "@tanstack/react-query";

const useTopics = () =>
  useQuery({
    queryKey: ["topics"],
    queryFn: () =>
      httpService.get<Topic[]>("/api/topics").then((res) => res.data),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useTopics;
