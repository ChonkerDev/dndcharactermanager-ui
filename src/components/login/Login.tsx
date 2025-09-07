import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLoginController } from "./LoginController";
import "./Login.css";

const Login: React.FC = () => {
  const { email, setEmail, password, setPassword, handleSubmit } = useLoginController();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="login-container">
      <motion.form
        onSubmit={handleSubmit((success) => {
          if (success) alert("Login successful!");
        })}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="login-form"
      >
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="login-button"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Login;