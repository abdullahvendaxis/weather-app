export function getWeatherTheme(weather) {
  if (!weather) return "theme-sunny";

  const text = weather.current.condition.text.toLowerCase();
  const isDay = weather.current.is_day;

  if (!isDay) return "theme-night";

  if (text.includes("storm") || text.includes("thunder"))
    return "theme-storm";

  if (text.includes("rain"))
    return "theme-rain";

  if (text.includes("cloud"))
    return "theme-cloudy";

  if (text.includes("sun") || text.includes("clear"))
    return "theme-sunny";

  return "theme-sunny";
}
