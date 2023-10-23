import EditorForm from "@/components/EditorForm";
import { TopicImage } from "@/entities/TopicImage";
import { Input } from "@/shadcn-ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn-ui/components/ui/popover";
import React, { createRef, useState } from "react";
import {
  HiOutlineCamera,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Editor as TinyMCEEditor } from "tinymce";

const TopicCreatePage = () => {
  const ref = createRef<TinyMCEEditor | null>();
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<TopicImage[]>([
    {
      url: "",
      caption: "",
    },
  ]);

  const handleAddImage = () => {
    setImages([...images, { url: "", caption: "" }]);
  };

  const handleRemoveImage = (index: number) => {
    // TODO: check to see if there is another way to implement this later when server is up
    const temp = images
      .slice(0, index)
      .concat(images.slice(index + 1, images.length));
    setImages(temp);
  };

  const handleChange = (
    index: number,
    key: keyof TopicImage,
    value: string
  ) => {
    setImages(
      images.map((image, idx) => {
        if (idx === index) image[key] = value;
        return image;
      })
    );
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Need to save this to BE later
    console.log(ref.current?.getContent());
  };

  return (
    <EditorForm
      editorRef={ref}
      height={500}
      header="New Topic"
      extraClass="px-10 pb-5"
      handleSubmit={handleSubmit}
      handleReset={() => ref.current?.resetContent()}
    >
      <Input
        className="border-0 bg-cream/40"
        type="text"
        placeholder="Topic title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-3 flex-col my-5">
        {images.map((image, index) => {
          return (
            <div className="flex gap-3 items-center" key={index}>
              <Popover>
                <PopoverTrigger>
                  {image.url ? (
                    <div className="rounded-xl overflow-hidden w-10 h-10">
                      <img src={image.url} alt={`image-${index}`} />
                    </div>
                  ) : (
                    <div className="border-dotted border-2 border-sorta-black text-xl p-2 rounded-xl w-10 h-10">
                      <HiOutlineCamera />
                    </div>
                  )}
                </PopoverTrigger>
                <PopoverContent>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="image-url">Image URL</label>
                    <Input
                      id="image-url"
                      className="col-span-2 h-8"
                      value={image.url}
                      onChange={(e) =>
                        handleChange(index, "url", e.target.value)
                      }
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <Input
                className="border-0 bg-cream/40"
                type="text"
                placeholder="Image caption (optional)"
                value={image.caption || ""}
                onChange={(e) => handleChange(index, "caption", e.target.value)}
              />
              {index === 0 ? (
                <span
                  className="cursor-pointer text-sorta-black text-xl"
                  onClick={handleAddImage}
                >
                  <HiOutlinePlus />
                </span>
              ) : (
                <span
                  className="cursor-pointer text-sorta-black text-xl"
                  onClick={() => handleRemoveImage(index)}
                >
                  <HiOutlineTrash />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <Input
        className="border-0 bg-cream/40"
        type="text"
        placeholder="IC link (optional)"
      />
    </EditorForm>
  );
};

export default TopicCreatePage;
