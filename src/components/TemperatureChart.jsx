import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function TemperatureChart({ hours }) {
  const chartData = hours.map((h) => ({
    time: h.time.split(" ")[1],
    temp: h.temp_c,
  }));

  return (
    <div className="rounded-2xl p-6 border mb-8">
      <h3 className="text-xl font-semibold mb-4">
        Temperature Chart (Hourly)
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;
