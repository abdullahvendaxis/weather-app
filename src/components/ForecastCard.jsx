import { useNavigate, useParams } from "react-router-dom";

function ForecastCard({ day }) {
  const navigate = useNavigate();
  const { city } = useParams();

  return (
    <div
      onClick={() => navigate(`/detail/${city}/${day.date}`)}
      className="bg-white p-4 rounded-xl shadow cursor-pointer text-center"
    >
      <p className="font-semibold">{day.date}</p>

      <img
        src={day.day.condition.icon}
        alt="icon"
        className="mx-auto"
      />

      <p className="text-lg font-bold">
        {day.day.avgtemp_c}°C
      </p>

      <p>{day.day.condition.text}</p>
    </div>
  );
}

export default ForecastCard;
