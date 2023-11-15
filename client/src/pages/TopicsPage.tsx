import Topics from "@/components/topic/Topics";
import { useTopics } from "@/queries/hooks/useTopics";
import { useState } from "react";

type Status = "IC" | "GB" | "CLOSED";
interface Props {
  status: Status;
}

const TopicsPage = ({ status }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useTopics({
    page: currentPage,
    limit: 20,
    status,
  });

  return (
    <div className="px-10 pb-5 pt-10 flex-1">
      <h3 className="text-4xl font-bold mb-8">
        {status === "IC"
          ? "Interest Check"
          : status === "GB"
          ? "Group Buy"
          : "Closed"}
      </h3>
      <Topics
        data={data}
        setCurrentPage={(nextPage) => setCurrentPage(nextPage)}
        extraClass="max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default TopicsPage;
