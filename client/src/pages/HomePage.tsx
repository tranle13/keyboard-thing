import { loading } from "@/assets";
import Topics from "@/components/Topics";
import useTopics from "@/queries/hooks/useTopics";
import Intro from "../components/Intro";

const HomePage = () => {
  const { data, error, isLoading } = useTopics();

  if (error) return null;

  return (
    <div className="px-10 pb-5 flex-1">
      <Intro />

      <h3 className="text-4xl font-bold mb-5">Trending Projects</h3>
      {isLoading ? (
        <img src={loading} alt="loading" />
      ) : (
        <Topics topics={data} />
      )}
    </div>
  );
};

export default HomePage;
