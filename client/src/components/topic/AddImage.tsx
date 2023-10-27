import { noImage } from "@/assets";
import { TopicImage } from "@/entities/TopicImage";
import { ChangeEvent, MouseEvent } from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface Props {
  images: TopicImage[];
  addImage: (e: MouseEvent<HTMLButtonElement>) => void;
  removeImage: (e: MouseEvent<HTMLSpanElement>, index: number) => void;
  setImage: (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    key: keyof TopicImage
  ) => void;
}

const AddImage = ({ images, addImage, removeImage, setImage }: Props) => {
  return (
    <div className="form-control gap-3">
      <button className="btn btn-sm btn-block text-primary" onClick={addImage}>
        +
      </button>
      <div className="form-control gap-3">
        {images.map((im, i) => (
          <div className="flex gap-3 items-center" key={i}>
            <div className="avatar">
              <div className="w-10 mask mask-squircle">
                <img src={im.url || noImage} alt="image-url" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Image url"
              className="input input-primary input-sm w-full max-w-xs"
              value={im.url}
              onChange={(e) => setImage(e, i, "url")}
            />
            <input
              type="text"
              placeholder="Image caption i.e. renders"
              className="input input-primary input-sm w-full max-w-xs"
              value={im.caption}
              onChange={(e) => setImage(e, i, "caption")}
            />
            <span
              className="text-error text-xl cursor-pointer"
              onClick={(e) => removeImage(e, i)}
            >
              <HiOutlineTrash />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddImage;
