import { Topic } from "@/entities/Topic";
import httpService from "@/queries/services/httpService";
import { useQuery } from "@tanstack/react-query";

const useTopic = (id: string) =>
  useQuery({
    queryKey: ["topic"],
    queryFn: () =>
      httpService.get<Topic>(`/api/topics/${id}`).then((res) => res.data),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useTopic;
