import React, { useState, useEffect } from "react";

function WeatherCalendar({ selectedDate, onDateSelect }) {

  const baseDate = selectedDate ? new Date(selectedDate) : new Date();

  const [month, setMonth] = useState(baseDate.getMonth());
  const [year, setYear] = useState(baseDate.getFullYear());

  const [holidays, setHolidays] = useState([]);

  const today = new Date();

  /* Fetch Holidays Automatically */
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await fetch(
          `https://date.nager.at/api/v3/publicholidays/2026/PK`
        );
        const data = await res.json();
        setHolidays(data);
      } catch (err) {
        console.log("Holiday API error", err);
      }
    };

    fetchHolidays();
  }, [year]);

  /* Calendar Calculations */

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const years = Array.from({ length: 15 }, (_, i) => year - 7 + i);

  const getHoliday = (dateString) => {
    return holidays.find(h => h.date === dateString);
  };

  const handleDateClick = (day) => {
    const formatted = new Date(year, month, day)
      .toISOString()
      .split("T")[0];

    if (onDateSelect) {
      onDateSelect(formatted);
    }
  };

  /* Next Holiday */

  const nextHoliday = holidays
    .filter(h => new Date(h.date) > today)
    .sort((a,b) => new Date(a.date) - new Date(b.date))[0];

  return (
    <div className="calendar-container">

      {/* HEADER */}
      <div className="calendar-top">

        <select
          className="calendar-select"
          value={month}
          onChange={(e)=>setMonth(Number(e.target.value))}
        >
          {Array.from({length:12}).map((_,i)=>(
            <option key={i} value={i}>
              {new Date(0,i).toLocaleString("default",{month:"long"})}
            </option>
          ))}
        </select>

        <select
          className="calendar-select"
          value={year}
          onChange={(e)=>setYear(Number(e.target.value))}
        >
          {years.map((y)=>(
            <option key={y}>{y}</option>
          ))}
        </select>

      </div>

      {/* WEEKDAYS */}
      <div className="calendar-weekdays">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* GRID */}
      <div className="calendar-grid">

        {Array.from({length:firstDayIndex}).map((_,i)=>(
          <div key={i}></div>
        ))}

        {Array.from({length:daysInMonth}).map((_,i)=>{

          const day=i+1;

          const dateKey=new Date(year,month,day)
            .toISOString()
            .split("T")[0];

          const holiday=getHoliday(dateKey);

          const isToday=
            today.getDate()===day &&
            today.getMonth()===month &&
            today.getFullYear()===year;

          return(
            <div
              key={day}
              className={`calendar-day-cell
              ${isToday?"calendar-today":""}
              ${holiday?"calendar-holiday":""}`}
              onClick={()=>handleDateClick(day)}
              title={holiday?.localName || ""}
            >
              {day}
            </div>
          )
        })}

      </div>

      {/* NEXT HOLIDAY */}
      {nextHoliday && (
        <div className="calendar-next-holiday">
          Next Holiday: {nextHoliday.localName}
        </div>
      )}

    </div>
  );
}

export default WeatherCalendar;