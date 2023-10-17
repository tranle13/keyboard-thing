import { trendIcs } from "@/constants";
import { IC, columns } from "../components/Columns";
import Intro from "../components/Intro";
import DataTable from "../shared/ui/data-table";

const Home = () => {
  const data = trendIcs as IC[];

  return (
    <div className="px-10 pb-5">
      <Intro />

      <h3 className="text-4xl font-bold mb-5">Trending Projects</h3>
      <DataTable
        data={data}
        columns={columns}
        clickHandler={(row) => console.log(row)}
      />
    </div>
  );
};

export default Home;