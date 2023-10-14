import { SyntheticEvent, useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Input from "../shared/ui/input/input";

interface FormError {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormError | null>();

  const handleChange = () => {};
  const handleFocus = () => {};
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex">
      <div className="signup-img w-1/2" />
      <div className="w-1/2 flex justify-center items-center">
        <form
          className="flex flex-col gap-7 w-2/3 max-w-[500px] relative"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold">Hello!</h3>
            <p className="text-sm text-gray-400/50">
              Join the community and keep up with sweet updates from your
              favorite keyboards
            </p>
          </div>
          <Input
            value={form.username}
            error={errors?.username}
            placeholder="Username"
            id="username"
            handleChange={handleChange}
            handleFocus={handleFocus}
          />
          <Input
            value={form.email}
            error={errors?.email}
            placeholder="Email"
            id="email"
            handleChange={handleChange}
            handleFocus={handleFocus}
            type="email"
          />
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
            className="account-button bg-[#caa37a]/40 flex items-center gap-3 px-2 py-2 w-fit rounded-full mx-auto relative"
            type="submit"
          >
            <span className="swipe-right text-2xl absolute">
              <BsArrowRightCircleFill />
            </span>
            <span className="button-text ml-8 mr-1">Sign up</span>
          </button>

          <div className="h-[1px] bg-gray-100" />

          <div className="flex gap-3 text-sm justify-center">
            <span className="text-gray-300">Already have an account?</span>
            <button
              className="hover:underline"
              type="button"
              onClick={() => navigate("/log-in")}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
