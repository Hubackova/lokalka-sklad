import React from "react";
import PropTypes from 'prop-types'
import moment from "moment";
import "./RentSummary.scss";

const RentSummary = ({ itemNames, date, getPrice }) => {
  const daysNum = moment(date[1]).diff(date[0], "days") || 1;
  const prices = itemNames.map(i => {
    return getPrice(i, daysNum)
  });

  const totalPrice =
    prices.length > 0 ? prices.reduce((a, b) => a + b) : 0;
  return (
    <div className="rent-summary">
      <div>
        Počet dní: <b>{`${daysNum} (${moment(date[0]).format("DD.MM.")} - ${moment(date[1]).format("DD.MM.")})`}</b>
      </div>
      <div>
        Celková cena: <b style={{ color: "red" }}>{totalPrice},-</b>{" "}
      </div>
    </div>
  );
};

RentSummary.propTypes = {
  date: PropTypes.array,
  getPrice: PropTypes.func,
  itemNames: PropTypes.array
}

export default RentSummary;
