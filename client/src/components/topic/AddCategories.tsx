import { categories as catCons } from "@/constants";
import { Category } from "@/entities/Category";
import { Topic } from "@/entities/Topic";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface Props {
  topic?: Topic;
}

const AddCategories = forwardRef<Category[], Props>((props, ref) => {
  const categoryRef = useRef<Category[]>();
  const [categories, setCategories] = useState<Category[]>(
    catCons.map((cat) => {
      return {
        name: cat,
        checked: false,
      };
    })
  );

  useImperativeHandle(ref, () => {
    categoryRef.current = categories;
    return categoryRef.current as Category[];
  });

  useEffect(() => {
    if (props.topic) {
      setCategories(
        categories.map((cat) => ({
          ...cat,
          checked: props.topic?.categories.includes(cat.name) || false,
        }))
      );
    }
  }, [props.topic]);

  if (!ref) return null;

  return (
    <div className="grid grid-cols-2">
      {categories.map((c, i) => (
        <label className="label cursor-pointer justify-normal gap-3" key={i}>
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
  );
});

export default AddCategories;
