import { RequestTopic, Topic } from "@/entities/Topic";
import httpService from "./httpService";

export function addTopic(params: RequestTopic) {
  return httpService
    .post<Topic>("/api/topics/", { ...params })
    .then((res) => res.data);
}

export function updateTopic(params: RequestTopic, id: string) {
  return httpService
    .put<Topic>(`/api/topics/${id}`, { ...params })
    .then((res) => res.data);
}
