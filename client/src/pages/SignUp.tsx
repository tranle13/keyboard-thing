import { signup } from "@/assets";
import { Input } from "@/components/atoms/Input";
import { Form } from "@/components/molecules/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BaseSyntheticEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface SignupInterface extends FieldValues {
  username: string;
  email: string;
  password: string;
}

const SignupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .regex(
      /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,28}[a-zA-Z0-9]$/,
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

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInterface>({ resolver: zodResolver(SignupSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (data: FieldValues, e?: BaseSyntheticEvent) => {
    // TODO - handle registering data with BE, handle BE errors, go to home if no BE errors
    e?.preventDefault();
    try {
      await axios.post("/api/users/signup", data);
      navigate("/test");
    } catch (e) {
      // TODO: use Toast/Alert component from shadcn
      console.log(e);
    }
  };

  return (
    <div className="flex">
      <div
        className="w-1/2"
        style={{
          background: `url(${signup})`,
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
            <FiEye />
          </span>
        </Input>
      </Form>
    </div>
  );
};

export default Signup;
