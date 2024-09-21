import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const SignupPage = () => {
  const { signup } = useContext(AuthContext);
  const [userType, setUserType] = useState("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mentor-specific fields
  const [experience, setExperience] = useState(null);
  const [contact, setContact] = useState("");
  const [fees, setFees] = useState("");
  const [company, setCompany] = useState("");

  const [errors, setErrors] = useState({}); // State for storing validation errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match!" });
      return;
    }

    const userData = {
      fullName,
      email,
      password,
      confirmPassword,
      userType,
      ...(userType === "mentor" && { experience, contact, fees, company }), // Only include these fields for mentors
    };

    try {
      await signup(userData);
      navigate("/"); // Redirect on successful signup
    } catch (errorResponse) {
      const errorData = errorResponse.error || [];
      const newErrors = errorData.reduce((acc, error) => {
        acc[error.path[0]] = error.message; // Map errors to respective fields
        return acc;
      }, {});
      setErrors(newErrors); // Set errors in state
    }
  };

  return (
    <div className="page-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>

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

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        {/* Conditionally render mentor-specific fields */}
        {userType === "mentor" && (
          <>
            <div className="form-group">
              <input
                type="number"
                placeholder="Experience (years)"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))} // Convert to number
                required
              />
              {errors.experience && (
                <span className="error-message">{errors.experience}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              {errors.contact && (
                <span className="error-message">{errors.contact}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
              {errors.fees && (
                <span className="error-message">{errors.fees}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
              {errors.company && (
                <span className="error-message">{errors.company}</span>
              )}
            </div>
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>
      <span className="toggle-link" onClick={() => navigate("/login")}>
        Already have an account? Login
      </span>
    </div>
  );
};

export default SignupPage;
