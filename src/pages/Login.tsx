import { ChangeEvent, SyntheticEvent, useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Input from "../shared/ui/input/input";

interface FormError {
  username: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormError | null>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleFocus = () => {
    setErrors(null);
  };
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errs = {
      username: "",
      password: "",
    };
    if (!form.username) errs.username = "Invalid username";
    if (!form.password) errs.password = "Invalid password";
    setErrors(errs);
  };

  return (
    <div className="flex">
      <div className="login-img w-1/2" />
      <div className="w-1/2 flex justify-center items-center">
        <form
          className="flex flex-col gap-7 w-2/3 max-w-[500px] relative"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3 className="text-2xl font-bold">Welcome back!</h3>
          <Input
            value={form.username}
            error={errors?.username}
            placeholder="Username"
            id="username"
            handleChange={handleChange}
            handleFocus={handleFocus}
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
            className="account-button bg-[#b0ccc7]/40 flex items-center gap-3 px-2 py-2 w-fit rounded-full mx-auto relative"
            type="submit"
          >
            <span className="swipe-right text-2xl absolute">
              <BsArrowRightCircleFill />
            </span>
            <span className="button-text ml-8 mr-1">Log in</span>
          </button>

          <div className="h-[1px] bg-gray-100" />

          <div className="flex gap-3 text-sm justify-center">
            <span className="text-gray-300">Don't have an account?</span>
            <button className="hover:underline">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
