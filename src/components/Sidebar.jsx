import CalendarCard from "./WeatherCalendar";

function Sidebar({ date }) {

  const selectedDate =
    date || new Date().toISOString().split("T")[0];

  return (
    <aside className="sidebar">

      {/* Calendar */}
      <div className="sidebar-block">
        <CalendarCard selectedDate={selectedDate} />
      </div>

      {/* Weather News */}
      <div className="sidebar-block">

        <h3 className="sidebar-title">
          Weather News
        </h3>

        <div className="sidebar-news">

          <div className="sidebar-news-item">
            Sample Post Title
          </div>

          <div className="sidebar-news-item">
            Sample Post Title
          </div>

          <div className="sidebar-news-item">
            Sample Post Title
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;