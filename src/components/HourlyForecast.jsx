function HourlyForecast({ hours }) {
  if (!hours) return null;

  return (
    <section className="hourly-simple-section">
      <div className="hourly-simple-wrapper">

        <h3 className="hourly-simple-title">
          Hourly Forecast
        </h3>

        {/* Scroll Container */}
        <div className="hourly-scroll-container">
          <table className="hourly-simple-table">

            <thead>
              <tr>
                <th>Time</th>
                <th>Temp (°C)</th>
                <th>Condition</th>
                <th>Wind</th>
                <th>Humidity</th>
              </tr>
            </thead>

            <tbody>
              {hours.map((hour, index) => (
                <tr key={index}>
                  <td>{hour.time.split(" ")[1]}</td>
                  <td>{hour.temp_c}°</td>
                  <td className="hourly-condition-cell">
                    <img src={hour.condition.icon} alt="" />
                    {hour.condition.text}
                  </td>
                  <td>{hour.wind_kph} kph</td>
                  <td>{hour.humidity}%</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
}

export default HourlyForecast;