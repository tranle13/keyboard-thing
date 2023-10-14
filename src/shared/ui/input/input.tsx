import { CSSProperties, ChangeEvent, useState } from "react";
import { FiEye } from "react-icons/fi";
import "./input.css";

interface Props {
  value: string;
  error?: string;
  placeholder?: string;
  id: string;
  type?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  style?: CSSProperties;
}

const Input = ({
  value,
  error,
  placeholder,
  id,
  type = "text",
  handleChange,
  handleFocus,
  style,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = type === "password";

  return (
    <div className="relative">
      <input
        type={isPasswordInput && showPassword ? "text" : type}
        placeholder={placeholder}
        className={`account-input w-full ${error ? "error" : ""}`}
        id={id}
        name={id}
        onChange={(e) => handleChange(e)}
        onFocus={() => handleFocus()}
        value={value}
        style={style}
      />
      {type === "password" && (
        <span
          className="cursor-pointer absolute top-1/3 right-[18px]"
          onClick={() => setShowPassword(!showPassword)}
        >
          <FiEye />
        </span>
      )}
      <p
        className={`error absolute top-10 text-xs text-[#c83f21] w-full px-[18px] py-1 ${
          error ? "show" : "hide"
        }`}
      >
        {error}
      </p>
    </div>
  );
};

export default Input;
