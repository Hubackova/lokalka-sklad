import React, { useState, useEffect } from "react";

import Reservation from "./components/booking";
import AdminLayout from "./components/manage";
import LoginForm from "./components/auth/LoginForm";
import SignInForm from "./components/auth/SignInForm";
import useAuth from "./components/auth/useAuth";
import UserPanel from "./components/auth/UserPanel";
import { reservationsFb } from "./firebase/firebase";
import { UserContext } from "./Contexts";
import "./App.scss";
import "font-awesome/css/font-awesome.min.css";

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

  // handleChange = e => {
  //   const reservations = reservations.filter(i => {
  //     return i.itemName.includes(e.target.value) || i.userId.includes(e.target.value)
  //   })
  //   this.setState({value: e.target.value, reservations}, () => {
  //     if (this.state.value === '') {
  //       this.fetchReservation()
  //     }
  //   })
  // }

  return (
    <UserContext.Provider value={useAuth()}>
      <div className="App">
        <LoginForm />
        <SignInForm />
        <UserPanel />

        <div className="menu">
          <span onClick={() => setIsReservation(true)}>Rezervace</span>
          {isAdmin && <span onClick={() => setIsReservation(false)}>Správa rezervací</span>}
          <span onClick={() => setAdmin(!isAdmin)}>
            <i className={`fa fa-user${isAdmin ? " admin" : ""}`} />
          </span>
        </div>
        {isReservation ? (
          <Reservation reservations={reservations} isAdmin={isAdmin} />
        ) : (
          <AdminLayout reservations={reservations} /> //handleChange={this.handleChange}
        )}
      </div>
    </UserContext.Provider>
  );
};

export default App;
