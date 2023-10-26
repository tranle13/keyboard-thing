import { ReactNode } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import styled, { keyframes } from "styled-components";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  errors?: Partial<DeepMap<T, FieldError>>;
  register: UseFormRegister<T>;
  className?: string;
  type?: string;
  placeholder?: string;
  children?: ReactNode;
}

export const Input = <T extends Record<string, unknown>>({
  name,
  errors,
  register,
  type = "text",
  children,
  ...rest
}: InputProps<T>) => {
  const error = errors ? errors[name]?.message : "";

  return (
    <div className="relative">
      <AccountInput
        className={`w-full ${error ? "error" : ""}`}
        type={type}
        {...register(name)}
        {...rest}
      />
      {children}
      <p className="absolute top-10 text-xs text-[#c83f21] w-full px-[18px] py-1">
        {error}
      </p>
    </div>
  );
};

// SECTION - styled-components
const errorShake = keyframes`
  0%, 100% { transform: translateX(0); }
  25%, 75% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
`;
const AccountInput = styled.input`
  padding: 7px 18px;
  border: 2px solid rgba(211, 211, 211, 0.3);
  border-radius: 100px;
  outline: none;

  &:focus {
    border: double 2px transparent;
    background-image: #df8936; /* fallback for older browsers */
    background-image: -webkit-linear-gradient(white, white),
      -webkit-linear-gradient(to right, #698097, #b0ccc7, #df8936); /* Chrome 10-25, Safari 5.1-6 */
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #698097, #b0ccc7, #df8936); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+*/
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  &.error {
    animation: ${errorShake} 0.25s ease-in-out;
    border-color: #c83f21;
  }
`;
