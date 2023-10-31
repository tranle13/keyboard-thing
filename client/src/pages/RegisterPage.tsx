import { signupImg } from "@/assets";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import * as authServices from "@/queries/services/authService";
import * as userServices from "@/queries/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { BaseSyntheticEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import { z } from "zod";

export interface SignupInterface extends FieldValues {
  username: string;
  email: string;
  password: string;
}

const SignupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .regex(
      /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){1,28}[a-zA-Z0-9]$/,
      "Invalid username"
    ),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, "Password must have 8 or more characters"),
});

const RegisterPage = () => {
  // SECTION = Constants
  const passwordRules = [
    "• Contains only alphanumeric characters.",
    "• Can contain dot (.), underscore (_), and hyphen (-).",
    "• Dot (.), underscore (_), or hyphen (-) must not be the first or last character.",
    "• Dot (.), underscore (_), or hyphen (-) must not appear consecutively.",
    "• The number of characters must be between 3 to 30.",
  ];

  // SECTION = Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInterface>({ resolver: zodResolver(SignupSchema) });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // SECTION = Functions
  const submitForm = async (data: SignupInterface, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    try {
      const res = await userServices.register(data);
      authServices.loginWithJwt(res.headers["x-auth-token"]);
      window.location.href = "/";
    } catch (e) {
      const error = e as AxiosError;
      setError(error.response?.data as string);
    }
  };

  // SECTION = Return
  return (
    <div className="flex">
      <div
        className="w-1/2"
        style={{
          background: `url(${signupImg})`,
          minHeight: "calc(100vh - 76px)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <Form
        header={
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold">Hello!</h3>
            <p className="text-sm text-gray-400/50">
              Join the community and keep up with sweet updates from your
              favorite keyboards
            </p>
          </div>
        }
        buttonLabel="Sign up"
        secondaryButtonLabel="Log in"
        secondaryText="Already have an account?"
        route="/login"
        buttonIconStyle="group-hover:translate-x-[275%]"
        handler={handleSubmit(submitForm)}
      >
        {error && (
          <div className="alert alert-error">
            <AiOutlineCloseCircle />
            <span>{error}</span>
          </div>
        )}
        <div className="flex gap-1">
          <div className="flex-1">
            <Input<SignupInterface>
              register={register}
              errors={errors}
              placeholder="Username"
              name="username"
            />
          </div>
          <div className="dropdown dropdown-hover dropdown-end flex-0">
            <label
              tabIndex={0}
              className="btn btn-circle btn-ghost btn-sm text-info mt-[25%]"
            >
              <FiInfo />
            </label>
            <div
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
            >
              <div className="card-body">
                {passwordRules.map((rule, index) => (
                  <p key={index}>{rule}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Input<SignupInterface>
          register={register}
          errors={errors}
          placeholder="Email"
          type="email"
          name="email"
        />
        <div className="flex gap-1">
          <div className="flex-1">
            <Input<SignupInterface>
              register={register}
              errors={errors}
              placeholder="Password"
              name="password"
              type={showPassword ? "text" : "password"}
            >
              <span
                className="cursor-pointer absolute right-[18px] top-[calc(50%-13px)]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </Input>
          </div>
          <div className="dropdown dropdown-hover dropdown-end flex-0">
            <label
              tabIndex={0}
              className="btn btn-circle btn-ghost btn-sm text-info mt-[25%]"
            >
              <FiInfo />
            </label>
            <div
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
            >
              <div className="card-body">
                <p>Password has minimum of 8 characters</p>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
