import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <div className="sidebar">

<div className="sidebar-header">
  <h2>ElderEase AI</h2>
  <p>Your Health Companion</p>
</div>

      <ul>
  <li>
    <NavLink to="/dashboard">
      🏠 Dashboard
    </NavLink>
  </li>

  <li>
    <NavLink to="/medicines">
      💊 Medicines
    </NavLink>
  </li>

  <li>
    <NavLink to="/appointments">
      📅 Appointments
    </NavLink>
  </li>

  <li>
    <NavLink to="/ai">
      🤖 AI Assistant
    </NavLink>
  </li>

  <li>
    <NavLink to="/settings">
      ⚙️ Settings
    </NavLink>
  </li>
</ul>

    </div>
  );
}

export default Sidebar;