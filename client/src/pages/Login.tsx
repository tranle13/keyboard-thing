import { login } from "@/assets";
import { NewForm } from "@/components/NewForm";
import { NewInput } from "@/components/NewInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { z } from "zod";

interface LoginInterface extends FieldValues {
  username: string;
  password: string;
}

const LoginSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({ resolver: zodResolver(LoginSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async (data: FieldValues, e?: BaseSyntheticEvent) => {
    // TODO - handle registering data with BE, handle BE errors, go to home if no BE errors
    e?.preventDefault();
    console.log(data);
  };

  return (
    <div className="flex">
      <div
        className="w-1/2"
        style={{
          background: `url(${login})`,
          minHeight: "calc(100vh - 76px)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <NewForm
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
        route="/log-in"
        handler={handleSubmit(submitForm)}
      >
        <NewInput<LoginInterface>
          register={register}
          errors={errors}
          placeholder="Username"
          name="username"
        />
        <NewInput<LoginInterface>
          register={register}
          errors={errors}
          placeholder="Password"
          name="password"
          type={showPassword ? "text" : "password"}
        >
          <span
            className="cursor-pointer absolute top-1/3 right-[18px]"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FiEye />
          </span>
        </NewInput>
      </NewForm>
    </div>
  );
};

export default Login;
