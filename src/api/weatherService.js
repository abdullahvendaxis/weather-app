import { API_KEY, BASE_URL } from "./config";

/* ================= HELPER ================= */
const handleResponse = async (res) => {
  if (!res.ok) {
    throw new Error("Weather API request failed");
  }
  return res.json();
};

/* 🌤 Current Weather */
export const getCurrentWeather = async (city) => {
  const res = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`
  );
  return handleResponse(res);
};

/* 📅 Forecast Weather (Today + 3 Future Days) */
export const getForecastWeather = async (city, days = 4) => {
  const res = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`
  );
  return handleResponse(res);
};

/* 🔍 Search Cities */
export const searchCities = async (query) => {
  if (!query) return [];

  const res = await fetch(
    `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
  );
  return handleResponse(res);
};

/* 📜 History Weather */
export const getHistoryWeather = async (city, date) => {
  const res = await fetch(
    `${BASE_URL}/history.json?key=${API_KEY}&q=${city}&dt=${date}`
  );
  return handleResponse(res);
};