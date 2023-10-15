import Carousel from "@/components/Carousel";
import { post } from "@/constants";
import { Badge } from "@/shadcn-ui/components/ui/badge";
import { buttonVariants } from "@/shadcn-ui/components/ui/button";
import { Post } from "@/shared/interfaces";

const Detail = () => {
  const data = post as Post;

  return (
    <div className="w-full px-10 pb-5">
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
      <div className="post-wrapper relative before:bg-gray-300">
        <div className="author-post relative bg-cream">
          <div className="absolute">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={data.author_pfp}
              alt="author-profile-picture"
            />
          </div>
          <div className="post border-[1px] border-solid border-gray-200 rounded-lg ml-14 relative after:bg-cream before:bg-gray-200">
            <div className="px-4 py-2 border-b-gray-200 border-solid border-b-[1px]">
              <span className="font-bold">{data.author}</span> &nbsp;
              <span className="text-gray-400 text-sm">
                posted on {data.date}
              </span>
            </div>
            <div className="flex flex-col items-center gap-5 p-4">
              <Carousel images={data.images} />
              <p>{data.description}</p>
            </div>
          </div>
        </div>
        {data.comments.map((comment, index) => (
          <div key={index} className="relative mt-7 bg-cream">
            <div className="absolute">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={comment.author_pfp}
                alt="commentor-profile-picture"
              />
            </div>
            <div className="post border-[1px] border-solid border-gray-200 rounded-lg ml-14 relative after:bg-cream before:bg-gray-200">
              <div className="px-4 py-2 border-b-gray-200 border-solid border-b-[1px]">
                <span className="font-bold">{comment.author}</span> &nbsp;
                <span className="text-gray-400 text-sm">
                  posted on {comment.date}
                </span>
              </div>
              <div className="p-4">
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
