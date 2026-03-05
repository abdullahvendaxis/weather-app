function WeatherCard({ children }) {
  return (
    <div
      className="rounded-2xl p-6 shadow-sm transition-all duration-300"
      style={{
        background: "var(--bg-card)",
        color: "var(--text-main)",
      }}
    >
      {children}
    </div>
  );
}

export default WeatherCard;
