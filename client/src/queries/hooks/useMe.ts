import { User } from "@/entities/User";
import httpService from "@/queries/services/httpService";
import { useQuery } from "@tanstack/react-query";

const useMe = (id: string, token: string, callback: (user: User) => void) =>
  useQuery({
    queryKey: ["me", token],
    queryFn: () =>
      httpService.get<User>(`/api/users/me`, { params: { id } }).then((res) => {
        callback(res.data);
        return res.data;
      }),
    staleTime: 60 * 60 * 1_000, //1h
  });

export default useMe;
