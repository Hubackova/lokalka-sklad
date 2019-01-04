import React, { PureComponent } from "react";
import moment from "moment";
import ItemCalendar from "./ItemCalendar";
import ItemSelect from "./ItemSelect";
import RentSummary from "./RentSummary";
import "./booking.scss";
import { reservationsRef } from "../../firebase";
import { itemList } from "../../data/items";

class Reservation extends PureComponent {
  state = {
    itemNames: [],
    date: new Date(),
    userId: "",
    returned: false,
    payed: false,
    rent: this.props.admin ? true : false,
    notification: false,
    invalid: false
  };

  enumerateDaysBetweenDates(startDate, endDate) {
    const currDate = moment(startDate, "YYYY-MM-DD");
    const lastDate = moment(endDate, "YYYY-MM-DD");
    let dates = [currDate.toDate()];
    while (currDate.add(1, "days").diff(lastDate) <= 0) {
      dates.push(currDate.clone().toDate());
    }
    return dates;
  }

  checkDisableDates = disabledDates => {
    const { date } = this.state;
    const startDate = moment(date[0]);
    const endDate = moment(date[1]);

    const disabledAll = disabledDates.map(j => {
      return j.map(i => this.enumerateDaysBetweenDates(i.from, i.to));
    });

    const disabledAllFlatten = disabledAll.flat(2);

    const invalidDateArr = disabledAllFlatten.map(i =>
      moment(i).isBetween(startDate, endDate, null, [])
    );
    if (invalidDateArr.includes(true)) {
      this.setState({ invalid: true });
    } else this.setState({ invalid: false });
  };

  handleDateChange = (date, disabledDates) => {
    this.checkDisableDates(disabledDates);
    this.setState({ date });
  };

  addItem = e => {
    const itemName = e.target.id;
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
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheck = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };

  addReservation = () => {
    const { itemNames, date } = this.state;
    const formattedDate = {
      from: moment(date[0]).format("YYYY-MM-DD"),
      to: moment(date[1]).format("YYYY-MM-DD")
    };
    const daysNum = moment(date[1]).diff(date[0], "days");

    const addingItems = itemNames.map(i => {
      const item = itemList.find(j => j.id === i);
      const { invalid, ...newState } = this.state; //get rid of invalid
      return {
        ...newState,
        itemName: i,
        date: formattedDate,
        daysNum: daysNum,
        price: item.price * daysNum
      };
    });
    this.setState({ payed: false, invalid: false, itemNames: [] });
    addingItems.forEach(element => reservationsRef.push(element));
  };

  render() {
    const { reservations, admin } = this.props;
    const { itemNames, date } = this.state;
    const hasItems = itemNames.length > 0;
    const items = itemNames.map(i => {
      const item = itemList.find(j => j.id === i);
      return (
        <div key={i} className="rentitem" style={{textAlign: "top"}}>
          {item.label}
          <i
            style={{marginLeft: 10}}
            id={i.key}
            onClick={() => this.removeItem(i)}
            className={`fa fa-times-circle remove`}
          />
        </div>
      );
    });
    const disabledDates = itemNames.map(i => {
      const items = reservations.filter(j => j.itemName === i);
      return items ? items.map(i => i.date) : [];
    });
    const daysNum = moment(date[1]).diff(date[0], "days");

    return (
      <div className="reservation">
        <ItemSelect addItem={this.addItem} />
        {hasItems && (
          <div className="reservation-box">
            <div className="rent-summary-itemlist">{items}</div>
            <div>
              <label>Id člena:</label>
              <input
                name="userId"
                onChange={this.handleChange}
                value={this.state.userName}
              />
            </div>
            {admin && <div>
              <label>Zaplaceno:</label>
              <input
                name="payed"
                type="checkbox"
                onChange={this.handleCheck}
                checked={this.state.payed}
              />
            </div>}
            {admin && <div>
              <label>Zapůjčeno:</label>
              <input
                name="rent"
                type="checkbox"
                onChange={this.handleCheck}
                checked={this.state.rent}
              />
            </div>}
            <div>
              <label>Datum:</label>
              <ItemCalendar
                handleDateChange={date =>
                  this.handleDateChange(date, disabledDates)
                }
                checkDisableDates={this.checkDisableDates}
                reservations={reservations}
                itemNames={this.state.itemNames}
                disabledDates={disabledDates}
                date={this.state.date}
                invalid={this.state.invalid}
              />
            </div>

            {!this.state.invalid && Array.isArray(this.state.date) && (
              <RentSummary summary={this.state} />
            )}
            <button
              onClick={this.addReservation}
              className="reserve-button"
              disabled={!daysNum || this.state.invalid}
            >
              <i className="fa fa-plus"/>Rezervovat
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Reservation;
