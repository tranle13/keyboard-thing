import { ChangeEvent, SyntheticEvent, useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FiEye } from "react-icons/fi";

interface FormError {
  field: string;
  message: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: check to see if user has entered username AND password & display error accordingly
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
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className={`account-input w-full ${
                errors.password ? "error" : ""
              }`}
              id="username"
              name="username"
              onChange={(e) => handleChange(e)}
              value={form.username}
            />
            <p
              className={`error absolute top-10 text-xs text-[#c83f21] w-full px-[18px] py-1 ${
                errors.username ? "show" : "hide"
              }`}
            >
              {errors.username}
            </p>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "type" : "password"}
              placeholder="Password"
              className={`account-input w-full ${
                errors.password ? "error" : ""
              }`}
              id="password"
              name="password"
              style={{ paddingRight: "46px" }}
              value={form.password}
              onChange={(e) => handleChange(e)}
            />
            <span
              className="cursor-pointer absolute top-1/3 right-[18px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FiEye />
            </span>
            <p
              className={`error absolute top-10 text-xs text-[#c83f21] w-full px-[18px] py-1 ${
                errors.password ? "show" : "hide"
              }`}
            >
              {errors.password}
            </p>
          </div>
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
