function HealthTips({ tips }) {
  return (
    <div className="section-card">

      <h2>🌿 Health Tips</h2>

      {tips.map((tip, index) => (
        <p key={index}>{tip}</p>
      ))}

    </div>
  );
}

export default HealthTips;