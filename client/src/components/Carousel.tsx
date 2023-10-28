import { TopicImage } from "@/entities/TopicImage";
import { wrap } from "@popmotion/popcorn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

interface Props {
  images?: TopicImage[];
}

const Carousel = ({ images }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);

  if (!images?.length) return null;

  const imageIndex = wrap(0, images.length, page);
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };
  const swipeConfidenceThreshold = 1000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  const pagination = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="bg-primary-content w-[80%] aspect-video relative flex justify-center items-center rounded-xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex].url}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) pagination(1);
              else if (swipe > swipeConfidenceThreshold) pagination(-1);
            }}
          />
        </AnimatePresence>
        <div
          className="absolute cursor-pointer z-[2] text-[30px] rounded-full w-min left-3 text-base-content bg-secondary select-none top-[calc(50%-12px)]"
          onClick={() => pagination(-1)}
        >
          <IoMdArrowDropleftCircle />
        </div>
        <div
          className="absolute cursor-pointer z-[2] text-[30px] rounded-full w-min right-3 text-base-content bg-secondary select-none top-[calc(50%-12px)]"
          onClick={() => pagination(1)}
        >
          <IoMdArrowDroprightCircle />
        </div>
      </div>
      <p className="text-sm text-neutral text-center mt-3">
        {images[imageIndex].caption}&nbsp;
      </p>
    </>
  );
};

export default Carousel;
