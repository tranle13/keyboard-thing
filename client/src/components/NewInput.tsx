import { ReactNode } from "react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

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

export const NewInput = <T extends Record<string, unknown>>({
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
        className={`account-input w-full ${error ? "error" : ""}`}
        type={type}
        {...register(name)}
        {...rest}
      />
      {children}
      <p
        className={`error absolute top-10 text-xs text-[#c83f21] w-full px-[18px] py-1`}
      >
        {error}
      </p>
    </div>
  );
};
