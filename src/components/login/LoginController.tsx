import { useState } from "react";
import axios from "axios";

export const useLoginController = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (callback?: (success: boolean) => void) => async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.post(`${VITE_API_URL}/login`, {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        callback?.(true);
      } else {
        setError("Invalid credentials");
        callback?.(false);
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
      callback?.(false);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, handleSubmit, loading, error };
};