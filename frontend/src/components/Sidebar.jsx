import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPills,
  FaCalendarAlt,
  FaRobot,
  FaCog,
  FaUser,
  FaChartBar,
  FaFileAlt,
  FaHeartbeat,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import "../styles/Dashboard.css";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
  <div
    className="sidebar-toggle"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <FaTimes /> : <FaBars />}
  </div>

  <div className={`sidebar ${menuOpen ? "active" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <FaHeartbeat className="sidebar-logo-icon" />
          <span>ElderEase AI</span>
        </div>

        <p>Your Health Companion</p>
      </div>

      <hr className="sidebar-divider" />

      <ul>
        <li>
          <NavLink to="/dashboard" end aria-label="Dashboard">
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/medicines" aria-label="Medicines">
            <FaPills />
            <span>Medicines</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/appointments" aria-label="Appointments">
            <FaCalendarAlt />
            <span>Appointments</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/ai" aria-label="AI Assistant">
            <FaRobot />
            <span>AI Assistant</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings" aria-label="Settings">
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile" aria-label="Profile">
            <FaUser />
            <span>Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/statistics" aria-label="Statistics">
            <FaChartBar />
            <span>Statistics</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/reports" aria-label="Reports">
            <FaFileAlt />
            <span>Reports</span>
          </NavLink>
        </li>
      </ul>
        </div>
  </>
  );
}

export default Sidebar;