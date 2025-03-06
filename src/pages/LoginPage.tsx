import React, { useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import SubmitButton from "../components/SubmitButton";

const LoginPage = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [inputs, setInputs] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const loginStatus: boolean = await login(inputs);
      if (!loginStatus) {
        setError("Incorrect email or password");
      } else navigate("/");
      setInputs({ email: "", password: "" });
    } catch (error) {
      const errorMassage =
        error instanceof AxiosError ? error.response?.data.message : "Unknown error";

      setError(errorMassage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-8">Login to Warehouse</h2>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-200 w-full">
          <Form onSubmit={loginHandler}>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              label="Email"
            />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              label="Password"
            />
            <SubmitButton buttonText="Login" />
          </Form>

          {error && (
            <div
              className="
              mt-4 p-4 rounded-lg
              bg-red-50 border border-red-200
              text-red-600 text-center text-sm
            "
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
