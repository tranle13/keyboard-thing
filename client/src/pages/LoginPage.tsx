import { loginImg } from "@/assets";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import * as authServices from "@/queries/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { BaseSyntheticEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { z } from "zod";

export interface LoginInterface extends FieldValues {
  username: string;
  password: string;
}

const LoginSchema = z.object({
  username: z.string().trim().min(3, "Username is required"),
  password: z.string().trim().min(8, "Password is required"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({ resolver: zodResolver(LoginSchema) });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submitForm = async (data: LoginInterface, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    try {
      setError("");
      await authServices.login(data);
      window.location.href = "/";
    } catch (e) {
      const error = e as AxiosError;
      setError(error.response?.data as string);
    }
  };

  return (
    <div className="flex flex-1 relative max-md:justify-center max-md:items-center">
      <div
        className="md:w-1/2 max-md:absolute max-md:w-full max-md:h-full max-md:blur-[2px]"
        style={{
          background: `url(${loginImg})`,
          minHeight: "calc(100vh - 76px)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <Form
        header={<h3 className="text-2xl font-bold">Welcome back!</h3>}
        buttonLabel="Log in"
        secondaryButtonLabel="Sign up"
        secondaryText="Don't have an account?"
        route="/register"
        buttonIconStyle="group-hover:translate-x-[225%]"
        handler={handleSubmit(submitForm)}
      >
        {error && (
          <div className="alert alert-error">
            <AiOutlineCloseCircle />
            <span>{error}</span>
          </div>
        )}
        <Input<LoginInterface>
          register={register}
          errors={errors}
          placeholder="Username"
          name="username"
        />
        <Input<LoginInterface>
          register={register}
          errors={errors}
          placeholder="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          inputChildren={
            <span
              className="cursor-pointer absolute top-[calc(50%-8px)] right-[18px] text-base-content"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          }
        />
      </Form>
    </div>
  );
};

export default LoginPage;
