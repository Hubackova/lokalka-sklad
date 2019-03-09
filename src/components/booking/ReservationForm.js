import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import ItemCalendar from "./ItemCalendar";
import RentSummary from "./RentSummary";
import { reservationsFb } from "../../firebase/firebase";
import firebase from "firebase";
import { itemList, itemTypes } from "../../data/items";
import {UserContext} from "../../Contexts";

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
  const {user, isLoading} = useContext(UserContext)
  if (isLoading) return <div>...loading</div>

  const [userSetup, setUserSetup] = useState({ userId: "" });
  const [reservationSetup, setReservationSetup] = useState({
    rent: isAdmin ? true : false,
    payed: false
  });
  const [userData, setuserData] = useState("Anonymous"); //TODO

  useEffect(() => {
    !user
    ? setuserData("Anonymous") //TODO
    : firebase
      .database()
      .ref("/users/" + user.uid)
      .once("value")
      .then(snapshot => {
        const userData = snapshot.val() && snapshot.val().info;
        setuserData(userData);
      });
  });


  const daysNum = moment(date[1]).diff(date[0], "days");
  const formattedDate = {
    from: moment(date[0]).format("YYYY-MM-DD"),
    to: moment(date[1]).format("YYYY-MM-DD")
  };

  const getPrice = (i, daysNum) => {
    const item = itemList.find(j => j.id === i);
    const itemType = itemTypes.find(type => type.type === item.type);
    const price = daysNum === 1 ? itemType.price1 : daysNum < 5 ? itemType.price2 : itemType.price3;
    return price;
  };

  const addReservation = () => {
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
  };

  const hasItems = itemNames.length > 0;
  const disabledDates = itemNames.map(i => {
    const items = reservations.filter(j => j.itemName === i);
    return items ? items.map(i => i.date) : [];
  });
  return (
    <>
    {userData && JSON.stringify(userData)}
      {hasItems && (
        <>
          <div>
            <label>Id člena:</label>
            <input
              name="userId"
              onChange={e => setUserSetup({ ...userSetup, userId: e.target.value })}
              value={userSetup.userId}
            />
          </div>
          {isAdmin && (
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
          )}
          {isAdmin && (
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
          )}
        </>
      )}
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
      {hasItems && (
        <button onClick={addReservation} className="reserve-button" disabled={!daysNum || invalid}>
          <i className="fa fa-plus" />
          Rezervovat
        </button>
      )}
    </>
  );
};

export default ReservationForm;
