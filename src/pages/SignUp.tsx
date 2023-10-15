import { signup } from "@/assets";
import Form from "@/components/form/Form";
import { FormState } from "@/shared/interfaces";
import { ChangeEvent, SyntheticEvent, useState } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
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
      email: "",
      password: "",
    };
    if (!form.username) errs.username = "Invalid username";
    if (!form.email) errs.email = "Invalid email";
    if (!form.password) errs.password = "Invalid password";
    setErrors(errs);
  };

  return (
    <Form
      buttonText="Sign up"
      secondaryButtonText="Log in"
      secondaryText="Already have an account?"
      fields={["username", "email", "password"]}
      imageUrl={signup}
      header={
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold">Hello!</h3>
          <p className="text-sm text-gray-400/50">
            Join the community and keep up with sweet updates from your favorite
            keyboards
          </p>
        </div>
      }
      form={form}
      errors={errors}
      navigateRoute="/log-in"
      handleChange={handleChange}
      handleFocus={handleFocus}
      handleSubmit={handleSubmit}
    />
  );
};

export default SignUp;
