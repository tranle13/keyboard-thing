import NewTopic from "@/components/NewTopic";
import AuthContext from "@/context/authContext";
import { RequestTopic } from "@/entities/Topic";
import { TopicImage } from "@/entities/TopicImage";
import { addTopic } from "@/queries/services/topicService";
import { encode } from "html-entities";
import { FormEvent, createRef, useContext, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

const TopicCreatePage = () => {
  const { user } = useContext(AuthContext);
  const ref = createRef<TinyMCEEditor>();
  const [title, setTitle] = useState("");
  const [icLink, setIcLink] = useState("");
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (ref.current?.getContent()) {
        const params: RequestTopic = {
          title,
          images,
          ic_link: icLink,
          categories: [{ name: "Keycap", color: "tag-keycap" }],
          content: encode(ref.current.getContent()),
          status: "IC",
          author: user?.username || "",
        };
        const topic = await addTopic(params);
        window.location.href = `/topic/${topic._id}`;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NewTopic />
    // <EditorForm
    //   ref={ref}
    //   height={500}
    //   header="New Topic"
    //   extraClass="px-10 pb-5"
    //   handleSubmit={handleSubmit}
    //   handleReset={() => ref.current?.resetContent()}
    // >
    //   <Input
    //     className="border-0 bg-cream/40"
    //     type="text"
    //     placeholder="Topic title"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //   />

    //   <div className="flex gap-3 flex-col my-5">
    //     {images.map((image, index) => {
    //       return (
    //         <div className="flex gap-3 items-center" key={index}>
    //           <Popover>
    //             <PopoverTrigger>
    //               {image.url ? (
    //                 <div className="rounded-xl overflow-hidden w-10 h-10">
    //                   <img src={image.url} alt={`image-${index}`} />
    //                 </div>
    //               ) : (
    //                 <div className="border-dotted border-2 border-sorta-black text-xl p-2 rounded-xl w-10 h-10">
    //                   <HiOutlineCamera />
    //                 </div>
    //               )}
    //             </PopoverTrigger>
    //             <PopoverContent>
    //               <div className="grid grid-cols-3 items-center gap-4">
    //                 <label htmlFor="image-url">Image URL</label>
    //                 <Input
    //                   id="image-url"
    //                   className="col-span-2 h-8"
    //                   value={image.url}
    //                   onChange={(e) =>
    //                     handleChange(index, "url", e.target.value)
    //                   }
    //                 />
    //               </div>
    //             </PopoverContent>
    //           </Popover>

    //           <Input
    //             className="border-0 bg-cream/40"
    //             type="text"
    //             placeholder="Image caption (optional)"
    //             value={image.caption || ""}
    //             onChange={(e) => handleChange(index, "caption", e.target.value)}
    //           />
    //           {index === 0 ? (
    //             <span
    //               className="cursor-pointer text-sorta-black text-xl"
    //               onClick={handleAddImage}
    //             >
    //               <HiOutlinePlus />
    //             </span>
    //           ) : (
    //             <span
    //               className="cursor-pointer text-sorta-black text-xl"
    //               onClick={() => handleRemoveImage(index)}
    //             >
    //               <HiOutlineTrash />
    //             </span>
    //           )}
    //         </div>
    //       );
    //     })}
    //   </div>

    //   <Input
    //     className="border-0 bg-cream/40"
    //     type="text"
    //     placeholder="IC link (optional)"
    //     onChange={(e) => setIcLink(e.target.value)}
    //   />
    // </EditorForm>
  );
};

export default TopicCreatePage;
