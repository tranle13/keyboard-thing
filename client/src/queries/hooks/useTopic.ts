import { Topic } from "@/entities/Topic";
import httpService from "@/queries/services/httpService";
import { useQuery } from "@tanstack/react-query";

const useTopic = (id: string, callback?: (data: Topic) => void) =>
  useQuery({
    queryKey: ["topic"],
    queryFn: () =>
      httpService.get<Topic>(`/api/topics/${id}`).then((res) => {
        if (callback) callback(res.data);
        return res.data;
      }),
    staleTime: 60 * 60 * 1_000, //1h
    enabled: !!id,
  });

export default useTopic;
