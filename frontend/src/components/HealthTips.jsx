function HealthTips({ tips }) {
  const icons = ["💧", "🚶", "😴", "🥗"];

  return (
    <div className="section-card health-tips-card">

      <h2>🌿 Health Tips</h2>

      <div className="tips-list">
        {tips.map((tip, index) => (
          <div className="tip-item" key={index}>
            <span className="tip-icon">{icons[index] || "🌿"}</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default HealthTips;