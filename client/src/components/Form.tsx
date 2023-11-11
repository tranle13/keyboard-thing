import { FC, ReactNode, SyntheticEvent } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface FormProps {
  header: ReactNode;
  buttonLabel: string;
  secondaryButtonLabel: string;
  secondaryText: string;
  handler: (e: SyntheticEvent) => void;
  children: ReactNode;
  route: string;
  buttonIconStyle: string;
}

export const Form: FC<FormProps> = ({
  header,
  buttonLabel,
  secondaryButtonLabel,
  secondaryText,
  children,
  route,
  buttonIconStyle,
  handler,
}) => {
  const navigate = useNavigate();

  return (
    <div className="md:w-1/2 flex justify-center items-center sm:w-2/3 w-[90%] max-md:bg-white z-10 max-md:h-max max-md:py-16 max-md:rounded-2xl">
      <form
        className="flex flex-col gap-7 w-2/3 max-w-[500px] relative"
        onSubmit={handler}
      >
        {header}
        {children}
        <button
          className={`group flex items-center gap-3 px-2 py-2 w-fit rounded-full mx-auto relative bg-secondary text-secondary-content`}
          type="submit"
        >
          <span
            className={`transition-all duration-300 text-2xl absolute ${buttonIconStyle}`}
          >
            <BsArrowRightCircleFill />
          </span>
          <span className="transition-all ml-8 mr-1 group-hover:opacity-0">
            {buttonLabel}
          </span>
        </button>

        <div className="divider after:h-[1px] before:h-[1px]" />

        <div className="flex gap-3 text-sm justify-center max-[320px]:flex-col max-[320px]:gap-1 max-[320px]:items-center">
          <span className="text-neutral-content">{secondaryText}</span>
          <button
            className="hover:underline"
            type="button"
            onClick={() => navigate(route)}
          >
            {secondaryButtonLabel}
          </button>
        </div>
      </form>
    </div>
  );
};
