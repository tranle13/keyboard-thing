import { signupImg } from "@/assets";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import * as authServices from "@/queries/services/authService";
import * as userServices from "@/queries/services/userService";
import { useToast } from "@/shadcn-ui/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { BaseSyntheticEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
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
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInterface>({ resolver: zodResolver(SignupSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async (data: SignupInterface, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    try {
      const res = await userServices.register(data);
      authServices.loginWithJwt(res.headers["x-auth-token"]);
      window.location.href = "/";
    } catch (e) {
      const error = e as AxiosError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: `${error.response?.data}`,
      });
    }
  };

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
        route="/log-in"
        buttonStyle="bg-[#cea77f]/40"
        buttonIconStyle="group-hover:translate-x-[275%]"
        handler={handleSubmit(submitForm)}
      >
        <Input<SignupInterface>
          register={register}
          errors={errors}
          placeholder="Username"
          name="username"
        />
        <Input<SignupInterface>
          register={register}
          errors={errors}
          placeholder="Email"
          type="email"
          name="email"
        />
        <Input<SignupInterface>
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
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </Input>
      </Form>
    </div>
  );
};

export default RegisterPage;
