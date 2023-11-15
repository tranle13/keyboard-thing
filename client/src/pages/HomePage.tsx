import Topics from "@/components/topic/Topics";
import { useTopics } from "@/queries/hooks/useTopics";
import { useState } from "react";
import Intro from "../components/Intro";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useTopics({
    page: currentPage,
    limit: 20,
  });

  return (
    <div className="px-10 pb-5 flex-1">
      <Intro />

      <h3 className="text-4xl font-bold mb-5">Trending Projects</h3>
      <Topics
        data={data}
        extraClass="max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        isLoading={isLoading}
        error={error}
        setCurrentPage={(nextPage) => setCurrentPage(nextPage)}
      />
    </div>
  );
};

export default HomePage;
