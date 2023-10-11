import { trendIcs } from "../constants";

interface trendIc {
  title: string;
  views: number;
  date: string;
  author_pfp: string;
}

const Trends = () => {
  const data = trendIcs as trendIc[];

  return (
    <div>
      <h3 className="text-4xl font-bold">Trending ICs</h3>
      <div className="grid grid-cols-4 grid-rows-none"></div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>AUTHOR</th>
            <th>TITLE</th>
            <th>VIEWS</th>
            <th>DATE POSTED</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ic, index) => (
            <tr key={index} className="bg-red-400 p-5 rounded-lg ">
              <td>
                <img
                  src={ic.author_pfp}
                  alt="profile-picture"
                  className="rounded-full w-7"
                />
              </td>
              <td className="text-center">{ic.title}</td>
              <td className="text-center">{ic.views}</td>
              <td className="text-center">{ic.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trends;
