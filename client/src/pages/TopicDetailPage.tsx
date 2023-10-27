import { loading, unknown } from "@/assets";
import CommentForm from "@/components/CommentForm";
import Comments from "@/components/Comments";
import Topic from "@/components/Topic";
import TopicHeader from "@/components/TopicHeader";
import AuthContext from "@/context/authContext";
import useTopic from "@/queries/hooks/useTopic";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const TopicDetailPage = () => {
  const { id: topicId } = useParams();
  const { user } = useContext(AuthContext);
  const { data: topic, error, isLoading } = useTopic(topicId || "");

  if (error || !topic) return null;
  if (isLoading) return <img src={loading} alt="loading" className="w-10" />;

  return (
    <div className="w-full px-10 pb-5">
      <TopicHeader topic={topic} />
      <div className="topic-comments-wrapper relative before:bg-gray-300">
        <Topic topic={topic} />
        <Comments topicId={topicId} />
        {user && (
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full object-cover absolute"
              src={user.image || unknown}
              alt="me-profile-picture"
            />
            <div className="ml-14">
              <CommentForm user={user} topic={topic} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetailPage;
