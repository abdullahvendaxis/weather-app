
import CalendarCard from "./WeatherCalendar";

function DetailSidebar({ forecastDay, date }) {
  return (
    <div className="space-y-6">

   

      {/* Calendar */}
      <div className="glass-card">
        <CalendarCard selectedDate={date} />
      </div>

    </div>
  );
}

export default DetailSidebar;