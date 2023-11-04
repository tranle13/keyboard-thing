import { unknown } from "@/assets";
import { badges } from "@/constants";
import { Topics as TopicsType } from "@/entities/Topics";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Pagination from "./Pagination";

interface Props {
  data?: TopicsType;
  extraClass: string;
  isLoading: boolean;
  error: Error | null;
  setCurrentPage: (nextPage: number) => void;
}

const Topics = ({
  data,
  setCurrentPage,
  extraClass,
  isLoading,
  error,
}: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-infinity text-primary" />
        <span className="loading loading-infinity text-secondary" />
        <span className="loading loading-infinity text-accent" />
        <span className="loading loading-infinity text-neutral" />
        <span className="loading loading-infinity text-info" />
        <span className="loading loading-infinity text-success" />
        <span className="loading loading-infinity text-warning" />
        <span className="loading loading-infinity text-error" />
      </div>
    );
  } else {
    if (error || !data)
      return (
        <div className="alert alert-error">
          <AiOutlineCloseCircle />
          <span>
            {error?.message ||
              "Something unexpected happened. Please try again later."}
          </span>
        </div>
      );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className={`grid ${extraClass} gap-5`}>
        {data.topics.map((topic, i) => (
          <div
            className="card w-full shadow-xl cursor-pointer"
            key={i}
            onClick={() => (window.location.href = `/topic/${topic._id}`)}
          >
            <figure>
              <img
                className="h-[110px] object-cover w-full"
                src={topic.cover_image}
                alt="cover-image"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title items-start">
                <span className="line-clamp-2 h-[56px]">{topic.title}</span>
                <div className={`badge mt-1 ${badges[topic.status]}`}>
                  {topic.status}
                </div>
              </h2>
              <div className="flex gap-2 items-center text-sm text-neutral">
                <div className="avatar">
                  <div className="w-6 mask mask-hexagon">
                    <img src={topic.author.image || unknown} />
                  </div>
                </div>
                <p>{topic.author.username}</p>
              </div>
              <div className="card-actions justify-end">
                {topic.categories.map((c) => (
                  <div className="badge badge-outline" key={c}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalPages={data.total}
        currentPage={data.page}
        onPageChange={(newPage: number) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default Topics;
