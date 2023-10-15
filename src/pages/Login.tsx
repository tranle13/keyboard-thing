import { login } from "@/assets";
import Form from "@/components/form/Form";
import { FormState } from "@/shared/interfaces";
import { ChangeEvent, SyntheticEvent, useState } from "react";

const Login = () => {
  // SECTION - States
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormState | null>();

  // SECTION - Handlers
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
    <Form
      buttonText="Log in"
      secondaryButtonText="Sign up"
      secondaryText="Don't have an account?"
      fields={["username", "password"]}
      imageUrl={login}
      header={<h3 className="text-2xl font-bold">Welcome back!</h3>}
      form={form}
      errors={errors}
      navigateRoute="/sign-up"
      handleChange={handleChange}
      handleFocus={handleFocus}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
