import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) ?? true
  );

  const toggleNotifications = () => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(!notifications)
    );
    setNotifications(!notifications);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">

        <h1>⚙️ Settings</h1>

        <div className="section-card">
<h2>Preferences</h2>

<p className="settings-subtitle">
  Manage your ElderEase AI preferences.
</p>

<div className="setting-card">

  <div>
    <h3>👤 Profile</h3>
    <p>Edit your personal information</p>
  </div>

  <button
    className="settings-btn"
    onClick={() => navigate("/profile")}
  >
    Edit Profile
  </button>

</div>

<div className="setting-card">

  <div>
    <h3>🔔 Notifications</h3>
    <p>Manage medicine and appointment reminders</p>
  </div>

  <button
    className="settings-btn"
    onClick={toggleNotifications}
  >
    {notifications
      ? "Notifications ON"
      : "Notifications OFF"}
  </button>

</div>

<div className="logout-container">

  <button
    className="logout-btn"
    onClick={logout}
  >
    🚪 Logout
  </button>

</div>

<p className="version">
  <strong>Version:</strong> 1.0.0
</p>

        </div>

      </div>
    </div>
  );
}

export default Settings;