import { trendIcs } from "@/constants";
import { IC, columns } from "../components/atoms/Columns";
import DataTable from "../components/molecules/DataTable";
import Intro from "../components/molecules/Intro";

interface Topic {
  title: string;
  images: [];
  ic_link: string;
  date_posted: Date;
  categories: [];
  content: string;
  status: "IC" | "GB" | "Closed";
  views: number;
}

const HomePage = () => {
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

export default HomePage;
