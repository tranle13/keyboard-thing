import { FormState } from "@/shared/interfaces";
import { ChangeEvent, ReactNode, SyntheticEvent } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/ui/input/input";
import styles from "./form.module.css";

interface Props {
  header: ReactNode;
  buttonText: string;
  secondaryText: string;
  secondaryButtonText: string;
  fields: string[];
  form: FormState;
  errors?: FormState | null;
  imageUrl: string;
  navigateRoute: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
}

const Form = ({
  header,
  buttonText,
  secondaryText,
  secondaryButtonText,
  fields,
  form,
  errors,
  imageUrl,
  navigateRoute,
  handleChange,
  handleFocus,
  handleSubmit,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div
        className="w-1/2"
        style={{
          background: `url(${imageUrl})`,
          minHeight: "calc(100vh - 76px)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="w-1/2 flex justify-center items-center">
        <form
          className="flex flex-col gap-7 w-2/3 max-w-[500px] relative"
          onSubmit={(e) => handleSubmit(e)}
        >
          {header}
          <Input
            value={form.username}
            error={errors?.username}
            placeholder="Username"
            id="username"
            handleChange={handleChange}
            handleFocus={handleFocus}
          />
          {fields.includes("email") && (
            <Input
              value={form.email || ""}
              error={errors?.email}
              placeholder="Email"
              id="email"
              handleChange={handleChange}
              handleFocus={handleFocus}
            />
          )}
          <Input
            value={form.password}
            error={errors?.password}
            placeholder="Password"
            id="password"
            handleChange={handleChange}
            handleFocus={handleFocus}
            type="password"
            style={{ paddingRight: "46px" }}
          />
          <button
            className={`${styles["account-button"]} bg-[#b0ccc7]/40 flex items-center gap-3 px-2 py-2 w-fit rounded-full mx-auto relative`}
            type="submit"
          >
            <span className={`${styles["swipe-right"]} text-2xl absolute`}>
              <BsArrowRightCircleFill />
            </span>
            <span className={`${styles["button-text"]} ml-8 mr-1`}>
              {buttonText}
            </span>
          </button>

          <div className="h-[1px] bg-gray-100" />

          <div className="flex gap-3 text-sm justify-center">
            <span className="text-gray-300">{secondaryText}</span>
            <button
              className="hover:underline"
              type="button"
              onClick={() => navigate(navigateRoute)}
            >
              {secondaryButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
