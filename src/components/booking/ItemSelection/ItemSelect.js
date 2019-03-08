import React, { Component } from "react";
import "./ItemSelect.scss";
import moment from "moment";
import { itemList, itemTypes } from "../../../data/items";
import ItemsSection from "./ItemsSection";
import { enumerateDaysBetweenDates } from "../../../utils";

class ItemSelect extends Component {
  state = {
    openType: "",
    invalid: false
  };

  handleOpen = e => {
    if (this.state.openType === e.target.id) {
      this.setState({
        openType: ""
      });
    } else {
      this.setState({
        openType: e.target.id
      });
    }
  };

  getAvailabilityArr = item => {
    const items = this.props.reservations.filter(j => j.itemName === item.id);
    const reservedDates = items ? items.map(i => i.date) : [];
    const startDate = moment(this.props.date[0]);
    const endDate = moment(this.props.date[1]);

    const disabledAll = reservedDates.map(i =>
      enumerateDaysBetweenDates(i.from, i.to)
    );

    const disabledAllFlatten = disabledAll.flat(2);
    const invalidDateArr = disabledAllFlatten.map(i =>
      moment(i).isBetween(startDate, endDate, null, [])
    );
    return invalidDateArr;
  };

  mapItems = type => {
    const { addItem, date } = this.props;
    const filterType = itemList.filter(i => i.type === type);
    const dateSelected = date.length > 1;

    //MAP ITEMS FOR EACH SECTION
    const items = filterType.map(i => {
      const notAvailableArr = dateSelected && this.getAvailabilityArr(i);

      const notAvailable = notAvailableArr && notAvailableArr.includes(true);
        const bgClass = notAvailable
        ? " notAvailable"
        : "";
      return (
        <div id={i.id} key={i.id} className={`item-select${bgClass}`} onClick={addItem}>
          {i.label}
        </div>
      );
    });
    return items;
  };

  getItemTypeAvailability = type => {
    const filterType = itemList.filter(i => i.type === type);
    const availableItems = filterType.map(i => {
      const notAvailableArr = this.getAvailabilityArr(i);
      const notAvailable = notAvailableArr && notAvailableArr.includes(true);
      return notAvailable
    })
    return availableItems
  }

  mapTypeAvailability = type => {
    const availableItems = this.getItemTypeAvailability(type)
    const isTypeAvailable = availableItems.some(i => i === false);
    return isTypeAvailable
  };

  countTypeAvailability = type => {
    const availableItems = this.getItemTypeAvailability(type)
    const count = availableItems.filter(i => i === false).length;
    return count
  };

  render() {
    const { openType } = this.state;
    const { date } = this.props;
    const itemLists = itemTypes.map(i => {
      const someAvailable = date.length > 1 && this.mapTypeAvailability(i.type);
      const list = this.mapItems(i.type);
      const availableItems = date.length > 1 && this.countTypeAvailability(i.type)
      return (
        <ItemsSection
          key={i.type}
          list={list}
          item={i}
          availableItems={availableItems}
          someAvailable={someAvailable}
          openType={openType}
          handleOpen={this.handleOpen}
          dateSelected={date.length > 1}
        />
      );
    });
    return <div className="items">{itemLists}</div>;
  }
}

export default ItemSelect;
