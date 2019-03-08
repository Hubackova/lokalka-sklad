import React, {Component, createContext, useState, useContext} from 'react'
import firebase from 'firebase'
import Reservation from './components/booking'
import AdminLayout from './components/manage'
import LoginForm from './components/auth/LoginForm'
import withAuth from './components/auth/withAuth'
import {reservationsRef, Fb} from './firebase'
import './App.scss'
import 'font-awesome/css/font-awesome.min.css'

const UserContext = createContext();

class App extends Component {
  state = {
    isReservation: true,
    reservations: [],
    admin: false,
  }

  componentDidMount() {
    this.fetchReservation()
  }

  fetchReservation = () => {
    reservationsRef.on('value', snapshot => {
      var items = []
      snapshot.forEach(child => {
        let childItem = child.val()
        childItem.key = child.key
        items.push(childItem)
      })
      this.setState({reservations: items})
    })
  }

  handleChange = e => {
    const reservations = this.state.reservations.filter(i => {
      return i.itemName.includes(e.target.value) || i.userId.includes(e.target.value)
    })
    this.setState({value: e.target.value, reservations}, () => {
      if (this.state.value === '') {
        this.fetchReservation()
      }
    })
  }

  toReservation = () => this.setState({isReservation: true})
  toAdminLayout = () => this.setState({isReservation: false})
  adminSwitch = () => this.setState({admin: !this.state.admin})
  render() {
    const {isReservation, reservations, admin} = this.state
    return (
      <div className="App">
        <LoginForm />

        <div>{JSON.stringify(this.props.user && this.props.user.email)}</div>
        <div className="menu">
          <span onClick={this.toReservation}>Rezervace</span>
          {admin && <span onClick={this.toAdminLayout}>Správa rezervací</span>}
          <span onClick={this.adminSwitch}>
            <i className={`fa fa-user${admin ? ' admin' : ''}`} />
          </span>
        </div>
        {isReservation ? (
          <Reservation reservations={reservations} admin={admin} />
        ) : (
          <AdminLayout reservations={reservations} handleChange={this.handleChange} />
        )}
      </div>
    )
  }
}

export default App
