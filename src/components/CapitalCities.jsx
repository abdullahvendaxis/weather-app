import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getForecastWeather } from "../api/weatherService";

function CapitalCities() {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const capitals = [
      "London",
      "Paris",
      "Islamabad",
      "Washington",
      "Dhaka",
    ];

    const fetchCities = async () => {
      const results = await Promise.all(
        capitals.map((c) => getForecastWeather(c, 4))
      );
      setCities(results);
    };

    fetchCities();
  }, []);

  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <section className="capital-section">
      <div className="capital-wrapper">

        {/* HEADER */}
        <div className="capital-header">
          <div>City</div>
          <div>Today</div>
          <div>Tomorrow</div>
          <div>Next</div>
        </div>

        {/* ROWS */}
        {cities.map((city, i) => {

          const forecast = city.forecast?.forecastday;
          if (!forecast) return null;

          return (
            <div
              key={i}
              className="capital-row-card"
              onClick={() =>
                navigate(
                  `/detail/${city.location.name}/${city.location.localtime.split(" ")[0]}`
                )
              }
            >
              <div className="capital-col city">
                {city.location?.name}
              </div>

              <div className="capital-col">
                <img src={forecast[0].day.condition.icon} alt="" />
                {getDayName(forecast[0].date)} {forecast[0].day.avgtemp_c}°
              </div>

              <div className="capital-col">
                <img src={forecast[1].day.condition.icon} alt="" />
                {getDayName(forecast[1].date)} {forecast[1].day.avgtemp_c}°
              </div>

              <div className="capital-col">
                <img src={forecast[2].day.condition.icon} alt="" />
                {getDayName(forecast[2].date)} {forecast[2].day.avgtemp_c}°
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}

export default CapitalCities;