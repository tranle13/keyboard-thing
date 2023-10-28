import { loginImg } from "@/assets";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import * as authServices from "@/queries/services/authService";
import { useToast } from "@/shadcn-ui/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { BaseSyntheticEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
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
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({ resolver: zodResolver(LoginSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async (data: LoginInterface, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    try {
      await authServices.login(data);
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
        buttonStyle="bg-[#b0ccc7]/40"
        buttonIconStyle="group-hover:translate-x-[225%]"
        handler={handleSubmit(submitForm)}
      >
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

export default LoginPage;
