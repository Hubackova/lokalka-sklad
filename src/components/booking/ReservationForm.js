import React, { useState, useEffect, useContext, useCallback } from "react";
import moment from "moment";
import ItemCalendar from "./ItemCalendar";
import RentSummary from "./RentSummary";
import { reservationsFb, usersFb } from "../../firebase/firebase";
import { itemList, itemTypes } from "../../data/items";
import { UserContext } from "../../Contexts";
import "./ReservationForm.scss";

const ReservationForm = ({
  isAdmin,
  itemNames,
  date,
  invalid,
  reservations,
  handleDateChange,
  checkDisableDates,
  initializeState
}) => {
  const { isAuth, user } = useContext(UserContext);

  const [userSetup, setUserSetup] = useState({ lokoId: "", phone: "", email: "" });
  const [reservationSetup, setReservationSetup] = useState({
    rent: isAdmin ? true : false,
    payed: false
  });

  useEffect(() => {
    setUserSetup({ lokoId: user.lokoId, phone: user.phone, email: user.email });
  }, [user.uid]);

  const daysNum = moment(date[1]).diff(date[0], "days");
  const formattedDate = {
    from: moment(date[0]).format("YYYY-MM-DD"),
    to: moment(date[1]).format("YYYY-MM-DD")
  };

  function getPrice(i, daysNum) {
    const item = itemList.find(j => j.id === i);
    const itemType = itemTypes.find(type => type.type === item.type);
    const price = daysNum === 1 ? itemType.price1 : daysNum < 5 ? itemType.price2 : itemType.price3;
    return price;
  }

  function addReservation() {
    const addingItems = itemNames.map(i => {
      const price = getPrice(i, daysNum);
      return {
        ...userSetup,
        ...reservationSetup,
        itemName: i,
        itemNames: itemNames,
        date: formattedDate,
        daysNum: daysNum,
        price: price,
        notification: false,
        returned: false
      };
    });
    initializeState();
    addingItems.forEach(element => reservationsFb.push(element));
  }

  const hasItems = itemNames.length > 0;
  const disabledDates = itemNames.map(i => {
    const items = reservations.filter(j => j.itemName === i);
    return items ? items.map(i => i.date) : [];
  });

  return (
    <>
      <ItemCalendar
        handleDateChange={handleDateChange}
        checkDisableDates={checkDisableDates}
        disabledDates={disabledDates}
        date={date}
        invalid={invalid}
      />
      {!invalid && hasItems && Array.isArray(date) && (
        <RentSummary itemNames={itemNames} date={date} getPrice={getPrice} />
      )}
      {hasItems && isAuth && (
        <div className="reservation-submit-panel">
          <button
            onClick={addReservation}
            className="reserve-button"
            disabled={!daysNum || invalid}
          >
            <i className="fa fa-plus" />
            Rezervovat
          </button>

          {isAdmin && (
            <>
              <div>
                <label>Zaplaceno:</label>
                <input
                  name="payed"
                  type="checkbox"
                  onChange={() =>
                    setReservationSetup({ ...reservationSetup, payed: !reservationSetup.payed })
                  }
                  checked={reservationSetup.payed}
                />
              </div>
              <div>
                <label>Zapůjčeno:</label>
                <input
                  name="rent"
                  type="checkbox"
                  onChange={() =>
                    setReservationSetup({ ...reservationSetup, rent: !reservationSetup.rent })
                  }
                  checked={reservationSetup.rent}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ReservationForm;
