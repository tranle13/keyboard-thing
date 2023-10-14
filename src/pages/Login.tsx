import React, { useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FiEye } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex">
      <div className="login-img w-1/2" />
      <div className="w-1/2 flex justify-center items-center">
        <form
          className="flex flex-col gap-5 w-2/3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3 className="text-2xl font-bold">Welcome back!</h3>
          <input
            type="text"
            placeholder="Username"
            className="account-input"
            id="username"
          />
          <div className="relative">
            <input
              type={showPassword ? "type" : "password"}
              placeholder="Password"
              className="account-input w-full"
              id="password"
              style={{ paddingRight: "46px" }}
            />
            <span
              className="cursor-pointer absolute top-1/3 right-[18px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FiEye />
            </span>
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
