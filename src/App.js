import React, { useState, useEffect } from "react";

import Reservation from "./components/booking";
import AdminLayout from "./components/manage";
import useAuth from "./components/auth/useAuth";
import Header from "./components/Header";
import { reservationsFb } from "./firebase/firebase";
import { UserContext } from "./Contexts";
import "./App.scss";
import "font-awesome/css/font-awesome.min.css";
import Fiotest from "./fiotest";
const App = () => {
  const [isAdmin, setAdmin] = useState(false);
  const [isReservation, setIsReservation] = useState(true);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    reservationsFb.on("value", snapshot => {
      const items = [];
      snapshot.forEach(child => {
        let childItem = child.val();
        childItem.key = child.key;
        items.push(childItem);
      });
      setReservations(items);
    });
  }, []);

  return (
    <UserContext.Provider value={useAuth()}>
      <div className="App">
        <Header isAdmin={isAdmin} setAdmin={setAdmin} setIsReservation={setIsReservation} />
        <main>
          <div className="menu" />
          <Fiotest />
          {isReservation ? (
            <Reservation reservations={reservations} isAdmin={isAdmin} />
          ) : (
            <AdminLayout reservations={reservations} /> //handleChange={this.handleChange}
          )}
        </main>
      </div>
    </UserContext.Provider>
  );
};

export default App;
