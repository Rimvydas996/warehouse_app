import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
// testavimui
import { apiGetAll } from "../api/api";

const LoginPage = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, getToken } = useAuth();
  useEffect(() => {
    const token = getToken();
    const data = apiGetAll(token);
    console.log("data", data);

    if (token) {
      navigate("/");
    }
  }, []);
  console.log("loginpage");

  const [inputs, setInputs] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const loginStatus: boolean = await login(inputs);
      if (!loginStatus) {
        setError("Incorrect email or password");
      } else navigate("/");
      setInputs({ email: "", password: "" });
      const token = getToken();
      console.log("apiGetAll", apiGetAll(token));
    } catch (error) {
      const errorMassage = error instanceof AxiosError ? error.response?.data.message : "Unknown error";

      setError(errorMassage);
    }
  };

  return (
    <div>
      <Form onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="Email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value as string })}
        />
        <button type="submit">Login</button>
      </Form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
