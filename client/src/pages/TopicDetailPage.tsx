import { loading } from "@/assets";
import Comments from "@/components/comments/Comments";
import Topic from "@/components/Topic";
import TopicHeader from "@/components/TopicHeader";
import useTopic from "@/queries/hooks/useTopic";
import { useParams } from "react-router-dom";

const TopicDetailPage = () => {
  const { id: topicId } = useParams();
  const { data: topic, error, isLoading } = useTopic(topicId || "");

  if (error || !topic) return null;
  if (isLoading) return <img src={loading} alt="loading" className="w-10" />;

  return (
    <div className="w-full px-10 pb-5">
      <TopicHeader topic={topic} />
      <div className="topic-comments-wrapper relative before:bg-neutral flex flex-col gap-7">
        <Topic topic={topic} />
        <Comments topicId={topicId} />
      </div>
    </div>
  );
};

export default TopicDetailPage;
