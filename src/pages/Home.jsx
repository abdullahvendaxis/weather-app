import HeroSection from "../components/HeroSection";
import CapitalCities from "../components/CapitalCities";
import Sidebar from "../components/Sidebar";
import WeatherMap from "../components/WeatherMap";

function Home({ setSelectedCity }) {

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="home-section">

      {/* HERO */}
      <HeroSection setSelectedCity={setSelectedCity} />

      {/* MAIN CONTENT */}
      <div className="home-container">

        <div className="home-layout">

          {/* LEFT CONTENT */}
          <div className="home-left">

            <CapitalCities />

            <h2 className="weather-map-title">Weather Map</h2>

            <WeatherMap />

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="home-right">

            <Sidebar date={today} />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Home;