import { motion } from "framer-motion";
import { useLoginController } from "./LoginController";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { useAuth } from '../AuthProvider';

function Login() {
  const { email, setEmail, password, setPassword, handleSubmit, error, loading } = useLoginController();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <motion.form
        onSubmit={handleSubmit((success) => {
          if (success) {
            navigate('/');
          }
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
          required
          minLength={8}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Password must be at least 8 characters and include a number, a lowercase, and an uppercase letter."
        />
        {error && <div className="login-error">{error}</div>}
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