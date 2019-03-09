import React from "react";
import PropTypes from 'prop-types'
import moment from "moment";
import "./RentSummary.scss";

const RentSummary = ({ summary, getPrice }) => {
  const daysNum = moment(summary.date[1]).diff(summary.date[0], "days");
  const prices = summary.itemNames.map(i => {
    return getPrice(i, daysNum)
  });

  const totalPrice =
    prices.length > 0 ? prices.reduce((a, b) => a + b) : 0;
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

RentSummary.propTypes = {
  getPrice: PropTypes.func,
  summary: PropTypes.object
}

export default RentSummary;
