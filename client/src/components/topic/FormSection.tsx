import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  label: string;
}

const FormSection = ({ children, label }: Props) => {
  return (
    <div className="grid grid-cols-[150px_auto]">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
    </div>
  );
};

export default FormSection;
