import { PostImage } from "@/shared/interfaces";
import { wrap } from "@popmotion/popcorn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

interface Props {
  images: PostImage[];
}

const Carousel = ({ images }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);
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
      <div className="carousel-wrapper relative flex justify-center items-center rounded-xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex].img}
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
        <div className="prev" onClick={() => pagination(-1)}>
          <IoMdArrowDropleftCircle />
        </div>
        <div className="next" onClick={() => pagination(1)}>
          <IoMdArrowDroprightCircle />
        </div>
      </div>
      <p className="text-sm text-gray-300 text-center">
        {images[imageIndex].caption}&nbsp;
      </p>
    </>
  );
};

export default Carousel;
