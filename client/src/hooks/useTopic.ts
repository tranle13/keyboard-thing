import { Topic } from "@/entities/Topic";
import httpService from "@/services/httpService";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const useTopic = (id: string) =>
  useQuery({
    queryKey: ["topic"],
    queryFn: () =>
      httpService.get<Topic>(`/api/topics/${id}`).then((res) => {
        const { data } = res;
        return {
          ...data,
          date_posted: format(new Date(data.date_posted), "MMM dd, yyyy"),
        };
      }),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useTopic;
