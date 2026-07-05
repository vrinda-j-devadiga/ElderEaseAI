import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/Login.css";
import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {

    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    alert(res.data.message);

    navigate("/dashboard");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  }

};

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Sign in to continue managing your healthcare with ElderEase AI.
        </p>

        <div className="input-group">

          <FaEnvelope className="input-icon" />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="input-group">

          <FaLock className="input-icon" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

        </div>

        <div className="login-options">

          <label>
            <input type="checkbox" />
            Remember Me
          </label>

          <a href="#">Forgot Password?</a>

        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="register-text">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>

    </div>

  );
}

export default Login;