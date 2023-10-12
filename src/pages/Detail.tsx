import Carousel from "@/components/Carousel";

const Detail = () => {
  const imgs = [
    "https://amherststudent.com/content/images/size/w1200/2022/10/GHIBLI.jpg",
    "https://cdn.britannica.com/86/212186-050-EC39872A/My-Neighbor-Totoro-Hayao-Miyazaki-Studio-Ghibli-movie-still-1988.jpg",
    "https://cdn.mos.cms.futurecdn.net/D6PhGgGfSEGHnNG92wzFBQ-1200-80.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTQ5ODk1NDg2NF5BMl5BanBnXkFtZTcwMTM5OTEyNw@@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTk2MzI0ODc1N15BMl5BanBnXkFtZTcwMTI5OTEyNw@@._V1_.jpg",
    "https://i.ytimg.com/vi/vqFry4BkhsU/maxresdefault.jpg",
  ];

  return (
    <div className="w-full">
      <Carousel images={imgs} />
    </div>
  );
};

export default Detail;
