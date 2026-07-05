import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import "../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
 const handleRegister = async () => {

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {

    const res = await API.post("/auth/register", {
      name,
      email,
      password,
    });

    alert(res.data.message);

    navigate("/login");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );

  }

};

  return (
    <div className="register-page">
      <div className="register-card">

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join ElderEase AI to manage medicines, appointments and health effortlessly.
        </p>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
    className="register-btn"
    onClick={handleRegister}
>
    Create Account
</button>

        <p className="login-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;