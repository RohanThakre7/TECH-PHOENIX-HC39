import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // State for storing validation errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      await login(email, password);
      navigate("/");
    } catch (errorResponse) {
      const errorData = errorResponse.error || [];
      const newErrors = errorData.reduce((acc, error) => {
        acc[error.path[0]] = error.message; // Map errors to their respective fields
        return acc;
      }, {});
      setErrors(newErrors); // Set the errors in state
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
      <span className="toggle-link" onClick={() => navigate("/signup")}>
        New here? Sign Up
      </span>
    </div>
  );
};

export default LoginPage;
