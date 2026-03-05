import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHistoryWeather, getForecastWeather } from "../api/weatherService";

function PastFutureCards() {
  const { city, date } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const formatDate = (d) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(d).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const loadData = async () => {
      const baseDate = new Date(date);
      let combined = [];

      /* ===== Past 3 Days ===== */
      for (let i = 3; i >= 1; i--) {
        const pastDate = new Date(baseDate);
        pastDate.setDate(baseDate.getDate() - i);

        const formatted = pastDate.toISOString().split("T")[0];
        const data = await getHistoryWeather(city, formatted);

        if (data.forecast) {
          const day = data.forecast.forecastday[0];
          combined.push({
            date: formatted,
            ...day.day,
          });
        }
      }

      /* ===== Future 3 Days ===== */
      const forecast = await getForecastWeather(city, 4);

      if (forecast.forecast) {
        forecast.forecast.forecastday
          .slice(1, 4)
          .forEach((d) => {
            combined.push({
              date: d.date,
              ...d.day,
            });
          });
      }

      setRows(combined);
    };

    loadData();
  }, [city, date]);

  return (
    <section className="pf-section">
      <div className="pf-wrapper">

        <h3 className="pf-title">
          Past & Upcoming Days
        </h3>

        <div className="pf-table-container">
          <table className="pf-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Weather</th>
                <th>Wind</th>
                <th>Humidity</th>
                <th>Pressure</th>
                <th>UV</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    navigate(`/detail/${city}/${row.date}`)
                  }
                >
                  {/* Date */}
                  <td>{formatDate(row.date)}</td>

                  {/* Icon + Temp + Condition */}
                  <td className="pf-weather-cell">
                    <img src={row.condition.icon} alt="" />
                    <div>
                      <div className="pf-temp">
                        {row.avgtemp_c}°C
                      </div>
                      <div className="pf-condition-text">
                        {row.condition.text}
                      </div>
                    </div>
                  </td>

                  <td>{row.maxwind_kph} kph</td>
                  <td>{row.avghumidity}%</td>
                  <td>{row.pressure_mb} mb</td>
                  <td>{row.uv}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
}

export default PastFutureCards;