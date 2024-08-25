import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import React, { useState, useMemo } from "react";

export default function DatePicker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePicker, setDatePicker] = useState(false);
  const date = new Date();
  const today = format(date, "dd-MM-yyyy");

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const monthStart = useMemo(() => startOfMonth(currentDate), [currentDate]);
  const monthEnd = useMemo(() => endOfMonth(monthStart), [monthStart]);
  const weekStart = useMemo(() => startOfWeek(monthStart), [monthStart]);
  const weekEnd = useMemo(() => endOfWeek(monthEnd), [monthEnd]);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const handleClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="date-picker-container">
      <button
        className="date-picker-button"
        onClick={() => setDatePicker((datePicker) => !datePicker)}
      >
        {selectedDate !== null
          ? format(selectedDate, "dd MMM yyyy")
          : format(date, "dd MMM yyyy")}
      </button>
      {datePicker && (
        <div className="date-picker">
          <div className="date-picker-header">
            <button
              className="prev-month-button month-button"
              onClick={handlePrevMonth}
            >
              &larr;
            </button>
            <div className="current-month">
              {format(currentDate, "MMMM - yyyy")}
            </div>
            <button
              className="next-month-button month-button"
              onClick={handleNextMonth}
            >
              &rarr;
            </button>
          </div>
          <div className="date-picker-grid-header date-picker-grid">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="date-picker-grid-dates date-picker-grid">
            {days.map((day) => {
              const formattedDay = format(day, "dd-MM-yyyy");
              const isToday = formattedDay === today;
              const isSelected =
                selectedDate &&
                formattedDay === format(selectedDate, "dd-MM-yyyy");
              return (
                <button
                  key={day.toString()}
                  className={`date ${
                    format(day, "MM-yyyy") !== format(currentDate, "MM-yyyy")
                      ? "date-picker-other-month-date"
                      : isToday
                      ? "today"
                      : ""
                  } ${isSelected ? "selected" : ""}`}
                  disabled={
                    format(day, "MM-yyyy") !== format(currentDate, "MM-yyyy")
                      ? true
                      : false
                  }
                  onClick={(e) => handleClick(day)}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
