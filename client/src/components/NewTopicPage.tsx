import { createRef, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
import AddImage from "./topic/AddImage";
import ContentEditor from "./topic/ContentEditor";
import FormSection from "./topic/FormSection";

const NewTopic = () => {
  const statuses = ["IC", "GB"];

  const ref = createRef<TinyMCEEditor>();

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categories, setCategories] = useState([
    { name: "Keyboard", checked: false },
    { name: "Keycap", checked: false },
    { name: "Switch", checked: false },
    { name: "PCB", checked: false },
    { name: "Badge", checked: false },
    { name: "Other", checked: false },
  ]);
  const [status, setStatus] = useState("IC");
  const [icLink, setIcLink] = useState("");

  return (
    <form className="flex flex-col gap-5 p-10" action="">
      <h2 className="text-2xl font-bold">New Topic</h2>
      <FormSection label="Title">
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
        <div className="flex gap-3">
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn btn-sm w-20">
              {status}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {statuses.map((s) => (
                <li key={s}>
                  <a onClick={() => setStatus(s)}>{s}</a>
                </li>
              ))}
            </ul>
          </div>
          {status === "IC" && (
            <input
              type="text"
              placeholder="IC link"
              className="input input-primary input-sm"
              value={icLink}
              onChange={(e) => setIcLink(e.target.value)}
            />
          )}
        </div>
      </FormSection>
      <FormSection label="Categories">
        <div className="grid grid-cols-2">
          {categories.map((c, i) => (
            <label
              className="label cursor-pointer justify-normal gap-3"
              key={i}
            >
              <input
                type="checkbox"
                checked={c.checked}
                className="checkbox checkbox-sm checkbox-primary"
                onChange={() =>
                  setCategories(
                    categories.map((cat) => {
                      if (cat === c) cat.checked = !cat.checked;
                      return cat;
                    })
                  )
                }
              />
              <span className="label-text">{c.name}</span>
            </label>
          ))}
        </div>
      </FormSection>
      <FormSection label="Images">
        <AddImage />
      </FormSection>
      <FormSection label="Content">
        <ContentEditor ref={ref} />
      </FormSection>
      <div className="flex justify-end">
        <button className="btn btn-sm btn-outline btn-accent mr-10">
          Discard
        </button>
        <button className="btn btn-sm btn-accent">Submit</button>
      </div>
    </form>
  );
};

export default NewTopic;
