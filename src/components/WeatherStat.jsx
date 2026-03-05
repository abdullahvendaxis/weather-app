function WeatherStat({ label, value }) {
  return (
    <div
      className="rounded-xl p-4 text-center transition hover:scale-105"
      style={{
        background: "rgba(255,255,255,0.25)",
      }}
    >
      <p className="text-sm opacity-70 mb-1">
        {label}
      </p>
      <p className="font-bold text-xl">
        {value}
      </p>
    </div>
  );
}

export default WeatherStat;
