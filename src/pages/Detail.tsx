import Carousel from "@/components/Carousel";
import { post } from "@/constants";
import { Badge } from "@/shadcn-ui/components/ui/badge";
import { buttonVariants } from "@/shadcn-ui/components/ui/button";

interface Post {
  title: string;
  status: "IC" | "GB";
  tags: Tag[];
  ic_link: string;
  author: string;
  author_pfp: string;
  date: string;
  description: string;
  images: PostImage[];
  comments: Comment[];
}

interface Tag {
  name: string;
  color: string;
}

interface PostImage {
  img: string;
  caption?: string;
}

interface Comment {
  author: string;
  author_pfp: string;
  content: string;
  date: string;
}

const Detail = () => {
  const imgs = [
    "https://amherststudent.com/content/images/size/w1200/2022/10/GHIBLI.jpg",
    "https://cdn.britannica.com/86/212186-050-EC39872A/My-Neighbor-Totoro-Hayao-Miyazaki-Studio-Ghibli-movie-still-1988.jpg",
    "https://cdn.mos.cms.futurecdn.net/D6PhGgGfSEGHnNG92wzFBQ-1200-80.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTQ5ODk1NDg2NF5BMl5BanBnXkFtZTcwMTM5OTEyNw@@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTk2MzI0ODc1N15BMl5BanBnXkFtZTcwMTI5OTEyNw@@._V1_.jpg",
    "https://i.ytimg.com/vi/vqFry4BkhsU/maxresdefault.jpg",
  ];
  const data = post as Post;

  return (
    <div className="w-full">
      <div className="title-and-tags flex my-5 gap-3">
        <Badge className={`h-min mt-1 status-${data.status.toLowerCase()}`}>
          {data.status}
        </Badge>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">{data.title}</h2>

          <div className="flex gap-2 text-gray-400 items-center">
            {data.tags.map((tag, index) => (
              <Badge
                key={index}
                className="text-gray-400 bg-cream border-gray-400 border-2"
              >
                {tag.name}
              </Badge>
            ))}
            <span className="text-xs">• project opened on {data.date}</span>
          </div>
        </div>
        <a
          className={`${buttonVariants()} ml-auto my-auto`}
          href={data.ic_link}
        >
          IC Form
        </a>
      </div>
      <div className="author-post relative">
        <div className="absolute">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={data.author_pfp}
            alt="author-profile-picture"
          />
        </div>
        <div className="post border-[1px] border-solid border-gray-200 rounded-lg ml-14 relative after:bg-cream before:bg-gray-200">
          <div className="px-5 py-2 border-b-gray-200 border-solid border-b-[1px]">
            <span className="font-bold">{data.author}</span> &nbsp;
            <span className="text-gray-400 text-sm">posted on {data.date}</span>
          </div>
          <div className="flex flex-col items-center gap-5 p-5">
            <Carousel images={imgs} />
            <p>{data.description}</p>
          </div>
        </div>
      </div>
      {data.comments.map((comment, index) => (
        <div key={index} className="relative mt-5">
          <div className="absolute">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={comment.author_pfp}
              alt="commentor-profile-picture"
            />
          </div>
          <div className="post border-[1px] border-solid border-gray-200 rounded-lg ml-14 relative after:bg-cream before:bg-gray-200">
            <div className="px-5 py-2 border-b-gray-200 border-solid border-b-[1px]">
              <span className="font-bold">{comment.author}</span> &nbsp;
              <span className="text-gray-400 text-sm">
                posted on {comment.date}
              </span>
            </div>
            <div className="p-5">
              <p>{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Detail;
