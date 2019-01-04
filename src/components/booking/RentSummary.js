import React from "react";
import moment from "moment";
import { itemList } from "../../data/items";
import "./RentSummary.scss";

const RentSummary = ({ summary }) => {
  const prices = summary.itemNames.map(i => {
    const item = itemList.find(j => j.id === i);
    return item.price;
  });
  const daysNum = moment(summary.date[1]).diff(summary.date[0], "days");
  const totalPrice =
    prices.length > 0 ? prices.reduce((a, b) => a + b) * daysNum : 0;
  return (
    <div className="rent-summary">
      <div>
        Počet dní: <b>{daysNum}</b>
      </div>
      <div>
        Celková cena: <b style={{ color: "red" }}>{totalPrice},-</b>{" "}
      </div>
    </div>
  );
};

export default RentSummary;
