import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForecastWeather, getHistoryWeather } from "../api/weatherService";

import HourlyForecast from "../components/HourlyForecast";
import DateNavigationCards from "../components/PastFutureCards";
import TemperatureChart from "../components/TemperatureChart";
import WeatherSummaryCard from "../components/WeatherSummaryCard";
import DetailSidebar from "../components/DetailSidebar";
import WeatherAlert from "../components/WeatherAlert";

import { APP_NAME } from "../config";

function DayDetail() {

  const { city, date } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= PAGE TITLE ================= */

  useEffect(() => {

    if (!city || !date) return;

    const formattedCity =
      city.charAt(0).toUpperCase() + city.slice(1);

    document.title = `${formattedCity} (${date}) | ${APP_NAME}`;

    return () => {
      document.title = APP_NAME;
    };

  }, [city, date]);



  /* ================= FETCH WEATHER ================= */

  useEffect(() => {

    const fetchWeather = async () => {

      setLoading(true);
      setError(null);

      try {

        const today = new Date().toISOString().split("T")[0];

        let result;

        if (date < today) {

          /* History Weather */

          result = await getHistoryWeather(city, date);

        } else {

          /* Forecast Weather */

          result = await getForecastWeather(city, 7);

        }

        setData(result);

      } catch (err) {

        console.error("Weather fetch error:", err);
        setError("Failed to load weather data.");

      } finally {

        setLoading(false);

      }

    };

    fetchWeather();

  }, [city, date]);



  /* ================= LOADING ================= */

  if (loading) {
    return (
      <section className="detail-section">
        <div className="detail-container">
          <div className="detail-loading">
            Loading weather data...
          </div>
        </div>
      </section>
    );
  }



  /* ================= ERROR ================= */

  if (error) {
    return (
      <section className="detail-section">
        <div className="detail-container">
          <div className="detail-error">
            {error}
          </div>
        </div>
      </section>
    );
  }



  const formattedCity =
    city.charAt(0).toUpperCase() + city.slice(1);



  /* ================= GET SELECTED DAY ================= */

  const forecastDay =
    data?.forecast?.forecastday?.find(
      (d) => d.date === date
    ) || data?.forecast?.forecastday?.[0];



  return (

    <section className="detail-section">

      <div className="detail-container">

        {/* ================= WEATHER SUMMARY ================= */}

        <WeatherSummaryCard
          city={formattedCity}
          date={date}
          data={data}
        />



        {/* ================= WEATHER ALERTS ================= */}

        {data?.alerts?.alert?.length > 0 && (
          <WeatherAlert alerts={data.alerts.alert} />
        )}



        {/* ================= MAIN LAYOUT ================= */}

        {forecastDay && (

          <div className="detail-layout">

            {/* LEFT COLUMN */}

            <div className="detail-left">

              <HourlyForecast
                hours={forecastDay.hour}
              />

              <TemperatureChart
                hours={forecastDay.hour}
              />

              {/* DATE NAVIGATION */}

              <DateNavigationCards />

            </div>



            {/* RIGHT COLUMN */}

            <div className="detail-right">

              <DetailSidebar
                forecastDay={forecastDay}
                date={date}
              />

            </div>

          </div>

        )}

      </div>

    </section>

  );

}

export default DayDetail;