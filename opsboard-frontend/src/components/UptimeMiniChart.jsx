export default function UptimeMiniChart({ up = 0, down = 0 }) {
  const points = 12;

  // 🔥 SAFETY: agar koi service hi nahi
  if (up + down === 0) {
    return (
      <div className="uptime-chart summary-chart">
        {Array.from({ length: points }).map((_, i) => (
          <span key={i} className="uptime-bar idle" />
        ))}
      </div>
    );
  }

  const upBars = Math.round((up / (up + down)) * points);

  return (
    <div className="uptime-chart summary-chart">
      {Array.from({ length: points }).map((_, i) => (
        <span
          key={i}
          className={`uptime-bar ${i < upBars ? "up" : "down"}`}
        />
      ))}
    </div>
  );
}
