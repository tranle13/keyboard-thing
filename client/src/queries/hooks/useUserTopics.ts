import { Topic } from "@/entities/Topic";
import { User } from "@/entities/User";
import httpService from "@/queries/services/httpService";
import { useQuery } from "@tanstack/react-query";

// interface Props {
//   page: number;
//   pageSize?: number;
//   status?: "IC" | "GB" | "Closed" | "";
// }

const useUserTopics = (user: User | null) =>
  useQuery({
    queryKey: ["topics"],
    queryFn: () =>
      httpService
        .get<Topic[]>(`/api/users/${user?.username}/topics/`)
        .then((res) => res.data),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useUserTopics;
