import React from 'react';
import moment from "moment"
import {itemList} from "../data/items"
import "./RentSummary.scss"

const RentSummary = ({summary}) => {
    const prices = summary.itemNames.map(i => {
        const item = itemList.find(j => j.id === i)
        return item.price
    })
    // const dateFrom = moment(summary.date[0]).format('DD. MM. YYYY')
    // const dateTo = moment(summary.date[1]).format('DD. MM. YYYY')
    const daysNum = moment(summary.date[1]).diff(summary.date[0], 'days');  

    const totalPrice = prices.length > 0 ? prices.reduce((a, b) => a + b) * daysNum : 0

    return (
        <div className="rent-summary">

            {/* <div>Jméno: {summary.userName}</div>
            <div>Email: {summary.email}</div>
            <div>Telefon: {summary.phoneNumber}</div>
            <div>Půjčit od: {dateFrom}</div>
            <div>Půjčit do: {dateTo}</div> */}
            <div>Počet dní: {daysNum}</div>
            <div>Celková cena: {totalPrice},- </div>
        </div>
    );
};

export default RentSummary;