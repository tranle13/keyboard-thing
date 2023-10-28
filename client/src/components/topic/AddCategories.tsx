export interface Category {
  name: string;
  checked: boolean;
}

interface Props {
  categories: Category[];
  setCategories: (c: Category) => void;
}

const AddCategories = ({ categories, setCategories }: Props) => {
  return (
    <div className="grid grid-cols-2">
      {categories.map((c, i) => (
        <label className="label cursor-pointer justify-normal gap-3" key={i}>
          <input
            type="checkbox"
            checked={c.checked}
            className="checkbox checkbox-sm checkbox-primary"
            onChange={() => setCategories(c)}
          />
          <span className="label-text">{c.name}</span>
        </label>
      ))}
    </div>
  );
};

export default AddCategories;
