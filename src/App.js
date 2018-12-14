import React, { Component } from "react";
import Reservation from "./components/Reservation";
import AdminLayout from "./components/AdminLayout";
import { reservationsRef } from "./firebase";
import "./App.scss";
import 'font-awesome/css/font-awesome.min.css'

class App extends Component {
  state = {
    isReservation: true,
    reservations: []
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
  render() {
    const { isReservation, reservations } = this.state;
    return (
      <div className="App">
        <div className="menu">
          <span onClick={this.toReservation}>Rezervace</span>
          <span onClick={this.toAdminLayout}>Správa rezervací</span>
        </div>
        {isReservation ? <Reservation reservations={reservations}/> : <AdminLayout reservations={reservations} />}
      </div>
    );
  }
}

export default App;
