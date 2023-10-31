import { ReactNode } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { IoWarningOutline } from "react-icons/io5";
import styled from "styled-components";

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
      <input
        type={type}
        placeholder="Username"
        className={`input w-full ${error ? "input-error" : "input-secondary"}`}
        {...register(name)}
        {...rest}
      />
      {children}
      <Alert
        className={`alert alert-warning p-2 text-xs mt-3 gap-2 ${
          error ? "error" : ""
        }`}
      >
        <IoWarningOutline className="stroke-current shrink-0" />
        <span>{error}</span>
      </Alert>
    </div>
  );
};

// SECTION - styled-components
const Alert = styled.div`
  height: 0;
  padding: 0;
  border-width: 0;
  transition: all 0.5s ease-in-out;
  &,
  & * {
    visibility: collapse;
  }
  &.error {
    border-width: 1px;
    height: 35px;
    padding: 0.5rem;
    visibility: visible;
    & * {
      visibility: visible;
    }
  }
`;
