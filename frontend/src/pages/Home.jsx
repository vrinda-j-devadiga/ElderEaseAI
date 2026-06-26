import "../styles/Home.css";
function Home() {
  return (
    <div className="home">

      <h1>Welcome to ElderEase AI</h1>

      <p>
        Empowering elderly individuals with smart medicine reminders,
        AI assistance, and health management tools.
      </p>

      <button>Get Started</button>

      <div className="features">

        <div className="card">
          <h3>Medicine Reminders</h3>
          <p>Never miss important medications.</p>
        </div>

        <div className="card">
          <h3>AI Assistant</h3>
          <p>Get instant help and guidance.</p>
        </div>

        <div className="card">
          <h3>Health Dashboard</h3>
          <p>Track daily health activities easily.</p>
        </div>

      </div>

      <section className="about">
      <h2>About ElderEase AI</h2>

      <p>
      ElderEase AI is designed to help senior citizens manage their daily
      health activities through medicine reminders, AI-powered assistance,
      and an easy-to-use dashboard.
      </p>
      </section>

    </div>
  );
}

export default Home;