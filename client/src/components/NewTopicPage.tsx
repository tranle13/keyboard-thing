import AuthContext from "@/context/authContext";
import { RequestTopic } from "@/entities/Topic";
import { TopicImage } from "@/entities/TopicImage";
import { addTopic } from "@/queries/services/topicService";
import { encode } from "html-entities";
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  createRef,
  useContext,
  useState,
} from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Editor as TinyMCEEditor } from "tinymce";
import AddCategories from "./topic/AddCategories";
import AddImage from "./topic/AddImage";
import AddStatus, { Status } from "./topic/AddStatus";
import ContentEditor from "./topic/ContentEditor";
import FormSection from "./topic/FormSection";

const NewTopic = () => {
  // SECTION = Context
  const { user } = useContext(AuthContext);

  // SECTION = Refs
  const ref = createRef<TinyMCEEditor>();

  // SECTION = States
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<Status>("IC");
  const [icLink, setIcLink] = useState("");
  const [images, setImages] = useState<TopicImage[]>([]);
  const [categories, setCategories] = useState([
    { name: "Keyboard", checked: false },
    { name: "Keycap", checked: false },
    { name: "Switch", checked: false },
    { name: "PCB", checked: false },
    { name: "Badge", checked: false },
    { name: "Other", checked: false },
  ]);
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // SECTION = Functions
  const addImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImages([...images, { url: "", caption: "" }]);
  };
  const removeImage = (e: MouseEvent<HTMLSpanElement>, index: number) => {
    e.preventDefault();
    const temp = images
      .slice(0, index)
      .concat(images.slice(index + 1, images.length));
    setImages(temp);
  };
  const setImage = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    key: keyof TopicImage
  ) => {
    setImages(
      images.map((image, i) => {
        if (i === index) image[key] = e.target.value;
        return image;
      })
    );
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsPosting(true);

    if (!title || !ref.current?.getContent()) {
      setError("Title and content are required");
      window.scrollTo(0, 0);
      setIsPosting(false);
      return;
    }
    try {
      setError("");
      if (ref.current?.getContent()) {
        const params: RequestTopic = {
          title,
          cover_image: coverImage,
          status: "IC",
          ic_link: icLink,
          categories: categories.map((c) => c.name),
          images: images.filter((i) => i.url || i.caption),
          content: encode(ref.current.getContent()),
          author: user?.username || "",
        };
        const topic = await addTopic(params);
        window.location.href = `/topic/${topic._id}`;
      }
    } catch (error) {
      const temp = error as Error;
      setError(temp.message);
      window.scrollTo(0, 0);
    } finally {
      setIsPosting(false);
    }
  };

  // SECTION = Return
  return (
    <form className="flex flex-col gap-5 p-10" onSubmit={onSubmit}>
      {error && (
        <div className="alert alert-error">
          <AiOutlineCloseCircle />
          <span>{error}</span>
        </div>
      )}

      <h2 className="text-2xl font-bold">New Topic</h2>
      <FormSection label="Title*">
        <input
          type="text"
          placeholder="i.e. your new keyboard/keycap/switch name"
          className="input input-primary input-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormSection>
      <FormSection label="Cover Image">
        <input
          type="text"
          placeholder="Cover image url"
          className="input input-primary input-sm"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </FormSection>
      <FormSection label="Status">
        <AddStatus
          status={status}
          setStatus={(s) => setStatus(s)}
          icLink={icLink}
          setIcLink={(l) => setIcLink(l)}
        />
      </FormSection>
      <FormSection label="Categories">
        <AddCategories
          categories={categories}
          setCategories={(c) =>
            setCategories(
              categories.map((cat) => {
                if (cat === c) cat.checked = !cat.checked;
                return cat;
              })
            )
          }
        />
      </FormSection>
      <FormSection label="Images">
        <AddImage
          images={images}
          addImage={addImage}
          removeImage={removeImage}
          setImage={setImage}
        />
      </FormSection>
      <FormSection label="Content*">
        <ContentEditor ref={ref} />
      </FormSection>
      <div className="flex justify-end">
        <button
          disabled={isPosting}
          className="btn btn-sm btn-outline btn-accent mr-5"
          type="reset"
        >
          Discard
        </button>
        <button className="btn btn-sm btn-accent" type="submit">
          {isPosting ? (
            <>
              <span className="loading loading-xs loading-spinner" />
              Posting
            </>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </form>
  );
};

export default NewTopic;
