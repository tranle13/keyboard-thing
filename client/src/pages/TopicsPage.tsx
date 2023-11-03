import Topics from "@/components/Topics";
import useTopics from "@/queries/hooks/useTopics";

type Status = "IC" | "GB" | "Closed";
interface Props {
  status: Status;
}

const TopicsPage = ({ status }: Props) => {
  const { data, error, isLoading } = useTopics({
    page: 1,
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
        topics={data?.topics}
        extraClass="grid-cols-[repeat(auto-fit,minmax(320px,1fr))]"
      />
    </div>
  );
};

export default TopicsPage;
