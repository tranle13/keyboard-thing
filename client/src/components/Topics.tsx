import { unknown } from "@/assets";

const Topics = () => {
  const data = [
    {
      title: "GMK Nightlife",
      status: "IC",
      cover_image:
        "https://media.biipmk.com/gmk_nightlife/GMK_Nightlife-Banner.png?v=2",
      author: {
        image:
          "https://geekhack.org/index.php?action=dlattach;attach=194661;type=avatar",
        name: "biip",
      },
      categories: ["Keycap"],
    },
    {
      title: "Protagonist",
      status: "IC",
      cover_image:
        "https://i.shgcdn.com/a0ce1708-c39c-4176-88ce-b51c79b2169d/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      author: {
        image:
          "https://geekhack.org/index.php?action=dlattach;attach=302914;type=avatar",
        name: "OnTheBrink",
      },
      categories: ["Keyboard"],
    },
    {
      title: "Paragon - A 75% Gasket Mount with a Rotary Encoder",
      status: "GB",
      cover_image:
        "https://geekhack.org/index.php?action=dlattach;topic=115873.0;attach=280756;image",
      author: {
        image: "",
        name: "rOOdy",
      },
      categories: ["Keyboard"],
    },
    {
      title: "cw80/60 by cruel world",
      status: "GB",
      cover_image: "https://i.imgur.com/iN1mDBe.jpg",
      author: {
        image:
          "https://geekhack.org/index.php?action=dlattach;attach=275810;type=avatar",
        name: "cruelworld",
      },
      categories: ["Keyboard"],
    },
    {
      title: "Paragon - A 75% Gasket Mount with a Rotary Encoder",
      status: "GB",
      cover_image:
        "https://geekhack.org/index.php?action=dlattach;topic=115873.0;attach=280756;image",
      author: {
        image: "",
        name: "rOOdy",
      },
      categories: ["Keyboard"],
    },
  ];
  return (
    <div className="flex flex-wrap justify-between gap-y-10">
      {data.map((d, i) => (
        <div className="card max-md:w-40 w-1/6 shadow-xl" key={i}>
          <figure>
            <img
              className="h-[110px] object-cover w-full"
              src={d.cover_image}
              alt="cover-image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title items-start">
              <span className="line-clamp-2">{d.title}</span>
              <div
                className={`badge mt-1 ${
                  d.status === "IC" ? "badge-secondary" : "badge-accent"
                }`}
              >
                {d.status}
              </div>
            </h2>
            <div className="flex gap-2 items-center text-sm text-gray-400">
              <div className="avatar">
                <div className="w-6 mask mask-hexagon">
                  <img src={d.author.image || unknown} />
                </div>
              </div>
              <p>{d.author.name}</p>
            </div>
            <div className="card-actions justify-end">
              {d.categories.map((c) => (
                <div className="badge badge-outline" key={c}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Topics;
