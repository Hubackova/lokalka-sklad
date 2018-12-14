import moment from "moment";
import Calendar from "react-calendar";
import React, { Component } from 'react';

class ItemCalendar extends Component {
  getTileDisabled = ({ date }) => {
    const reserved = this.props.disabledDates.map(i => {
      return i.map(j => {
        const isDateReserved =  moment(date).isBetween(j.from, j.to, null, []);
        return isDateReserved
      })
    })
    return moment(date).add(1, "days") < new Date() || reserved.flat().includes(true);
  };


  render() {
    const {handleDateChange, date } = this.props
    return (
      <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
        selectRange={true}
        tileDisabled={this.getTileDisabled}
      />
    </div>
    );
  }
}

export default ItemCalendar;