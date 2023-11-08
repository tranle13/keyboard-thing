import AddCategories from "@/components/topic/AddCategories";
import AddImage from "@/components/topic/AddImage";
import ContentEditor from "@/components/topic/ContentEditor";
import FormSection from "@/components/topic/FormSection";
import AuthContext from "@/context/authContext";
import { Category } from "@/entities/Category";
import { Status } from "@/entities/Status";
import { RequestTopic } from "@/entities/Topic";
import { TopicImage } from "@/entities/TopicImage";
import useTopic from "@/queries/hooks/useTopic";
import { addTopic, updateTopic } from "@/queries/services/topicService";
import { encode } from "html-entities";
import { FormEvent, createRef, useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Editor as TinyMCEEditor } from "tinymce";
import AddStatus from "../components/topic/AddStatus";

interface State {
  title: string;
  coverImage: string;
  error: string;
}

const TopicEditPage = () => {
  const { id: topicId } = useParams();
  const isEdit = !!topicId;
  // SECTION = Context
  const { user } = useContext(AuthContext);

  // SECTION = Refs
  const editorRef = createRef<TinyMCEEditor>();
  const categoryRef = createRef<Category[]>();
  const statusRef = createRef<Status>();
  const imagesRef = createRef<TopicImage[]>();

  // SECTION = States
  const [topic, setTopic] = useState<State>({
    title: "",
    coverImage: "",
    error: "",
  });
  const [isPosting, setIsPosting] = useState(false);

  const {
    data,
    error: topicError,
    isLoading,
  } = useTopic(topicId || "", (data) =>
    setTopic({ ...topic, title: data.title, coverImage: data.cover_image })
  );

  // SECTION = Functions
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsPosting(true);

    if (!topic.title || !editorRef.current?.getContent()) {
      setTopic({ ...topic, error: "Title and content are required" });
      window.scrollTo(0, 0);
      setIsPosting(false);
      return;
    }

    try {
      setTopic({ ...topic, error: "" });
      if (
        editorRef.current?.getContent() &&
        categoryRef.current &&
        statusRef.current &&
        imagesRef.current
      ) {
        const params: RequestTopic = {
          title: topic.title,
          cover_image: topic.coverImage,
          status: statusRef.current.status || "IC",
          ic_link: statusRef.current.icLink || "",
          categories: categoryRef.current
            .filter((c) => c.checked)
            .map((c) => c.name),
          images: imagesRef.current.filter((i) => i.url),
          content: encode(editorRef.current.getContent()),
          author: user?.username || "",
        };
        let newTopic;
        if (isEdit) newTopic = await updateTopic(params, topicId || "");
        else newTopic = await addTopic(params);
        console.log(topicId);
        window.location.href = `/topic/${newTopic._id}`;
      }
    } catch (error) {
      const temp = error as Error;
      setTopic({ ...topic, error: temp.message });
      window.scrollTo(0, 0);
    } finally {
      setIsPosting(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-infinity text-primary" />
        <span className="loading loading-infinity text-secondary" />
        <span className="loading loading-infinity text-accent" />
        <span className="loading loading-infinity text-neutral" />
        <span className="loading loading-infinity text-info" />
        <span className="loading loading-infinity text-success" />
        <span className="loading loading-infinity text-warning" />
        <span className="loading loading-infinity text-error" />
      </div>
    );

  // SECTION = Return
  return (
    <form className="flex flex-col gap-5 p-10" onSubmit={onSubmit}>
      {(topic.error || topicError) && (
        <div className="alert alert-error">
          <AiOutlineCloseCircle />
          <span>{topic.error || topicError?.message}</span>
        </div>
      )}

      <h2 className="text-2xl font-bold">
        {isEdit ? "Edit Topic" : "New Topic"}
      </h2>
      <FormSection label="Title*">
        <input
          type="text"
          placeholder="i.e. your new keyboard/keycap/switch name"
          className="input input-primary input-sm"
          value={topic?.title}
          onChange={(e) => setTopic({ ...topic, title: e.target.value })}
        />
      </FormSection>
      <FormSection label="Cover Image">
        <input
          type="text"
          placeholder="Cover image url"
          className="input input-primary input-sm"
          value={topic?.coverImage}
          onChange={(e) => setTopic({ ...topic, coverImage: e.target.value })}
        />
      </FormSection>
      <FormSection label="Status">
        <AddStatus isEdit={isEdit} ref={statusRef} topic={data} />
      </FormSection>
      <FormSection label="Categories">
        <AddCategories ref={categoryRef} topic={data} />
      </FormSection>
      <FormSection label="Images">
        <AddImage ref={imagesRef} topic={data} />
      </FormSection>
      <FormSection label="Content*">
        <ContentEditor ref={editorRef} initialContent={data?.content} />
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
              <>{isEdit ? "Updating" : "Posting"}</>
            </>
          ) : (
            <>{isEdit ? "Update" : "Post"}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default TopicEditPage;
