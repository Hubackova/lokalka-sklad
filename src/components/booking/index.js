import React, { useState, useEffect } from "react";
import moment from "moment";
import MenuOfItems from "./MenuOfItems";
import SelectedItems from "./SelectedItems";
import ReservationForm from "./ReservationForm";
import "./booking.scss";
import { enumerateDaysBetweenDates } from "../../utils";

const Reservation = ({ reservations }) => {
  const [itemNames, setItemNames] = useState([]);
  const [date, setDate] = useState(new Date());
  const [invalid, setInvalid] = useState(false);
  
  useEffect(() => {
    if (itemNames.length === 0) setDate(new Date());
  }, [itemNames.length]);

  const checkDisableDates = disabledDates => {
    const startDate = moment(date[0]);
    const endDate = moment(date[1]);
    const disabledAll = disabledDates.map(j => {
      return j.map(i => enumerateDaysBetweenDates(i.from, i.to));
    });
    const disabledAllFlatten = disabledAll.flat(2);
    const invalidDateArr = disabledAllFlatten.map(i =>
      moment(i).isBetween(startDate, endDate, null, [])
    );
    if (invalidDateArr.includes(true)) {
      setInvalid(true);
    } else setInvalid(false);
  };

  const handleDateChange = (newDate, disabledDates) => {
    checkDisableDates(disabledDates);
    setDate(newDate);
  };

  const addItem = e => {
    const itemName = e.target.id;
    if (!itemNames.includes(itemName)) {
      setItemNames([...itemNames, itemName]);
    }
  };

  const removeItem = itemName => {
    setItemNames(itemNames.filter(i => i !== itemName));
  };

  const initializeState = () => {
    setItemNames([]);
    setDate(new Date());
    setInvalid(false);
  };

  return (
    <div className="reservation">
      <MenuOfItems addItem={addItem} date={date} reservations={reservations} />
      <div className="reservation-box">
      <h5>Prosím, pokud je u maček/cepínů napsáno, že jsou jen do ledu, popř. jen na drytool, berte to na vědomí. Pokud jdete mixy, půjčte si jiný. Díky!</h5>
        <SelectedItems itemNames={itemNames} removeItem={removeItem} />
        <ReservationForm
          itemNames={itemNames}
          date={date}
          reservations={reservations}
          invalid={invalid}
          checkDisableDates={checkDisableDates}
          handleDateChange={handleDateChange}
          initializeState={initializeState}
        />
      </div>
    </div>
  );
};

export default Reservation;
