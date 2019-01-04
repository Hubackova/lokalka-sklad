import moment from "moment";
import Calendar from "react-calendar";
import React, { Component } from 'react';
import "./ItemCalendar.scss";

class ItemCalendar extends Component {
  componentDidMount(){
    this.props.checkDisableDates(this.props.disabledDates)
  }
  componentDidUpdate(){
    this.props.checkDisableDates(this.props.disabledDates)
  }

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
    const {handleDateChange, date, invalid } = this.props
    return (

      <Calendar
        className={invalid ? "invalid" : ""}
        onChange={handleDateChange}
        value={date}
        selectRange={true}
        tileDisabled={this.getTileDisabled}
      />

    );
  }
}

export default ItemCalendar;