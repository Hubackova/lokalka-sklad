import React, { Component } from "react";
import moment from "moment";
import ItemCalendar from "./ItemCalendar";
import ItemSelect from "./ItemSelect";
import RentSummary from "./RentSummary";
import "./Reservation.scss";
import { reservationsRef } from "../firebase";
import { itemList } from "../data/items";

class Reservation extends Component {
  state = {
    itemNames: [],
    date: new Date(),
    userId: "",
    returned: false,
    payed: false,
    notification: false
  };

  handleDateChange = (date, disabledDates) => {
    console.warn(date, disabledDates)
    this.setState({ date })
  };

  addItem = itemName => {
    const { itemNames } = this.state;
    if (!itemNames.includes(itemName)) {
      this.setState({ itemNames: [...itemNames, itemName] });
    }
    this.setState({ itemName });
  };

  removeItem = itemName => {
    const { itemNames } = this.state;
    this.setState({
      itemNames: itemNames.filter(i => i !== itemName)
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCheck = () => {
    this.setState({payed: !this.state.payed});
  }

  addReservation = () => {
    const { itemNames, date } = this.state;

    const formattedDate = {
      from: moment(date[0]).format("YYYY-MM-DD"),
      to: moment(date[1]).format("YYYY-MM-DD")
    };
    const daysNum = moment(date[1]).diff(date[0], "days");

    const addingItems = itemNames.map(i => {
      const item = itemList.find(j => j.id === i);
        return {
          ...this.state,
          itemName: i,
          date: formattedDate,
          daysNum: daysNum,
          price: item.price*daysNum
        };
    });
    this.setState({ payed: false });
    addingItems.forEach(element => reservationsRef.push(element));
  };

  render() {
    const {reservations} = this.props
    const {itemNames, date} = this.state
    const hasItems = itemNames.length > 0
    const items = itemNames.map(i => {
      const item = itemList.find(j => j.id === i)
      return (<span key={i} className="rentitem">{item.label} <i onClick={() => this.removeItem(i)}>x</i></span>)
    })
    const disabledDates = itemNames.map(i => {
      const items = reservations.filter(j => j.itemName === i)
      return items ? items.map(i => i.date) : []
    })
    const daysNum = moment(date[1]).diff(date[0], 'days');

    return (
      <div className="reservation">
        <ItemSelect addItem={this.addItem} />
        {hasItems && <div className="reservation-box">
        <div className="rent-summary-itemlist" >{items}</div>
          <div>
            <label>Id člena:</label>
            <input
              name="userId"
              onChange={this.handleChange}
              value={this.state.userName}
            />
          </div>
          <div>
            <label>Zaplaceno:</label>
            <input
              name="payed"
              type="checkbox"
              onChange={this.handleCheck}
              checked={this.state.payed}
            />
          </div>
          <div>
            <label>Datum:</label>
            <ItemCalendar
              handleDateChange={(date) => this.handleDateChange(date, disabledDates)}
              reservations={reservations}
              itemNames={this.state.itemNames}
              disabledDates={disabledDates}
              date={this.state.date}
            />
          </div>

          <RentSummary summary={this.state} />
          {daysNum > 0 && <button onClick={this.addReservation} className="reserve-button">
            Rezervovat
          </button>}
        </div>}
      </div>
    );
  }
}

export default Reservation;
