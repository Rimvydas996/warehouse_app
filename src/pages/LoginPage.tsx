import React, { useState } from "react";
import Form from "../components/Form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-8">Login to Warehouse</h2>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-200 w-full">
          <Form onSubmit={loginHandler}>
            <div className="space-y-2 w-full">
              <label htmlFor="email" className="block text-sm font-medium text-amber-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                className="
                  w-full px-4 py-3 rounded-lg
                  border-2 border-amber-300 
                  focus:outline-none focus:ring-2 focus:ring-amber-400
                  focus:border-transparent
                  placeholder:text-amber-300
                  transition duration-200
                  text-amber-900
                "
              />
            </div>

            <div className="space-y-2 w-full">
              <label htmlFor="password" className="block text-sm font-medium text-amber-900">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                className="
                  w-full px-4 py-3 rounded-lg
                  border-2 border-amber-300
                  focus:outline-none focus:ring-2 focus:ring-amber-400
                  focus:border-transparent
                  placeholder:text-amber-300
                  transition duration-200
                  text-amber-900
                "
              />
            </div>

            <button
              type="submit"
              className="
                w-full py-2 px-4
                bg-gradient-to-r from-amber-400 to-amber-500
                hover:from-amber-500 hover:to-amber-600
                text-white font-semibold
                rounded-lg shadow-md
                hover:shadow-lg
                transition duration-200
                focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
              "
            >
              Login
            </button>
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
