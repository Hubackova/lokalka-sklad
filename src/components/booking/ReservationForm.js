import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import ItemCalendar from "./ItemCalendar";
import RentSummary from "./RentSummary";
import { reservationsFb } from "../../firebase/firebase";
import { isAdmin as adminFunction } from "../../utils";
import { itemList, itemTypes } from "../../data/items";
import { UserContext } from "../../Contexts";
import "./ReservationForm.scss";
import Input from "../Input";
import Button from "../Button";

const ReservationForm = ({
  itemNames,
  date,
  invalid,
  reservations,
  handleDateChange,
  checkDisableDates,
  initializeState,
}) => {
  const { isAuth, user } = useContext(UserContext);
  const isAdmin = adminFunction(user);
  const [userSetup, setUserSetup] = useState({
    phone: "",
    email: "",
    name: "",
  });
  const [reservationSetup, setReservationSetup] = useState({
    rent: isAdmin,
    payed: false,
    free: false,
  });

  useEffect(() => {
    setUserSetup({
      phone: isAdmin ? "" : user.phone,
      email: isAdmin ? "" : user.email,
      name: isAdmin ? "" : user.name,
    });
    setReservationSetup({ ...reservationSetup, rent: isAdmin });
  }, [user.uid, isAdmin]);

  const daysNum = date[0] ? moment(date[1]).diff(date[0], "days") || 1 : 0;
  const formattedDate = {
    from: moment(date[0]).format("YYYY-MM-DD"),
    to: moment(date[1]).format("YYYY-MM-DD"),
  };
  const reservationDate = moment(new Date()).format("YYYY-MM-DD");
  const VS =
    userSetup.phone &&
    parseInt(
      userSetup.phone.replace(/\s/g, "").slice(-6) +
        moment(new Date()).format("MMDD"),
      10
    );

  function getPrice(i, daysNum) {
    const item = itemList.find((j) => j.id === i);
    const itemType = itemTypes.find((type) => type.type === item.type);
    const price =
      itemType.type === "drytoolboots"
        ? itemType.price1 * daysNum
        : daysNum === 1
        ? itemType.price1
        : daysNum < 4
        ? itemType.price2
        : daysNum < 7
        ? itemType.price3
        : daysNum < 10
        ? itemType.price4
        : daysNum < 13
        ? itemType.price5
        : itemType.price6;
    return price;
  }

  function addReservation() {
    const addingItems = itemNames.map((i, index) => {
      const price = getPrice(i, daysNum);
      return {
        ...userSetup,
        phone: userSetup.phone.replace(/\s/g, ""),
        ...reservationSetup,
        itemName: i,
        itemNames: itemNames,
        date: formattedDate,
        daysNum: daysNum,
        price: price,
        reservationDate,
        notification: false,
        returned: false,
        VS,
      };
    });
    initializeState();
    addingItems.forEach((element) => reservationsFb.push(element));
  }

  const hasItems = itemNames.length > 0;
  const disabledDates = itemNames.map((i) => {
    const items = reservations.filter((j) => j.itemName === i);
    return items ? items.map((i) => i.date) : [];
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
          <Button
            color="green"
            icon="plus"
            onClick={addReservation}
            className="reserve-button"
            disabled={
              !daysNum ||
              invalid ||
              !userSetup.name ||
              !userSetup.phone ||
              userSetup.phone.replace(/\s/g, "").length < 9
            }
          >
            Rezervovat
          </Button>
          {!isAdmin && !user.phone && (
            <div>
              <label>Tel. číslo:</label>
              <Input
                handleChange={(e) =>
                  setUserSetup({ ...userSetup, phone: e.target.value })
                }
                value={userSetup.phone}
                label=""
                placeholder=" zadej tel. číslo"
                required={true}
                style={{ width: 220, borderColor: "red" }}
              />
            </div>
          )}
          {isAdmin && (
            <>
              <div>
                <label>Zaplaceno:</label>
                <input
                  name="payed"
                  type="checkbox"
                  onChange={() =>
                    setReservationSetup({
                      ...reservationSetup,
                      payed: !reservationSetup.payed,
                    })
                  }
                  checked={reservationSetup.payed}
                />
              </div>
              <div>
                <label>Zdarma (horoškola):</label>
                <input
                  name="free"
                  type="checkbox"
                  onChange={() =>
                    setReservationSetup({
                      ...reservationSetup,
                      free: !reservationSetup.free,
                    })
                  }
                  checked={reservationSetup.free}
                />
              </div>
              <div>
                <label>Zapůjčeno:</label>
                <input
                  name="rent"
                  type="checkbox"
                  onChange={() =>
                    setReservationSetup({
                      ...reservationSetup,
                      rent: !reservationSetup.rent,
                    })
                  }
                  checked={reservationSetup.rent}
                />
              </div>
              <div>
                <label>Email:</label>
                <Input
                  handleChange={(e) =>
                    setUserSetup({
                      ...userSetup,
                      email: e.target.value.replace(/\s/g, ""),
                    })
                  }
                  value={userSetup.email}
                  label=""
                  placeholder=" email toho, kdo si věc půjčuje"
                  type="email"
                  required={true}
                  style={{ width: 220 }}
                />
              </div>
              <div>
                <label>Jméno:</label>
                <Input
                  handleChange={(e) =>
                    setUserSetup({
                      ...userSetup,
                      name: e.target.value,
                    })
                  }
                  value={userSetup.name}
                  label=""
                  placeholder="jméno + příjmení toho, kdo si věc půjčuje"
                  required={true}
                  style={{ width: 300 }}
                />
              </div>
              <div>
                <label>Tel. číslo:</label>
                {/* TODO: pokud admin - zkusit doplnit tel. číslo po zadání emailu */}
                <Input
                  handleChange={(e) =>
                    setUserSetup({
                      ...userSetup,
                      phone: e.target.value.replace(/\s/g, ""),
                    })
                  }
                  value={userSetup.phone}
                  label=""
                  placeholder=" tel.číslo toho, kdo si věc půjčuje"
                  required={true}
                  style={{ width: 220 }}
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
