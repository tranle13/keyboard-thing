import { User } from "@/entities/User";
import httpService from "@/queries/services/httpService";
import { useQuery } from "@tanstack/react-query";

const useProfile = (username: string) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      httpService.get<User>(`/api/users/${username}`).then((res) => res.data),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useProfile;
