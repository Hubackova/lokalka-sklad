import React, { useState } from "react";
import "./ItemSelect.scss";
import moment from "moment";
import { itemList, itemTypes } from "../../../data/items";
import ItemsSection from "./ItemsSection";
import { enumerateDaysBetweenDates } from "../../../utils";

const ItemSelect = ({addItem, date, reservations}) => {
  const [openType, setOpen] = useState("")

  const handleOpen = e => {
    openType === e.target.id ? setOpen("") : setOpen(e.target.id)
  };

  const getAvailabilityArr = item => {
    const items = reservations.filter(j => j.itemName === item.id);
    const reservedDates = items ? items.map(i => i.date) : [];
    const startDate = moment(date[0]);
    const endDate = moment(date[1]);

    const disabledAll = reservedDates.map(i => enumerateDaysBetweenDates(i.from, i.to));

    const disabledAllFlatten = disabledAll.flat(2);
    const invalidDateArr = disabledAllFlatten.map(i =>
      moment(i).isBetween(startDate, endDate, null, [])
    );
    return invalidDateArr;
  };

  const getItemTypeAvailability = type => {
    const filterType = itemList.filter(i => i.type === type)
    const availableItems = filterType.map(i => {
      const notAvailableArr = getAvailabilityArr(i);
      const notAvailable = notAvailableArr && notAvailableArr.includes(true);
      return notAvailable;
    });
    return availableItems;
  };

  const countTypeAvailability = type => {
    const availableItems = getItemTypeAvailability(type);
    const count = availableItems.filter(i => i === false).length;
    return count;
  };

  const mapItems = type => {
    const filterType = itemList.filter(i => i.type === type)
    const dateSelected = date.length > 1;
    //MAP ITEMS FOR EACH SECTION
    const items = filterType.map(i => {
      const notAvailableArr = dateSelected && getAvailabilityArr(i);
      const notAvailable = notAvailableArr && notAvailableArr.includes(true);
      const bgClass = notAvailable ? " notAvailable" : "";
      return (
        <div id={i.id} key={i.id} className={`item-select${bgClass}`} onClick={addItem}>
          {i.label}
        </div>
      );
    });
    return items;
  };

  const itemLists = itemTypes.map(i => {
    const list = mapItems(i.type);
    const availableItems = date.length > 1 ? countTypeAvailability(i.type) : list.length;
    return (
      <ItemsSection
        key={i.type}
        list={list}
        item={i}
        availableItems={availableItems}
        openType={openType}
        handleOpen={handleOpen}
        dateSelected={date.length > 1}
      />
    );
  });

  return (
    <div className="items">{itemLists}</div>
  );
};

export default ItemSelect;
