import { useState, type FormEvent } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, SubmitButton } from "../../../common";
import { apiRegister } from "../../../../services/api/authApi";

export default function RegisterForm(): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const registerStatus: boolean = await apiRegister(inputs);
      if (!registerStatus) {
        setError("try different email or password");
        setIsSubmitting(false);
        return;
      }
      navigate("/login");
      setInputs({ email: "", password: "" });
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError ? error.response?.data.message : "Unknown error";

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-8">
          Register to Warehouse
        </h2>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-200 w-full">
          <Form onSubmit={registerHandler}>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={inputs.email}
              onChange={(event) => setInputs({ ...inputs, email: event.target.value })}
              label="Email"
            />

            <Input
              id="password"
              type="password"
              placeholder="Create your password"
              value={inputs.password}
              onChange={(event) => setInputs({ ...inputs, password: event.target.value })}
              label="Password"
            />
            <SubmitButton
              buttonText="Register"
              isLoading={isSubmitting}
              loadingText="Creating account..."
            />
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
}
