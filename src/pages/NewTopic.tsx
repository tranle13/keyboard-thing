import { Button } from "@/shadcn-ui/components/ui/button";
import { Input } from "@/shadcn-ui/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn-ui/components/ui/popover";
import { PostImage } from "@/shared/interfaces";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import {
  HiOutlineCamera,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const NewTopic = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<PostImage[]>([
    {
      url: "",
      caption: "",
    },
  ]);
  const navigate = useNavigate();

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

  const handleChange = (index: number, key: keyof PostImage, value: string) => {
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
    console.log(editorRef.current?.getContent());
  };

  const handleDiscard = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="new-topic flex flex-col px-10 pb-5">
      <h2 className="text-2xl font-bold my-6">New Topic</h2>
      <form
        className="bg-sorta-yellow/50 flex flex-col gap-3 p-5 rounded-xl"
        onSubmit={(e) => handleSubmit(e)}
        onReset={(e) => handleDiscard(e)}
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
                  onChange={(e) =>
                    handleChange(index, "caption", e.target.value)
                  }
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

        <Editor
          apiKey="ugljrczpl64v3yl2yat6m9ke7toakblkuv44j6fwc78ez5f8"
          onInit={(_, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            min_height: 500,
            max_height: 500,
            statusbar: false,
            placeholder: "Topic content",
            icons: "jam",
            plugins:
              "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
            toolbar:
              "undo redo restoredraft | blocks | fontfamily fontsizeinput | bold italic underline strikethrough forecolor backcolor | emoticons image link media preview | alignleft aligncenter alignright alignjustify | bullist numlist | indent outdent",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" className="text-sorta-yellow" type="reset">
            Discard
          </Button>
          <Button
            className="bg-sorta-yellow text-sorta-black hover:bg-sorta-dark-yellow"
            type="submit"
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewTopic;
