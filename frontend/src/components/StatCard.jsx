import {
  FaPills,
  FaCalendarAlt,
  FaHeartbeat
} from "react-icons/fa";

function StatCard({ icon, title, value }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <div className="stat-line"></div>

      <p>{value}</p>

     

    </div>
  );
}

export default StatCard;