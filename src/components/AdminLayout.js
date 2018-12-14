import React, { Component } from "react";
import "./AdminLayout.scss";

class AdminLayout extends Component {
  render() {
    const { reservations } = this.props;
    const reservationList = reservations.map(i => {
      return (
        <tr className="table-row" key={i.itemName}>
          <td>{i.itemName}</td>
          <td>{i.userName}</td>
          <td>{i.email}</td>
          <td>{i.phoneNumber}</td>
          <td>{i.date[0]}</td>
          <td>{i.date[1]}</td>
          <td>{i.daysNum}</td>
          <td>{i.price}</td>
          <td style={{textAlign: "center"}}><i id={i.key} className={`fa fa-check-square${i.returned ? " success" : ""}`} /></td>
          <td style={{textAlign: "center"}}><i id={i.key} className={`fa fa-check-square${i.payed ? " success" : ""}`} /></td>
        </tr>
      );
    });
    return (
      <div className="admin-layout">
        <table>
          <thead>
              <tr className="table-head">
            <th>Položka</th>
            <th>Jméno</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Půjčit od</th>
            <th>Půjčit do</th>
            <th>Počet dní</th>
            <th>Cena</th>
            <th>Vráceno</th>
            <th>Zaplaceno</th>
            </tr>
          </thead>
          <tbody>{reservationList}</tbody>
        </table>
      </div>
    );
  }
}

export default AdminLayout;
