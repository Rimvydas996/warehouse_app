import React, { useState } from "react";
import Form from "../components/Form";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { apiRegister } from "../api/authApi";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputs({ email: "", password: "" });
    try {
      e.preventDefault();
      const registerStatus: boolean = await apiRegister(inputs);
      if (!registerStatus) {
        setError("try different email or password");
      } else navigate("/login");
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
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-8">
          Register to Warehouse
        </h2>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-200 w-full">
          <Form onSubmit={registerHandler}>
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
                placeholder="Create your password"
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
              Register
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

export default RegisterPage;
