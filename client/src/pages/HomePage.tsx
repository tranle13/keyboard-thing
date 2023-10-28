import Pagination from "@/components/Pagination";
import Topics from "@/components/Topics";
import useTopics from "@/queries/hooks/useTopics";
import { useState } from "react";
import Intro from "../components/Intro";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: topics,
    error,
    isLoading,
  } = useTopics({
    page: currentPage,
    pageSize: 20,
  });

  if (error || !topics) return null;

  return (
    <div className="px-10 pb-5 flex-1">
      <Intro />

      <h3 className="text-4xl font-bold mb-5">Trending Projects</h3>
      {isLoading ? (
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
      ) : (
        <>
          <Topics topics={topics.data} />
          <Pagination
            totalPages={topics.total}
            currentPage={currentPage}
            onPageChange={(newPage: number) => setCurrentPage(newPage)}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
