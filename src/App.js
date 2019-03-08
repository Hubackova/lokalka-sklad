import React, {Component} from 'react'
import Reservation from './components/booking'
import AdminLayout from './components/manage'
import LoginForm from './components/auth/LoginForm'
import firebase from 'firebase'
import {reservationsRef, Fb} from './firebase'
import './App.scss'
import 'font-awesome/css/font-awesome.min.css'

class App extends Component {
  state = {
    isReservation: true,
    reservations: [],
    admin: false,
    user: null
  }

  componentDidMount() {
    this.fetchReservation()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user})
        console.log(user)
      } else {
        console.log('shit again')
      }
    })
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
        <div>{JSON.stringify(this.state.user && this.state.user.email)}</div>
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
