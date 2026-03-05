import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCities } from "../api/weatherService";

function CitySearch({ setSelectedCity }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = async (value) => {
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const results = await searchCities(value);
    setSuggestions(results);
  };

  const goToDetail = (cityName) => {
    if (!cityName) return;
    const today = new Date().toISOString().split("T")[0];
    navigate(`/detail/${cityName}/${today}`);
  };

    // Fetch user location without any external API
  const handleLocationFetch = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Set lat,lon directly in input
      setQuery(`${latitude},${longitude}`);
    });
  };

  return (
    <div className="relative w-full">

      <div className="flex gap-3 items-center">

        <input
          type="text"
          value={query}
          placeholder="Search city..."
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") goToDetail(query);
          }}
          className="flex-1 px-5 py-3 rounded-xl outline-none bg-white/80 backdrop-blur-sm text-black placeholder:text-gray-500 border border-gray-200"
        />

        {/* Location Fetch Button */}
        <button
          onClick={handleLocationFetch}
          className="px-3 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition"
        >
          📍
        </button>

        <button
          onClick={() => goToDetail(query)}
          className="px-5 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
        >
          Search
        </button>

      </div>

      {suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg z-20">

          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => goToDetail(s.name)}
              className="p-3 hover:bg-gray-100 cursor-pointer rounded-lg transition text-black"
            >
              {s.name}, {s.country}
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default CitySearch;
