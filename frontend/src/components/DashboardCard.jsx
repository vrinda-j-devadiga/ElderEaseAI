import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="sidebar">
        <h3>ElderEase</h3>

        <ul>
          <li>Dashboard</li>
          <li>Medicines</li>
          <li>AI Assistant</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className="dashboard-content">
        <h1>Welcome Back!</h1>

        <div className="dashboard-cards">

          <DashboardCard
            title="Medicine Reminders"
            description="View upcoming medicines."
          />

          <DashboardCard
            title="AI Assistant"
            description="Ask health-related questions."
          />

          <DashboardCard
            title="Health Summary"
            description="Track daily health activities."
          />

        </div>
      </div>

    </div>
  );
}

export default Dashboard;