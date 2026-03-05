import React from "react";

function WeatherSummaryCard({ city, date, data }) {
  const forecastDay = data.forecast?.forecastday?.[0];

  const temp =
    data.current?.temp_c ||
    forecastDay?.day.avgtemp_c;

  const condition =
    data.current?.condition?.text ||
    forecastDay?.day.condition.text;

  const icon =
    data.current?.condition?.icon ||
    forecastDay?.day.condition.icon;

  const dayName = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <section className="summary-hero">

      {/* TOP AREA */}
      <div className="summary-hero-top">

        <div className="summary-hero-left">
          <p className="summary-hero-date">
            {dayName} • {date}
          </p>
          <h1 className="summary-hero-city">
            {city}
          </h1>
        </div>

        <div className="summary-hero-right">
          <img src={icon} alt="weather" />
          <div>
            <h2 className="summary-hero-temp">
              {temp}°C
            </h2>
            <p className="summary-hero-condition">
              {condition}
            </p>
          </div>
        </div>

      </div>

      {/* ALL 8 DETAILS IN ONE ROW */}
      <div className="summary-hero-stats">

        <Stat label="Feels" value={`${data.current?.feelslike_c}°C`} />
        <Stat label="Wind" value={`${data.current?.wind_kph} kph`} />
        <Stat label="Humidity" value={`${data.current?.humidity}%`} />
        <Stat label="Pressure" value={`${data.current?.pressure_mb} mb`} />
        <Stat label="UV" value={data.current?.uv} />
        <Stat label="Gust" value={`${data.current?.gust_kph} kph`} />
        <Stat label="Vis" value={`${data.current?.vis_km} km`} />
        <Stat label="Rain" value={`${data.current?.precip_mm} mm`} />

      </div>

    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="summary-hero-stat">
      <p>{label}</p>
      <h4>{value}</h4>
    </div>
  );
}

export default WeatherSummaryCard;