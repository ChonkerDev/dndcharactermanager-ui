import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthProvider"
import { apiEndpoints } from '../../apiConfig';
import { z } from 'zod';

const LoginSchema = z.object({
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

export const useLoginController = () => {
  const [email, setEmail] = useState("");
  const [password, setPasswordState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const setPassword = (value: string) => {
    if (error) {
      setError(null);
    }
    setPasswordState(value);
  };
  const handleSubmit = (callback?: (success: boolean) => void) => async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const validationResult = LoginSchema.safeParse({ password });

    if (!validationResult.success) {
      setError(validationResult.error.issues[0].message);
      callback?.(false);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(apiEndpoints.login, {
        email,
        password,
      });
      if (response.data.success) {
        login(response.data.user, response.data.token)
        callback?.(true);
      } else {
        setError(response.data.message);
        callback?.(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const apiErrorMessage = err.response.data.message;
          setError(apiErrorMessage || "Invalid credentials or server error.");
        } else {
          setError("Network error. Please try again later.");
        }
      } else {
        console.error("An unexpected error occurred:", err);
        setError("An unexpected error occurred.");
      }
      callback?.(false);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, handleSubmit, loading, error };
};