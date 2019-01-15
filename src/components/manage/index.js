import React, { Component } from "react";
import moment from "moment";
import { reservationsRef } from "../../firebase";
import "./manage.scss";
import MailSender from "./MailSender";
import SearchBox from "./SearchBox";

class AdminLayout extends Component {
  state = {
    value: "",
    filtering: false,
    reservations: this.props.reservations
  };

  updateReservation = e => {
    const { reservations } = this.props;
    const attr = e.target.getAttribute("name");
    const reservationValue = reservations.find(i => i.key === e.target.id)[
      attr
    ];
    reservationsRef.child(e.target.id).update({ [attr]: !reservationValue });
  };

  handleChange = e => {
    const reservations = this.state.reservations.filter(i => {
      return i.itemName.includes(e.target.value) ||  i.userId.includes(e.target.value);
    });
    this.setState({ value: e.target.value, reservations }, () => {
      if (this.state.value === "") {
        this.setState({ reservations: this.props.reservations });
      }
    });

  };

  removeReservation = e => {
    reservationsRef.child(e.target.id).remove();
  };

  getReservationList(reservations, type) {
    const reservationList = reservations.map(i => {
      const dateTo = moment(i.date.to, "YYYY-MM-DD"); //"2018-12-18"
      const dateNow = moment(new Date());
      const notificationDate = moment(i.notification, "YYYY-MM-DD");
      const daysToReturn = dateTo.diff(dateNow, "days");
      const daysFromNotification = dateNow.diff(notificationDate, "days");
      const color =
        daysToReturn > 0 ? "black" : daysToReturn < -10 ? "red" : "orange";
      return (
        <tr
          className="table-row"
          key={i.key}
          style={{
            backgroundColor:
              daysFromNotification > 2 ? "#ffe6e6" : "transparent"
          }}
        >
          <td>
            <i
              id={i.key}
              onClick={this.removeReservation}
              className={`fa fa-times-circle remove`}
            />
          </td>
          <td>{i.itemName}</td>
          <td>{i.userId}</td>
          <td>{moment(i.date.from).format("DD.MM.YY")}</td>
          <td>{moment(i.date.to).format("DD.MM.YY")}</td>
          <td>{i.daysNum}</td>
          <td>{i.price}</td>
          {type && (
            <td style={{ textAlign: "center" }}>
              <i
                id={i.key}
                name="returned"
                onClick={this.updateReservation}
                className={`fa fa-check-square${i.returned ? " success" : ""}`}
              />
            </td>
          )}
          <td style={{ textAlign: "center" }}>
            <i
              id={i.key}
              name="payed"
              onClick={this.updateReservation}
              className={`fa fa-check-square${i.payed ? " success" : ""}`}
            />
          </td>
          {!type && (
            <td style={{ textAlign: "center" }}>
              <i
                id={i.key}
                name="rent"
                onClick={this.updateReservation}
                className={`fa fa-check-square${i.rent ? " success" : ""}`}
              />
            </td>
          )}
          {type === "active" && (
            <td style={{ color: color, fontWeight: "bold" }}>{daysToReturn}</td>
          )}
          {type === "active" && (
            <td>
              {daysToReturn < 0 && (
                <MailSender i={i} color={color} daysToReturn={daysToReturn} />
              )}
            </td>
          )}
        </tr>
      );
    });
    return reservationList;
  }

  getReservationHeader(type) {
    return (
      <tr className="table-head">
        <th>
          <i className="fa fa-trash" />
        </th>
        <th>
          <i className="fa fa-file" />
          Položka
        </th>
        <th>
          <i className="fa fa-user" />
          Id člena
        </th>
        <th>
          <i className="fa fa-chevron-right" />
          Půjčit od
        </th>
        <th>
          <i className="fa fa-chevron-left" />
          Půjčit do
        </th>
        <th>
          <i className="fa fa-calendar" />
          Počet dní
        </th>
        <th>
          <i className="fa fa-money" />
          Cena
        </th>
        {type && (
          <th>
            <i className="fa fa-undo" />
            Vráceno
          </th>
        )}
        <th>
          <i className="fa fa-credit-card" />
          Zaplaceno
        </th>
        {!type && (
          <th>
            <i className="fa fa-share" />
            Zapůjčeno
          </th>
        )}
        {type === "active" && (
          <th>
            <i className="fa fa-hourglass" />
            Dnů do vrácení
          </th>
        )}
        {type === "active" && (
          <th>
            <i className="fa fa-exclamation-triangle" />
          </th>
        )}
      </tr>
    );
  }

  render() {
    const { reservations } = this.state;
    const rentedReservations = reservations.filter(
      i => i.rent && (!i.returned || !i.payed)
    );
    const activeReservations = reservations.filter(
      i => !i.rent && (!i.returned || !i.payed)
    );
    const archivedReservations = reservations.filter(
      i => i.returned && i.payed
    );
    return (
      <>
      <SearchBox value={this.state.search} handleChange={this.handleChange} />
      <div className="admin-layout">
        

        <div className="reservation-table">
            <h2>Aktuálně zapůjčeno</h2>
            <table>
              <thead>{this.getReservationHeader("active")}</thead>
              <tbody>
                {this.getReservationList(rentedReservations, "active")}
              </tbody>
            </table>
          </div>


          <div className="reservation-table">
            <h2>Aktuálně rezervováno</h2>
            <table>
              <thead>{this.getReservationHeader()}</thead>
              <tbody>{this.getReservationList(activeReservations)}</tbody>
            </table>
          </div>
        
          <div className="reservation-table">
            <h2>Archivované rezervace</h2>
            <table>
              <thead>{this.getReservationHeader("archived")}</thead>
              <tbody>
                {this.getReservationList(archivedReservations, "archived")}
              </tbody>
            </table>
          </div>
      </div>
      </>
    );
  }
}

export default AdminLayout;
