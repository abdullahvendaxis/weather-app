function CurrentWeather({ weather }) {
  return (
    <div className="text-center p-6 border-b">
      <h2 className="text-2xl font-bold">
        {weather.location.name}
      </h2>

      <img
        src={weather.current.condition.icon}
        alt="icon"
        className="mx-auto"
      />

      <p className="text-5xl font-bold">
        {weather.current.temp_c}°C
      </p>

      <p>{weather.current.condition.text}</p>
    </div>
  );
}

export default CurrentWeather;
