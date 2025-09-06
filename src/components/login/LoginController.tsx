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

    try {
      const response = await axios.post("https://your-dotnet-service.com/api/login", {
        email,
        password,
      });

      // Assuming your service returns { success: true, token: "..." }
      if (response.data.success) {
        // You can store token in localStorage if needed
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