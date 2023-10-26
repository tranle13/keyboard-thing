import { loading } from "@/assets";
import { columns } from "@/components/Columns";
import DataTable from "@/components/DataTable";
import useTopics from "@/hooks/useTopics";
import Intro from "../components/Intro";

const HomePage = () => {
  const { data, error, isLoading } = useTopics();

  if (error) return null;

  return (
    <div className="px-10 pb-5">
      <Intro />

      <h3 className="text-4xl font-bold mb-5">Trending Projects</h3>
      {isLoading ? (
        <img src={loading} alt="loading" />
      ) : (
        <DataTable
          data={data || []}
          columns={columns}
          clickHandler={(row) => (window.location.href = `/topic/${row._id}`)}
        />
      )}
    </div>
  );
};

export default HomePage;
