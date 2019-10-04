import moment from "moment";
import Calendar from "react-calendar";
import React, { useEffect } from "react";
import "./ItemCalendar.scss";

const ItemCalendar = ({ disabledDates, checkDisableDates, handleDateChange, date, invalid }) => {
  useEffect(() => checkDisableDates(disabledDates));

  const getTileDisabled = ({ date }) => {
    const reserved = disabledDates.map(i => {
      return i.map(j => {
        const isDateReserved = moment(date).isBetween(j.from, j.to, null, []);
        return isDateReserved;
      });
    });
    return moment(date).add(1, "days") < new Date() || reserved.flat().includes(true);
  };

  return (
    <div>
      <label>Datum:</label>
      <Calendar
        className={invalid ? "invalid" : ""}
        onChange={date => handleDateChange(date, disabledDates)}
        value={date}
        selectRange={true}
        tileDisabled={getTileDisabled}
      />
    </div>
  );
};

export default ItemCalendar;
