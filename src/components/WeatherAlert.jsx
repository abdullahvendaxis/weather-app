function WeatherAlert({ alerts }) {

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="bg-red-100 border border-red-300 p-4 rounded mb-4">

      <h3 className="font-bold text-red-700 mb-2">
        ⚠ Weather Alerts
      </h3>

      {alerts.map((alert, index) => (

        <div key={index} className="mb-2">

          <div className="font-semibold">
            {alert.headline}
          </div>

          <div className="text-sm">
            {alert.desc}
          </div>

        </div>

      ))}

    </div>
  );
}

export default WeatherAlert;