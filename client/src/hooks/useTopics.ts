import { Topic } from "@/entities/Topic";
import httpService from "@/services/httpService";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const useTopics = () =>
  useQuery({
    queryKey: ["topics"],
    queryFn: () =>
      httpService.get<Topic[]>("/api/topics").then((res) => {
        const { data } = res;
        data.map((d) => {
          d.date_posted = format(new Date(d.date_posted), "MMM dd, yyyy");
          return d;
        });

        return data;
      }),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useTopics;
