import React, { Component } from "react";
import Reservation from "./components/booking";
import AdminLayout from "./components/manage";
import { reservationsRef } from "./firebase";
import "./App.scss";
import 'font-awesome/css/font-awesome.min.css'

class App extends Component {
  state = {
    isReservation: true,
    reservations: [],
    admin: false
  };

  componentDidMount() {
    reservationsRef.on("value", snapshot => {
      var items = [];
      snapshot.forEach(child => {
        let childItem = child.val();
        childItem.key = child.key;
        items.push(childItem);
      });
      this.setState({ reservations: items });
    });
  }

  toReservation = () => this.setState({isReservation: true})
  toAdminLayout = () => this.setState({isReservation: false})
  adminSwitch = () => this.setState({admin: !this.state.admin})
  render() {
    const { isReservation, reservations, admin } = this.state;
    return (
      <div className="App">
        <div className="menu">
          <span onClick={this.toReservation}>Rezervace</span>
          {admin && <span onClick={this.toAdminLayout}>Správa rezervací</span>}
          <span ><i onClick={this.adminSwitch} style={{color: admin ? "gold" :"white"}}className="fa fa-user" /></span>
        </div>
        {isReservation ? <Reservation reservations={reservations} admin={admin}/> : <AdminLayout reservations={reservations} />}
      </div>
    );
  }
}

export default App;
