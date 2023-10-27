import { unknown } from "@/assets";
import { Topic } from "@/entities/Topic";

interface Props {
  topics?: Topic[];
}

const Topics = ({ topics }: Props) => {
  if (!topics) return null;

  return (
    <div className="flex flex-wrap justify-between gap-y-10">
      {topics.map((topic, i) => (
        <div className="card max-md:w-40 w-1/6 shadow-xl" key={i}>
          <figure>
            <img
              className="h-[110px] object-cover w-full"
              src={topic.cover_image}
              alt="cover-image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title items-start">
              <span className="line-clamp-2">{topic.title}</span>
              <div
                className={`badge mt-1 ${
                  topic.status === "IC" ? "badge-secondary" : "badge-accent"
                }`}
              >
                {topic.status}
              </div>
            </h2>
            <div className="flex gap-2 items-center text-sm text-gray-400">
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
  );
};

export default Topics;
