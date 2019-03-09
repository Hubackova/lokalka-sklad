import React, { useState, useEffect } from "react";

import Reservation from "./components/booking";
import AdminLayout from "./components/manage";
import LoginForm from "./components/auth/LoginForm";
import SignInForm from "./components/auth/SignInForm";
import WithAuth from "./components/auth/withAuth";
import UserPanel from "./components/auth/UserPanel";
import { reservationsFb } from "./firebase/firebase";
import "./App.scss";
import "font-awesome/css/font-awesome.min.css";


const App = () => {
  const [isAdmin, toggleAdmin] = useState(false);
  const [reservations, getReservations] = useState([]);
  const [isReservation, switchReservations] = useState(true);

  useEffect(() => {
    reservationsFb.on("value", snapshot => {
      const items = [];
      snapshot.forEach(child => {
        let childItem = child.val();
        childItem.key = child.key;
        items.push(childItem);
      });
      getReservations(items);
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
    <WithAuth>
      <div className="App">
        <LoginForm />
        <SignInForm />
        <UserPanel />

        <div className="menu">
          <span onClick={() => switchReservations(true)}>Rezervace</span>
          {isAdmin && <span onClick={() => switchReservations(false)}>Správa rezervací</span>}
          <span onClick={() => toggleAdmin(!isAdmin)}>
            <i className={`fa fa-user${isAdmin ? " admin" : ""}`} />
          </span>
        </div>
        {isReservation ? (
          <Reservation reservations={reservations} isAdmin={isAdmin} />
        ) : (
          <AdminLayout reservations={reservations} /> //handleChange={this.handleChange}
        )}
      </div>
    </WithAuth>
  );
};

export default App;
