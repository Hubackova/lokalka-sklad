import React, {Component} from 'react'
import moment from "moment";
import {reservationsRef} from '../firebase'
import './AdminLayout.scss'
import SmtpService from '../SmtpService'

class AdminLayout extends Component {
  updateReservation = e => {
    const {reservations} = this.props
    const attr = e.target.getAttribute('name')
    const reservationValue = reservations.find(i => i.key === e.target.id)[attr]
    reservationsRef.child(e.target.id).update({[attr]: !reservationValue})
  }

  removeReservation = e => {
    reservationsRef.child(e.target.id).remove()
  }

  getReservationList(reservations, active) {
    const reservationList = reservations.map(i => {
      const dateTo = moment(i.date.to, "YYYY-MM-DD"); //"2018-12-18"
      const dateNow = moment(new Date());
      const daysToReturn = dateTo.diff(dateNow, "days")
      const notification = daysToReturn > 0
        ? "-"
        : daysToReturn < -10
          ? "!!"
          : "!"

      return (
        <tr className="table-row" key={i.key}>
          <td>
            <i id={i.key} onClick={this.removeReservation} className={`fa fa-times-circle`} />
          </td>
          <td>{i.itemName}</td>
          <td>{i.userId}</td>
          <td>{i.date.from}</td>
          <td>{i.date.to}</td>
          <td>{i.daysNum}</td>
          <td>{i.price}</td>
          <td style={{textAlign: 'center'}}>
            <i
              id={i.key}
              name="returned"
              onClick={this.updateReservation}
              className={`fa fa-check-square${i.returned ? ' success' : ''}`}
            />
          </td>
          <td style={{textAlign: 'center'}}>
            <i
              id={i.key}
              name="payed"
              onClick={this.updateReservation}
              className={`fa fa-check-square${i.payed ? ' success' : ''}`}
            />
          </td>
          {active && <td>{daysToReturn}</td>}
          {active && <td>{notification}</td>}
        </tr>
      )
    })
    return reservationList
  }

  getReservationHeader(active) {
    return (
      <tr className="table-head">
        <th />
        <th>Položka</th>
        <th>Id člena</th>
        <th>Půjčit od</th>
        <th>Půjčit do</th>
        <th>Počet dní</th>
        <th>Cena</th>
        <th>Vráceno</th>
        <th>Zaplaceno</th>
        {active && <th>Dnů do vrácení</th>}
        {active && <th>!</th>}
      </tr>
    )
  }

  sendMail = () => {
    let sender = new SmtpService()
    sender.send(
      'lokalkasklad@gmail.com',
      'lenka.h@atlas.cz',
      'Pozdrav',
      'Ahoj, tohle je test. Snad to vyjde. Lenka',
      'smtp.gmail.com',
      'lokalkasklad@gmail.com',
      'lokalka2019!!!'
    )
  }

  render() {
    const {reservations} = this.props
    const activeReservations = reservations.filter(i => !i.returned || !i.payed)
    const archivedReservations = reservations.filter(i => i.returned && i.payed)
    console.table(reservations)

    return (
      <div className="admin-layout">
        {activeReservations.length > 0 && (
          <>
          <h2>Aktuální rezervace</h2>
          <table>
            <thead>{this.getReservationHeader("active")}</thead>
            <tbody>{this.getReservationList(activeReservations, "active")}</tbody>
          </table>
          </>
        )}
        {archivedReservations.length > 0 && (
          <>
          <h2>Archivované rezervace</h2>
          <table>
            <thead>{this.getReservationHeader()}</thead>
            <tbody>{this.getReservationList(archivedReservations)}</tbody>
          </table>
          </>
        )}
        <button onClick={this.sendMail}>Send</button>
      </div>
    )
  }
}

export default AdminLayout
