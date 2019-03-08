import React, { PureComponent } from "react";
import moment from "moment";
import ItemCalendar from "./ItemCalendar";
import ItemSelect from "./ItemSelection/ItemSelect";
import RentSummary from "./RentSummary";
import "./styles.scss";
import { reservationsRef } from "../../firebase";
import { itemList, itemTypes } from "../../data/items";
import { enumerateDaysBetweenDates } from "../../utils";

class Reservation extends PureComponent {
  state = {
    itemNames: [],
    date: new Date(),
    userId: "",
    returned: false,
    payed: false,
    rent: this.props.isAdmin ? true : false,
    notification: false,
    invalid: false
  };

  checkDisableDates = disabledDates => {
    const { date } = this.state;
    const startDate = moment(date[0]);
    const endDate = moment(date[1]);

    const disabledAll = disabledDates.map(j => {
      return j.map(i => enumerateDaysBetweenDates(i.from, i.to));
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

  addItem = (e) => {
    const itemName = e.target.id;
    const { itemNames } = this.state;
    if (!itemNames.includes(itemName)) {
      this.setState({ itemNames: [...itemNames, itemName] });
    }
    this.setState({ itemName });
  };

  removeItem = itemName => {
    this.setState(
      {
        itemNames: this.state.itemNames.filter(i => i !== itemName)
      },
      () => {
        if (this.state.itemNames.length === 0)
          this.setState({ date: new Date() });
      }
    );
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheck = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };

  getPrice = (i, daysNum) => {
    const item = itemList.find(j => j.id === i);
    const itemType = itemTypes.find(type => type.type === item.type);
    const price =
      daysNum === 1
        ? itemType.price1
        : daysNum < 5
        ? itemType.price2
        : itemType.price3;
    return price;
  };

  addReservation = () => {
    const { itemNames, date } = this.state;
    const formattedDate = {
      from: moment(date[0]).format("YYYY-MM-DD"),
      to: moment(date[1]).format("YYYY-MM-DD")
    };
    const daysNum = moment(date[1]).diff(date[0], "days");

    const addingItems = itemNames.map(i => {
      const price = this.getPrice(i, daysNum);

      const { invalid, ...newState } = this.state; //get rid of invalid
      return {
        ...newState,
        itemName: i,
        date: formattedDate,
        daysNum: daysNum,
        price: price
      };
    });
    this.setState({ payed: false, invalid: false, itemNames: [] });
    addingItems.forEach(element => reservationsRef.push(element));
  };

  selectFirst = () => {};

  render() {
    const { reservations, isAdmin, selectFirst } = this.props;
    const { itemNames, date, invalid } = this.state;
    const hasItems = itemNames.length > 0;
    const items = itemNames.map(i => {
      const item = itemList.find(j => j.id === i);
      return (
        <div key={i} className="rentitem" style={{ textAlign: "top" }}>
          {item.label}
          <i
            style={{ marginLeft: 10 }}
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
        <ItemSelect
          addItem={this.addItem}
          date={date}
          reservations={reservations}
          selectFirst={selectFirst}
        />

        <div className="reservation-box">
          {hasItems ? (
            <>
              <div className="rent-summary-itemlist">{items}</div>
              <div>
                <label>Id člena:</label>
                <input
                  name="userId"
                  onChange={this.handleChange}
                  value={this.state.userName}
                />
              </div>
              {isAdmin && (
                <div>
                  <label>Zaplaceno:</label>
                  <input
                    name="payed"
                    type="checkbox"
                    onChange={this.handleCheck}
                    checked={this.state.payed}
                  />
                </div>
              )}
              {isAdmin && (
                <div>
                  <label>Zapůjčeno:</label>
                  <input
                    name="rent"
                    type="checkbox"
                    onChange={this.handleCheck}
                    checked={this.state.rent}
                  />
                </div>
              )}
              <div>
                <label>Datum:</label>
                <ItemCalendar
                  handleDateChange={this.handleDateChange}
                  checkDisableDates={this.checkDisableDates}
                  itemNames={this.state.itemNames}
                  disabledDates={disabledDates}
                  date={this.state.date}
                  invalid={this.state.invalid}
                />
              </div>
              {!this.state.invalid && Array.isArray(this.state.date) && (
                <RentSummary summary={this.state} getPrice={this.getPrice} />
              )}
              <button
                onClick={this.addReservation}
                className="reserve-button"
                disabled={!daysNum || this.state.invalid}
              >
                <i className="fa fa-plus" />
                Rezervovat
              </button>{" "}
            </>
          ) : (
            <ItemCalendar
              handleDateChange={this.handleDateChange}
              checkDisableDates={this.checkDisableDates}
              itemNames={itemNames}
              disabledDates={disabledDates}
              date={date}
              invalid={invalid}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Reservation;
