import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCities, getCurrentWeather } from "../api/weatherService";

function CitySearch({ setSelectedCity }) {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ================= SEARCH SUGGESTIONS ================= */

  const handleChange = async (value) => {

    setQuery(value);
    setError("");

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const results = await searchCities(value);

    // show only 4 suggestions
    setSuggestions(results.slice(0, 4));
  };

  /* ================= NAVIGATE TO DETAIL ================= */

  const goToDetail = (cityName) => {

    if (!cityName) return;

    const validCity = suggestions.find(
      (city) => city.name.toLowerCase() === cityName.toLowerCase()
    );

    if (!validCity) {
      setError("City not found. Please select from suggestions.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    navigate(`/detail/${validCity.name}/${today}`);

    setSuggestions([]);
  };

  /* ================= GPS LOCATION ================= */

  const handleLocationFetch = () => {

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (position) => {

      const { latitude, longitude } = position.coords;

      const data = await getCurrentWeather(`${latitude},${longitude}`);

      const cityName = data.location.name;

      setQuery(cityName);
      setSuggestions([]);

      const today = new Date().toISOString().split("T")[0];

      navigate(`/detail/${cityName}/${today}`);

    });
  };

  return (

    <div className="search-filter">

      {/* Input wrapper */}

      <div className="search-input-wrapper">

        <input
          type="text"
          value={query}
          placeholder="Search city..."
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              goToDetail(query);
            }
          }}
          className="search-input"
        />

        {/* GPS Button */}

        <button
          onClick={handleLocationFetch}
          className="search-location-btn"
        >
          📍
        </button>

      </div>

      {/* Suggestions */}

      {suggestions.length > 0 && (

        <div className="search-suggestions">

          {suggestions.map((s, i) => (

            <div
              key={i}
              onClick={() => {
                setQuery(s.name);
                goToDetail(s.name);
              }}
              className="search-suggestion-item"
            >

              <span style={{ marginRight: "8px" }}>📍</span>

              {s.name}, {s.country}

            </div>

          ))}

        </div>

      )}

      {/* Error Message */}

      {error && (
        <p style={{ marginTop: "8px", fontSize: "0.85rem", color: "#ff4d4f" }}>
          {error}
        </p>
      )}

    </div>

  );
}

export default CitySearch;